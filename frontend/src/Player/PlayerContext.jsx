import { createContext, useContext, useState, useEffect } from "react";

import usePlaybackEvents from "./PlaybackEvents";
import { getAvailableDevices, getPlaybackState } from "../api/player";
import { SPOTIFY_EVENTS } from '../constants';

const defaultDeviceId = process.env.REACT_APP_SPOTIFY_DEFAULT_DEVICE_ID;
const defaultDeviceName = process.env.REACT_APP_SPOTIFY_DEFAULT_DEVICE_NAME;

const {
  PLAYBACK_ID_CHANGED,
  PLAYBACK_LOADING,
  PLAYBACK_PLAYING,
  PLAYBACK_PAUSED,
  PLAYBACK_STOPPED,
  PLAYBACK_POSITION_CORRECTION
} = SPOTIFY_EVENTS

const PlayerContext = createContext({});
const usePlayerContext = () => useContext(PlayerContext);

const PlayerProvider = ({ children }) => {
  const [devices, setDevices] = useState(null);
  const [playbackState, setPlaybackState] = useState({});
  const [loadingTrack, setLoadingTrack] = useState(true);
  const { messages } = usePlaybackEvents();

  const updateState = () => {
    getPlaybackState().then(({ error, data } = {}) => {
      if (!error) {
        setPlaybackState(data ?? {});
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
        console.log('updateDevices', updateDevices)
        setDevices(updateDevices);
      }
    });
  };

  useEffect(() => {
    updateState();
    updateDevices();
  }, []);

  useEffect(() => {
    if ([PLAYBACK_ID_CHANGED,
      PLAYBACK_LOADING,
      PLAYBACK_PLAYING,
      PLAYBACK_PAUSED,
      PLAYBACK_STOPPED,
      PLAYBACK_POSITION_CORRECTION].includes(messages?.at(-1)?.player_event)) {
      updateState();
    }
  }, [messages]);

  const value = { devices, playbackState, updateState, updateDevices, loadingTrack, setLoadingTrack };

  return (
    <PlayerContext.Provider value={value}>
      {typeof children === "function" ? children({ ...value }) : children}
    </PlayerContext.Provider>
  );
};

export { usePlayerContext, PlayerProvider };
