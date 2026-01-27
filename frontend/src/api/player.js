import axios from "axios";

import { SPOTIFY_API_BASE_URL } from "./constants";

const SPOTIFY_API_PLAYER_BASE_URL = `${SPOTIFY_API_BASE_URL}/me/player`;
const defaultDeviceId = process.env.REACT_APP_SPOTIFY_DEFAULT_DEVICE_ID;

const transferPlaybackToDevice = async (deviceId = defaultDeviceId, play = true) =>
  await axios({
    method: "put",
    url: `${SPOTIFY_API_PLAYER_BASE_URL}`,
    data: { device_ids: [deviceId], play },
  }).catch(({ code, status, response: { data: { error } = {} } = {} }) => {
    return { code, status, error: error || code };
  });

const getAvailableDevices = async () =>
  await axios({
    method: "get",
    url: `${SPOTIFY_API_PLAYER_BASE_URL}/devices`,
  }).catch(({ code, status, response: { data: { error } = {} } = {} }) => {
    return { code, status, error: error || code };
  });

const getPlaybackState = async () =>
  await axios({
    method: "get",
    url: `${SPOTIFY_API_PLAYER_BASE_URL}`,
  }).catch(({ code, status, response: { data: { error } = {} } = {} }) => {
    return { code, status, error: error || code };
  });

const startPlayback = async ({ deviceId, ...params } = {}) =>
  await axios({
    method: "put",
    url: `${SPOTIFY_API_PLAYER_BASE_URL}/play`,
    data: { device_id: deviceId, ...params },
  }).catch(({ code, status, response: { data: { error } = {} } = {} }) => {
    return { code, status, error: error || code };
  });

const pausePlayback = async (deviceId) =>
  await axios({
    method: "put",
    url: `${SPOTIFY_API_PLAYER_BASE_URL}/pause`,
    params: deviceId && { device_id: deviceId },
  }).catch(({ code, status, response: { data: { error } = {} } = {} }) => {
    return { code, status, error: error || code };
  });

const skipToNext = async (deviceId) =>
  await axios({
    method: "post",
    url: `${SPOTIFY_API_PLAYER_BASE_URL}/next`,
    params: deviceId && { device_id: deviceId },
  }).catch(({ code, status, response: { data: { error } = {} } = {} }) => {
    return { code, status, error: error || code };
  });

const skipToPrevious = async (deviceId) =>
  await axios({
    method: "post",
    url: `${SPOTIFY_API_PLAYER_BASE_URL}/previous`,
    params: deviceId && { device_id: deviceId },
  }).catch(({ code, status, response: { data: { error } = {} } = {} }) => {
    return { code, status, error: error || code };
  });

const setRepeatMode = async (state, deviceId) =>
  await axios({
    method: "put",
    url: `${SPOTIFY_API_PLAYER_BASE_URL}/repeat`,
    params: { state, device_id: deviceId },
  }).catch(({ code, status, response: { data: { error } = {} } = {} }) => {
    return { code, status, error: error || code };
  });

const setPlaybackPosition = async ({ position_ms, deviceId }) =>
  await axios({
    method: "put",
    url: `${SPOTIFY_API_PLAYER_BASE_URL}/seek`,
    params: { position_ms, device_id: deviceId },
  }).catch(({ code, status, response: { data: { error } = {} } = {} }) => {
    return { code, status, error: error || code };
  });

const setPlaybackVolume = async (volumePercent, deviceId) =>
  await axios({
    method: "put",
    url: `${SPOTIFY_API_PLAYER_BASE_URL}/volume`,
    params: { volume_percent: volumePercent, device_id: deviceId },
  }).catch(({ code, status, response: { data: { error } = {} } = {} }) => {
    return { code, status, error: error || code };
  });

const togglePlaybackShuffle = async (state, deviceId) =>
  await axios({
    method: "put",
    url: `${SPOTIFY_API_PLAYER_BASE_URL}/shuffle`,
    params: { state, device_id: deviceId },
  }).catch(({ code, status, response: { data: { error } = {} } = {} }) => {
    return { code, status, error: error || code };
  });

const getRecentlyPlayedTracks = async () =>
  await axios({
    method: "get",
    url: `${SPOTIFY_API_BASE_URL}/me/player/recently-played`,
  }).catch(({ code, status, response: { data: { error } = {} } = {} }) => {
    return { code, status, error: error || code };
  });

const getUserQueue = async () =>
  await axios({
    method: "get",
    url: `${SPOTIFY_API_PLAYER_BASE_URL}/queue`,
  }).catch(({ code, status, response: { data: { error } = {} } = {} }) => {
    return { code, status, error: error || code };
  });

export {
  getAvailableDevices,
  getPlaybackState,
  pausePlayback,
  startPlayback,
  skipToNext,
  skipToPrevious,
  setRepeatMode,
  setPlaybackPosition,
  setPlaybackVolume,
  togglePlaybackShuffle,
  getRecentlyPlayedTracks,
  getUserQueue,
  transferPlaybackToDevice
};
