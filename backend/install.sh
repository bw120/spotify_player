# setup onEvent scripts
sudo rm -rf /usr/bin/raspotify_onEvent/
sudo cp -r ./raspotify_onEvent /usr/bin/raspotify_onEvent
sudo chmod +x /usr/bin/raspotify_onEvent/raspotify_event_handler.sh
sudo chmod +x /usr/bin/raspotify_onEvent/raspotify_sendEventInfo.py
sudo chown raspotify:raspotify -R /usr/bin/raspotify_onEvent

sudo cp -r ./spotifyZeroConfConnection/zeroconf_client_event_handler.sh /usr/bin/raspotify_onEvent/zeroconf_client_event_handler.sh 
sudo chmod +x /usr/bin/raspotify_onEvent/zeroconf_client_event_handler.sh
sudo chown raspotify:raspotify /usr/bin/raspotify_onEvent/zeroconf_client_event_handler.sh

# setup systemd service for websocket server
sudo systemctl stop spotifyWebsocket.service
sudo rm -f /etc/systemd/system/spotifyWebsocket.service
sudo cp ./spotifyWebsocket.service /etc/systemd/system/spotifyWebsocket.service


# setup systemd service for zeroconf librespot server
sudo systemctl stop spotifyZeroConf.service
sudo rm -f /etc/systemd/system/spotifyZeroConf.service
sudo cp ./spotifyZeroConfConnection/spotifyZeroConf.service /etc/systemd/system/spotifyZeroConf.service
sudo cp ./spotifyZeroConfConnection/spotifyZeroConf.conf /etc/systemd/system/spotifyZeroConf.conf
sudo chown raspotify:raspotify /etc/systemd/system/spotifyZeroConf.conf

sudo systemctl daemon-reload
sudo systemctl enable spotifyZeroConf.service
sudo systemctl start spotifyZeroConf.service
sudo systemctl enable spotifyWebsocket.service
sudo systemctl start spotifyWebsocket.service

# build and install React app
cd ../frontend
#npm install
#npm run build
sudo rm -rf /var/www/html
sudo mkdir -p /var/www/html
sudo cp -r build/* /var/www/html
cd ../backend
