import { createContext, useContext, useState, useEffect } from "react";

import usePlaybackEvents from "./PlaybackEvents";
import useDeviceEvents from "../Device/DeviceEvents";
import { getAvailableDevices } from "../api/spotify/player";
import { getPlaybackState } from "../api/librespot/player";
import { SPOTIFY_EVENTS, PLAYER_CONTEXT } from '../constants';

const defaultDeviceId = process.env.REACT_APP_SPOTIFY_DEFAULT_DEVICE_ID;
const defaultDeviceName = process.env.REACT_APP_SPOTIFY_DEFAULT_DEVICE_NAME;

const {
  ACTIVE,
  INACTIVE,
  METADATA,
  WILL_PLAY,
  PLAYING,
  NOT_PLAYING,
  PAUSED,
  STOPPED,
  SEEK,
  VOLUME,
} = SPOTIFY_EVENTS

const { EXTERNAL_ACCOUNT } = PLAYER_CONTEXT;

const PlayerContext = createContext({});
const usePlayerContext = () => useContext(PlayerContext);

const PlayerProvider = ({ children }) => {
  const [devices, setDevices] = useState(null);
  const [playbackState, setPlaybackState] = useState({});
  const [loadingTrack, setLoadingTrack] = useState(true);
  const { messages } = usePlaybackEvents();
  const { sendMessage: sendDeviceMessage } = useDeviceEvents();

  const updateState = () => {
    getPlaybackState().then(({
      error,
      data = {},
      data: {
        track = {},
        volume,
        paused
      } = {},
    }) => {

      const {
        duration,
        album_name,
        album_cover_url,
        artist_names,
        position,
        name
      } = track || {};
      const state = {
        ...data,
        progress_ms: position,
        is_playing: !paused,
        device: {
          volume_percent: volume
        },
        item: {
          ...track,
          duration_ms: duration,
          name: name,
          artists: artist_names,
          images: [{ height: 300, width: 300, url: album_cover_url }],
          show: {
            name,
          },
          album: {
            name: album_name,
            images: [{ height: 300, width: 300, url: album_cover_url }]
          }
        }
      }

      if (!error) {
        setPlaybackState(state);
        setLoadingTrack(false);
      } else {
        console.log('Error fetching playback state:', error);
      }
    });
  };

  const updateDevices = () => {
    getAvailableDevices().then(({ error, data: { devices } = {} } = {}) => {
      if (!error) {
        const updateDevices = devices.map((device) => ({
          ...device,
          selected:
            device.id === defaultDeviceId || device.name === defaultDeviceName,
        }));
        setDevices(updateDevices);

      }
    });
  };

  const updatePlaybackState = (event) => {
    if ([ACTIVE,
      INACTIVE,
      METADATA,
      WILL_PLAY,
      PLAYING,
      NOT_PLAYING,
      PAUSED,
      STOPPED,
      SEEK,
      VOLUME,].includes(event)) {
      updateState();
      sendDeviceMessage(JSON.stringify({ event: 'wake', context: 'ui' }));
    }
  }

  useEffect(() => {
    updateState();
    updateDevices();
  }, []);

  useEffect(() => {
    const { type: event, data } = messages?.at(-1) || {};

    updatePlaybackState(event);

  }, [messages]);

  const value = { devices, playbackState, updateState, updateDevices, loadingTrack, setLoadingTrack };

  return (
    <PlayerContext.Provider value={value}>
      {typeof children === "function" ? children({ ...value }) : children}
    </PlayerContext.Provider>
  );
};

export { usePlayerContext, PlayerProvider };
