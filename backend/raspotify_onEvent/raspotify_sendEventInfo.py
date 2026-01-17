import asyncio
import os
import websockets
import json

port = 8765
host = "192.168.50.32"

async def echo_client():
    # The URI for the WebSocket server
    uri = f"ws://{host}:{port}"

    # Get environment variables passed by librespot
    player_event = os.environ.get("PLAYER_EVENT")
    track_id = os.environ.get("TRACK_ID") 
    client_id = os.environ.get("CLIENT_ID")
    client_name = os.environ.get("CLIENT_NAME")
    client_brand_name = os.environ.get("CLIENT_BRAND_NAME")
    client_model_name = os.environ.get("CLIENT_MODEL_NAME")
    volume = os.environ.get("VOLUME")
    shuffle = os.environ.get("SHUFFLE")
    repeat = os.environ.get("REPEAT")
    auto_play = os.environ.get("AUTO_PLAY")
    filter = os.environ.get("FILTER")
    item_type = os.environ.get("ITEM_TYPE")
    track_ids = os.environ.get("TRACK_IDS")
    name = os.environ.get("NAME")
    duration_ms = os.environ.get("DURATION_MS")
    covers = os.environ.get("COVERS")
    is_explicit = os.environ.get("IS_EXPLICIT")
    number = os.environ.get("NUMBER")
    album = os.environ.get("ALBUM")
    artists = os.environ.get("ARTISTS")
    album_artists = os.environ.get("ALBUM_ARTISTS")
    show_name = os.environ.get("SHOW_NAME")
    description = os.environ.get("DESCRIPTION")
    position_ms = os.environ.get("POSITION_MS")



    event_info = {
        "player_event": player_event,
        "track_id": track_id,
        "client_id": client_id,
        "client_name": client_name,
        "client_brand_name": client_brand_name,
        "client_model_name": client_model_name,
        "volume": volume,
        "shuffle": shuffle,
        "repeat": repeat,
        "auto_play": auto_play,
        "filter": filter,
        "item_type": item_type,
        "track_ids": track_ids,
        "name": name,
        "duration_ms": duration_ms,
        "covers": covers,
        "is_explicit": is_explicit,
        "number": number,
        "album": album,
        "artists": artists,
        "album_artists": album_artists,
        "show_name": show_name,
        "description": description,
        "position_ms": position_ms
    }
    # Use async with as a context manager to ensure the connection is closed
    try:
        async with websockets.connect(uri) as websocket:
            print(f"Connected to server at {uri}")
            await websocket.send(json.dumps(event_info))

            # Receive a response from the server
            response = await websocket.recv()
            print(f"< Received: {response}")

    except ConnectionRefusedError:
        print(f"Connection refused. Is the server running at {uri}?")
    except websockets.exceptions.WebSocketException as e:
        print(f"An error occurred: {e}")
    except websockets.exceptions.ConnectionClosedOK as e:
        print(f"An error occurred: {e}")

# Run the client coroutine
if __name__ == "__main__":
    asyncio.run(echo_client())
    
