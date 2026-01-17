#!/usr/bin/env python3
import os
import sys
import asyncio
from websockets.asyncio.client import connect

async def hello():
    # Get environment variables passed by librespot
    player_event = os.environ.get("PLAYER_EVENT")
    track_id = os.environ.get("TRACK_ID") # Note: This ID might need decoding for the Spotify API
    async with connect("ws://192.168.50.32:8765") as websocket:
        await websocket.send('player_event')
        message = await websocket.recv()
        print(message)
        print('done sending')


if __name__ == "__main__":
    asyncio.run(hello())



# print('running sendEventInfo.py')
# # Log the events (for debugging, e.g., view with 'tail -f /var/log/daemon.log' if using raspotify)
# with open("/tmp/librespot_events.log", "a") as log_file:
#     log_file.write(f"Event: {player_event}, Track ID: {track_id}\n")

# # Perform actions based on the event type
# if player_event == "start":
#     # Code to run when playback starts
#     # Example: print to stdout (usually captured by system logs)
#     print(f"Playback started for Track ID: {track_id}")
#     # You could also trigger a smart home action or change GPIO pins
# elif player_event == "stop":
#     # Code to run when playback stops
#     print("Playback stopped")
# elif player_event == "change":
#     # Code to run when the track changes
#     print(f"Track changed to: {track_id}")


sys.exit(0) # Ensure the script exits cleanly
