import axios from "axios";

import { SPOTIFY_LOGIN_URL, SPOTIFY_GET_TOKEN_URL } from "./constants";

const scope = [
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "playlist-read-private",
  "playlist-modify-private",
  "playlist-modify-public",
  "user-read-playback-position",
  "user-read-recently-played",
  "user-top-read"
];

const isDevelopment = process.env.NODE_ENV === 'development';
const redirectUri = isDevelopment ? process.env.REACT_APP_SPOTIFY_REDIRECT_DEV_TARGET : process.env.REACT_APP_SPOTIFY_REDIRECT_TARGET;
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

const getAuthorizeSpotifyUrl = (state) => {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope: scope.join(" "),
    redirect_uri: redirectUri,
    state,
  }).toString();

  return `${SPOTIFY_LOGIN_URL}?${params}`;
};

const getToken = async (code, refresh) => {
  const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return false;
  }

  const response = await axios({
    method: "post",
    url: SPOTIFY_GET_TOKEN_URL,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    },
    data: new URLSearchParams({
      ...refresh ? { refresh_token: code } : { code },
      redirect_uri: redirectUri,
      grant_type: refresh ? "refresh_token" : "authorization_code",
    }),
  }).catch(({ code, status, response: { data: { error } = {} } = {} }) => {
    return { code, status, error: error || code };
  });

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${response.data.access_token}`;

  return response;
};

const refreshToken = async () => {
  const refresh_token = localStorage.getItem('refresh_token');
  const { data: { access_token: accessToken, refresh_token: refreshToken } = {} } = await getToken(refresh_token, true);

  if (accessToken) {
    localStorage.setItem('access_token', accessToken);
  }
  if (refreshToken) {
    localStorage.setItem('refresh_token', refreshToken);
  }
}

axios.interceptors.response.use(undefined, async (error) => {
  if (error.response?.status === 401) {
    await refreshToken();
    return axios(error.config); // Retry original request
  }

  throw error;
});

export { getAuthorizeSpotifyUrl, getToken, refreshToken };
