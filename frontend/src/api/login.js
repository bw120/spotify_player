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

const getAuthorizeSpotifyUrl = (state) => {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
    scope: scope.join(" "),
    redirect_uri: redirectUri,
    state,
  }).toString();

  return `${SPOTIFY_LOGIN_URL}?${params}`;
};

const getToken = async (code) => {
  const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

  if (!client_id || !client_secret) {
    return false;
  }

  return await axios({
    method: "post",
    url: SPOTIFY_GET_TOKEN_URL,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${client_id}:${client_secret}`)}`,
    },
    data: new URLSearchParams({
      code,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  }).catch(({ code, status, response: { data: { error } = {} } = {} }) => {
    return { code, status, error: error || code };
  });
};

export { getAuthorizeSpotifyUrl, getToken };
