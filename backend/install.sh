
# setup systemd service for spotify player server
sudo systemctl stop spotifyPlayer.service
sudo rm -f /etc/systemd/system/spotifyPlayer.service
sudo cp ./spotifyPlayer.service /etc/systemd/system/spotifyPlayer.service

sudo systemctl stop spotifyWebsocket.service
sudo rm -f /etc/systemd/system/spotifyWebsocket.service
sudo cp ./spotifyWebsocket.service /etc/systemd/system/spotifyWebsocket.service

sudo systemctl daemon-reload
sudo systemctl enable spotifyPlayer.service
sudo systemctl start spotifyPlayer.service
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
