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

  const handleLogin = () => {
    setLoggingIn(true);
    const url = getAuthorizeSpotifyUrl(uuid);
    window.location.href = url;
  };

  const loginWithCode = async (code) => {
    const { data, status, error } = await getToken(code);
    if (status !== 200) {
      setError(error);
      return;
    }
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${data?.access_token}`;
    setLoggingIn(false);
    setToken(data);
    navigate("/");
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }

    if (!token?.access_token && state === uuid && code && loggingIn) {
      loginWithCode(code);
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
