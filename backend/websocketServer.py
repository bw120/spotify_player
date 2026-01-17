#!/usr/bin/env python
import asyncio
import websockets

port = 8765
host = "192.168.50.32"

CONNECTED_CLIENTS = set()

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
    
    try:
        # Continuously receive and process messages
        async for message in websocket:
            print(f"Received message from client: {message}")
            await broadcast(message)
            
    except websockets.exceptions.ConnectionClosed as e:
        print(f"Connection with {websocket.remote_address} closed: {e.code}")
    finally:
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