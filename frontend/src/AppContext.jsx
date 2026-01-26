import { createContext, useContext, useState } from "react";

const AppContext = createContext({});
const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [selectedScreen, setSelectedScreen] = useState(2);
  const isLoggedIn = !!token?.access_token;

  const value = { token, setToken, isLoggedIn, selectedScreen, setSelectedScreen }

  return (
    <AppContext.Provider value={value}>
      {typeof children === 'function' ? children({ ...value }) : children}
    </AppContext.Provider>
  );
};

export { useAppContext, AppProvider };
