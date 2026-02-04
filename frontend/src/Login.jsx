import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { getAuthorizeSpotifyUrl, getToken } from "./api/login";
import { useAppContext } from "./AppContext";

const uuid = process.env.REACT_APP_SPOTIFY_UUID

const Login = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code") || null;
  const state = searchParams.get("state") || null;
  const errorParam = searchParams.get("error") || null;
  const navigate = useNavigate();
  const { token, setToken, isLoggedIn } = useAppContext();
  const [loggingIn, setLoggingIn] = useState(!!state && !!code);
  const [error, setError] = useState(errorParam);

  const refresh_token = localStorage.getItem('refresh_token');
  const access_token = localStorage.getItem('access_token');


  const handleLogin = () => {
    setLoggingIn(true);
    const url = getAuthorizeSpotifyUrl(uuid);
    window.location.href = url;
  };

  const loginWithCode = async (code, refresh) => {
    const { data: { access_token: accessToken, refresh_token: refreshToken } = {}, status, error } = await getToken(code, refresh);
    if (status !== 200) {
      setError(error);
      return;
    }

    if (accessToken) {
      localStorage.setItem('access_token', accessToken);
    }
    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken);
    }
    setLoggingIn(false);
    setToken({ access_token: accessToken, refresh_token: refreshToken });
    navigate("/");
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }

    if (!isLoggedIn && state === uuid && code && loggingIn) {
      loginWithCode(code);
    }

    if (refresh_token) {
      loginWithCode(refresh_token, true);
    }
  }, []);

  return (
    <div>
      <h1>Login</h1>
      {error && <div>Error: {error}</div>}
      <button disabled={!error && loggingIn} onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
