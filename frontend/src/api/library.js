import axios from "axios";

import { SPOTIFY_API_BASE_URL } from "./constants";

const SPOTIFY_API_PLAYER_BASE_URL = `${SPOTIFY_API_BASE_URL}`;

const getUsersPlaylists = async (limit, offset) =>
    await axios({
        method: "get",
        url: `${SPOTIFY_API_PLAYER_BASE_URL}/me/playlists`,
        params: { limit, offset },
    }).catch(({ code, status, response: { data: { error } = {} } = {} }) => {
        return { code, status, error: error || code };
    });

const getUsersTop = async (type = "tracks", limit, offset) =>
    await axios({
        method: "get",
        url: `${SPOTIFY_API_PLAYER_BASE_URL}/me/top/${type}`,
        params: { limit, offset },
    }).catch(({ code, status, response: { data: { error } = {} } = {} }) => {
        return { code, status, error: error || code };
    });

const getUsersSavedTracks = async (limit, offset) =>
    await axios({
        method: "get",
        url: `${SPOTIFY_API_PLAYER_BASE_URL}/me/tracks`,
        params: { limit, offset },
    }).catch(({ code, status, response: { data: { error } = {} } = {} }) => {
        return { code, status, error: error || code };
    });

const addPlaylistToQueue = async (id, uri, position = 0) =>
    await axios({
        method: "post",
        url: `${SPOTIFY_API_PLAYER_BASE_URL}/playlists/${id}/tracks`,
        data: { uri, position },
    }).catch(({ code, status, response: { data: { error } = {} } = {} }) => {
        return { code, status, error: error || code };
    });

export { getUsersPlaylists, getUsersTop, getUsersSavedTracks, addPlaylistToQueue };