import axios from "axios";

import { SPOTIFY_API_BASE_URL } from "./constants";

const SPOTIFY_API_PLAYER_BASE_URL = `${SPOTIFY_API_BASE_URL}`;

const getTrack = async (id) =>
    await axios({
        method: "get",
        url: `${SPOTIFY_API_PLAYER_BASE_URL}/tracks/${id}`,
    }).catch(({ code, status, response: { data: { error } = {} } = {} }) => {
        return { code, status, error: error || code };
    });

export { getTrack };