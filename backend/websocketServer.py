#!/usr/bin/env python
import asyncio
import websockets
import subprocess
import time

port = 8765
host = "192.168.50.32"

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


CONNECTED_CLIENTS = set()
INACTIVITY_TIMEOUT = 3600  # 3600 seconds

async def broadcast(message):
    """
    Sends a message to all clients in the CONNECTED_CLIENTS set.
    """
    if CONNECTED_CLIENTS:
        # send the message to all connected clients
        await asyncio.gather(*[client.send(message) for client in CONNECTED_CLIENTS])

async def handler(websocket):
    """
    This function manages a single client connection.
    """
    # Register new client
    CONNECTED_CLIENTS.add(websocket)
    print(f"Client connected: {websocket.remote_address}. Total clients: {len(CONNECTED_CLIENTS)}")
    
    inactivity_task = asyncio.create_task(asyncio.sleep(INACTIVITY_TIMEOUT))
    
    try:
        # Continuously receive and process messages
        while True:
            done, pending = await asyncio.wait(
                [asyncio.create_task(websocket.__aiter__().__anext__()), inactivity_task],
                return_when=asyncio.FIRST_COMPLETED
            )
            
            if inactivity_task in done:
                print("Inactivity timeout reached. Restarting Raspotify service.")
                restart_raspotify()
                inactivity_task = asyncio.create_task(asyncio.sleep(INACTIVITY_TIMEOUT))
            else:
                try:
                    message = await next(iter(done)).result()
                    print(f"Received message from client: {message}")
                    await broadcast(message)
                    # Reset the inactivity timer
                    inactivity_task.cancel()
                    inactivity_task = asyncio.create_task(asyncio.sleep(INACTIVITY_TIMEOUT))
                except StopAsyncIteration:
                    break
            
    except websockets.exceptions.ConnectionClosed as e:
        print(f"Connection with {websocket.remote_address} closed: {e.code}")
    finally:
        # Cancel the inactivity task
        inactivity_task.cancel()
        # Unregister client upon disconnection
        CONNECTED_CLIENTS.remove(websocket)
        print(f"Client disconnected. Total clients: {len(CONNECTED_CLIENTS)}")

def process_response(connection, request, response):
    response.headers["Access-Control-Allow-Origin"] = "*"

async def main():
    # Start the server on localhost port 8765
    async with websockets.serve(handler, host, port, process_response=process_response):
        print(f"WebSocket server started and listening on ws://{host}:{port}")
        await asyncio.Future()  # Run forever

if __name__ == "__main__":
    asyncio.run(main())