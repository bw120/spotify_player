import { createContext, useContext, useState, useEffect } from "react";

import usePlaybackEvents from "./PlaybackEvents";
import { getAvailableDevices, getPlaybackState } from "../api/player";
import { getTrack } from "../api/tracks";
import { SPOTIFY_EVENTS, PLAYER_CONTEXT } from '../constants';

const defaultDeviceId = process.env.REACT_APP_SPOTIFY_DEFAULT_DEVICE_ID;
const defaultDeviceName = process.env.REACT_APP_SPOTIFY_DEFAULT_DEVICE_NAME;

const {
  SESSION_CONNECTED,
  SESSION_DISCONNECTED,
  SESSION_CLIENT_CHANGED,
  PLAYBACK_ID_CHANGED,
  PLAYBACK_LOADING,
  PLAYBACK_PLAYING,
  PLAYBACK_PAUSED,
  PLAYBACK_STOPPED,
  PLAYBACK_POSITION_CORRECTION,
  TRACK_CHANGED,
  PLAYBACK_SEEKED
} = SPOTIFY_EVENTS

const { EXTERNAL_ACCOUNT } = PLAYER_CONTEXT;

const PlayerContext = createContext({});
const usePlayerContext = () => useContext(PlayerContext);

const PlayerProvider = ({ children }) => {
  const [devices, setDevices] = useState(null);
  const [isExternallyControlled, setIsExternallyControlled] = useState(false);
  const [playbackState, setPlaybackState] = useState({});
  const [loadingTrack, setLoadingTrack] = useState(true);
  const { messages, sendMessage } = usePlaybackEvents();

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
        setDevices(updateDevices);

      }
    });
  };

  const getLocalPlaybackState = (event, eventDetails) => {
    if ([PLAYBACK_ID_CHANGED,
      PLAYBACK_LOADING,
      PLAYBACK_PLAYING,
      PLAYBACK_PAUSED,
      PLAYBACK_STOPPED,
      PLAYBACK_POSITION_CORRECTION,
      PLAYBACK_SEEKED,
      TRACK_CHANGED].includes(event)) {
      updateState();
    }
  }
console.log('playbackState', playbackState)
  const getExternalPlaybackState = (event, eventDetails) => {
    if ([PLAYBACK_STOPPED, SESSION_DISCONNECTED].includes(event)) {
      setPlaybackState({});
      setIsExternallyControlled(false);
      return;
    }

    const { position_ms, track_id } = eventDetails || {};
    if ([
      SESSION_CONNECTED,
      PLAYBACK_ID_CHANGED,
      PLAYBACK_LOADING,
      PLAYBACK_PLAYING,
      PLAYBACK_PAUSED,
      PLAYBACK_STOPPED,
      PLAYBACK_POSITION_CORRECTION,
      PLAYBACK_SEEKED,
      TRACK_CHANGED].includes(event)) {

      if (track_id) {
        getTrack(track_id).then(({ error, data } = {}) => {
          let isPlaying = playbackState?.is_playing;

          if ([PLAYBACK_PLAYING].includes(event)) {
            isPlaying = true;
          }
          if ([PLAYBACK_PAUSED, PLAYBACK_STOPPED].includes(event)) {
            isPlaying = false;
          }

          if (!error) {
            const externalPlaybackState = {
              item: data,
              id: track_id,
              is_playing: isPlaying,
              progress_ms: Number(position_ms),
            }

            setPlaybackState((prevState) => ({
              ...prevState,
              ...Object.fromEntries(
                Object.entries(externalPlaybackState).filter(([_, v]) => v !== undefined)
              )
            }));

            setLoadingTrack(false);
          } else {
            console.log('Error fetching track details:', error);
          }
        });
      }
    }
  }

  useEffect(() => {
    updateState();
    updateDevices();
  }, []);

  useEffect(() => {
    const { event, context, event_details } = messages?.at(-1) || {};
    const isExternal = context === EXTERNAL_ACCOUNT;
    setIsExternallyControlled(isExternal);

    if (isExternal) {
      getExternalPlaybackState(event, event_details);
    } else {
      getLocalPlaybackState(event, event_details);
    }
  }, [messages]);

  useEffect(() => {
    const handleClick = () => {
      sendMessage(JSON.stringify({ event: 'wake', context: 'ui' }));
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [sendMessage]);

  const value = { devices, playbackState, updateState, updateDevices, loadingTrack, setLoadingTrack, isExternallyControlled };

  return (
    <PlayerContext.Provider value={value}>
      {typeof children === "function" ? children({ ...value }) : children}
    </PlayerContext.Provider>
  );
};

export { usePlayerContext, PlayerProvider };
