# setup onEvent scripts
sudo rm -rf /usr/bin/raspotify_onEvent/
sudo cp -r ./raspotify_onEvent /usr/bin/raspotify_onEvent
sudo chmod +x /usr/bin/raspotify_onEvent/raspotify_event_handler.sh
sudo chmod +x /usr/bin/raspotify_onEvent/raspotify_sendEventInfo.py
sudo chown raspotify:raspotify -R /usr/bin/raspotify_onEvent

# setup systemd service for websocket server
sudo systemctl stop spotifyWebsocket.service
sudo rm -f /etc/systemd/system/spotifyWebsocket.service
sudo cp ./spotifyWebsocket.service /etc/systemd/system/spotifyWebsocket.service
sudo systemctl daemon-reload
sudo systemctl enable spotifyWebsocket.service
sudo systemctl start spotifyWebsocket.service

# build and install React app
cd ../frontend
npm install
npm run build
sudo rm -rf /var/www/html/spotify_player
sudo mkdir -p /var/www/html/spotify_player
sudo cp -r build/* /var/www/html/spotify_player/
cd ../backend