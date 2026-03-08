#!/bin/bash

# Define the path to your Python script
PYTHON_SCRIPT="/usr/bin/raspotify_onEvent/raspotify_sendEventInfo.py"
# Event context to differentiate between the account linked to the UI and the play events
# associated with an external device connected via zeroconf/Spotify Connect
EVENT_CONTEXT="EXTERNAL_ACCOUNT"

# Log the event for debugging (optional)
logger "ZERO CONF LIBRESPOT EVENT: $PLAYER_EVENT triggered with context $EVENT_CONTEXT. Calling $PYTHON_SCRIPT"

# Execute the Python script, passing the event as a command-line argument
/usr/bin/python3 "$PYTHON_SCRIPT" "$EVENT_CONTEXT" &
