import axios from "axios";

import { LIBRESPOT_API_BASE_URL } from "../constants";

const PLAYER_BASE_URL = `${LIBRESPOT_API_BASE_URL}/player`;

const getPlaybackState = async () =>
    await axios({
        method: "get",
        url: `${LIBRESPOT_API_BASE_URL}/status`
    }).catch(({ code, status, response: { data: { error } = {} } = {} }) => {
        return { code, status, error: error || code };
    });

const pausePlayback = async () =>
    await axios({
        method: "post",
        url: `${PLAYER_BASE_URL}/pause`
    }).catch(({ code, status, response: { data: { error } = {} } = {} }) => {
        return { code, status, error: error || code };
    });

const resumePlayback = async () =>
    await axios({
        method: "post",
        url: `${PLAYER_BASE_URL}/resume`
    }).catch(({ code, status, response: { data: { error } = {} } = {} }) => {
        return { code, status, error: error || code };
    });

const skipToNext = async () =>
    await axios({
        method: "post",
        url: `${PLAYER_BASE_URL}/next`
    }).catch(({ code, status, response: { data: { error } = {} } = {} }) => {
        return { code, status, error: error || code };
    });

const skipToPrevious = async () =>
    await axios({
        method: "post",
        url: `${PLAYER_BASE_URL}/prev`
    }).catch(({ code, status, response: { data: { error } = {} } = {} }) => {
        return { code, status, error: error || code };
    });

const setPlaybackPosition = async ({ position, deviceId }) =>
    await axios({
        method: "post",
        url: `${PLAYER_BASE_URL}/seek`,
        data: { position, relative: false },
    }).catch(({ code, status, response: { data: { error } = {} } = {} }) => {
        return { code, status, error: error || code };
    });

const setPlaybackVolume = async (volumePercent) =>
    await axios({
        method: "post",
        url: `${PLAYER_BASE_URL}/volume`,
        data: { volume: volumePercent, relative: false },
    }).catch(({ code, status, response: { data: { error } = {} } = {} }) => {
        return { code, status, error: error || code };
    });

export {
    getPlaybackState,
    resumePlayback,
    pausePlayback,
    skipToNext,
    skipToPrevious,
    setPlaybackPosition,
    setPlaybackVolume
}