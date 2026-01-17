import axios from "axios";

import { SPOTIFY_API_BASE_URL } from "./constants";

const SPOTIFY_API_PLAYER_BASE_URL = `${SPOTIFY_API_BASE_URL}`;

const search = async ({limit, offset, query, types}) =>
    await axios({
        method: "get",
        url: `${SPOTIFY_API_PLAYER_BASE_URL}/search`,
        params: { limit, offset, q: query, type: types.join(',') },
    }).catch(({ code, status, response: { data: { error } = {} } = {} }) => {
        return { code, status, error: error || code };
    });

export { search };