#!/bin/bash

# Define the path to your Python script
PYTHON_SCRIPT="/usr/bin/raspotify_onEvent/raspotify_sendEventInfo.py"

# Log the event for debugging (optional)
logger "***Raspotify event: $PLAYER_EVENT triggered. Calling $PYTHON_SCRIPT"

# Execute the Python script, passing the event as a command-line argument
/usr/bin/python3 "$PYTHON_SCRIPT" "$PLAYER_EVENT" &
