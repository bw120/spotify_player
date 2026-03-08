#!/usr/bin/env python
import asyncio
from datetime import datetime
import websockets
import subprocess
import screenDimmer
import json

port = 8765
#host = "192.168.50.32"
host = '0.0.0.0'
CONNECTED_CLIENTS = set()
INACTIVITY_TIMEOUT = 3600  # 1 hour in seconds
SCREEN_DIM_TIMEOUT = 300  # 5 minutes in seconds

session_start_time = datetime.now()
screen_auto_dimmed = False

async def broadcast(message):
    if CONNECTED_CLIENTS:
        global session_start_time
        # reset session_start_time on each broadcast
        session_start_time = datetime.now()
        # send the message to all connected clients
        await asyncio.gather(*[client.send(message) for client in CONNECTED_CLIENTS])

async def handler(websocket):
    # Register new client
    CONNECTED_CLIENTS.add(websocket)
    print(f"Client connected: {websocket.remote_address}. Total clients: {len(CONNECTED_CLIENTS)}")
    
    try:
        # Continuously receive and process messages
        async for message in websocket:
            event = json.loads(message).get("event")
            print(f"Received event from client: {event}")

            # Handle screen dimming events
            if event == "sleep":
                screenDimmer.set_dim_level(0)
                print("Screen dimmed to 0% (sleep mode)")
            
            if event == "wake" and screen_auto_dimmed:
                screenDimmer.cancel_dimming()
                screen_auto_dimmed = False
                print("Screen dimming cancelled (wake mode)")

            # When a session disconnects, the device no longer is visible in the Spotify API.
            # This reconnects the device by restarting the Raspotify service
            if event == "session_disconnected":
                print("Session disconnected - reconnecting...")
                restart_raspotify()
            
            await broadcast(message)
            
    except websockets.exceptions.ConnectionClosed as e:
        print(f"Connection with {websocket.remote_address} closed: {e.code}")
    finally:
        # Unregister client upon disconnection
        CONNECTED_CLIENTS.remove(websocket)
        print(f"Client disconnected. Total clients: {len(CONNECTED_CLIENTS)}")

def restart_raspotify():
    """
    Restarts the Raspotify service using systemctl. The device becomes inaccessible
    after a period of time of inactivity. Restarting the service resolves this.
    """
    try:
        subprocess.run(["sudo", "systemctl", "restart", "raspotify"], check=True)
        print(f"Service 'raspotify' restarted successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Error restarting service: {e}")
    except FileNotFoundError:
        print("Error: 'systemctl' command not found. Ensure it is installed and in your PATH.")


async def handle_inactivity():
    now = datetime.now()
    global session_start_time, screen_auto_dimmed
    time_difference = now - session_start_time
    difference_seconds = time_difference.total_seconds()
    
    # Auto-dim screen after 10 minutes of inactivity
    if difference_seconds > SCREEN_DIM_TIMEOUT and not screen_auto_dimmed:
        screenDimmer.set_dim_level(0)
        screen_auto_dimmed = True
        print(f"Screen auto-dimmed after {SCREEN_DIM_TIMEOUT} seconds of inactivity")
    

    """
    Reload the Raspotify service after a period of inactivity. 
    This is a hack to make the devices stay active in the Spotify API.
    Also dims the screen after 10 minutes of inactivity.
    """
    if difference_seconds > INACTIVITY_TIMEOUT:
        restart_raspotify()
        session_start_time = now  # Reset session start time after restart
    
    print(f"Task executed at: {now.strftime('%Y-%m-%d %H:%M:%S')} - time_difference={time_difference.total_seconds()} seconds")
    
async def run_periodically(interval, periodic_function):
    """Schedules a function to run every 'interval' seconds."""
    while True:
        await asyncio.sleep(interval)
        await periodic_function()

def process_response(connection, request, response):
    response.headers["Access-Control-Allow-Origin"] = "*"

async def main():
    task = asyncio.create_task(run_periodically(100, handle_inactivity))
    # Start the server on localhost port 8765
    async with websockets.serve(handler, host, port, process_response=process_response):
        print(f"WebSocket server started and listening on ws://{host}:{port}")
        await asyncio.Future()  # Run forever


if __name__ == "__main__":
    asyncio.run(main())