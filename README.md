# Spotify Music Player
This repository is app to control and play Spotify music on a device running Raspotify or Librespot. The intention is to create a music player based on a Raspberry Pi and an attached touch screen device.

## Backend overview
The backend code is written in Python and is intended to facilitate communication between the Raspotify service and the frontend. It initates a websocket server to relay realtime info to the UI. This allows the UI to update even when the play state is changed from another device.

The Librespot service, which is what Raspotify is based on, has an option to call a script on event changes. This feature is used to run a Python script to send a message to the websocket server.

## Frontend overview
The frontend is a web app using React and the Spotify Web API. 


## Setup
1. Setup up a Raspberry Pi with Raspotify. Follow the directions on the GitHub repo - https://github.com/dtcooper/raspotify
2. Clone this repo onto your Raspberry Pi.
3. Within the backend folder create your Python venv. 
    * run `python -m venv myenv`
    * run `source myenv/bin/activate`
    * run `pip install -r requirements.txt`
4. Edit the `spotifyWebsocket.service` file to have the correct python path under `ExecStart`. It should go towards the one in the venv you just created with the dependencies installed.
5. Update the install.sh to be executable: `chmod +x install.sh
6. Run the install script to build front end and move all files to the appropriate places.
