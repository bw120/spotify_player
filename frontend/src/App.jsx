import {
  Routes,
  Route,
  Outlet,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";

import theme from "./App.theme";
import { AppProvider } from "./AppContext";
import Login from "./Login";
import Main from "./Main";

const NoMatch = () => {
  return <div>404 - Not found</div>;
};

const ProtectedRoute = ({ isLoggedIn }) =>
  isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;

const App = () => (
  <ThemeProvider theme={theme}>
    <Box>
      <AppProvider>
        {({ isLoggedIn }) => {
          return (

            <Router>
              <Routes>
                <Route path="login" element={<Login />} />

                <Route
                  path="/"
                  element={<ProtectedRoute isLoggedIn={isLoggedIn} />}
                >
                  <Route index element={<Main />} />
                  <Route path="*" element={<NoMatch />} />
                </Route>
              </Routes>
            </Router>

          );
        }}
      </AppProvider>
    </Box >
  </ThemeProvider>
);

export default App;
