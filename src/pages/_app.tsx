import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import { Footer } from "../libs/content/footer/footer";
import { useEffect, useState } from "react";
import { alertProps } from "../libs/constants/constants";
import { AlertBox } from "../libs/components/alert/alert";
import { NavBar } from "../libs/content/navBar/navBar";
import { changeTheme } from "../libs/styles/lib/changeTheme";

import LoginPage from "./loginPage/loginPage";
import Homepage from "./homepage/homepage";
import ProfilePage from "./profilePage/profilePage";
import PostPage from "./postPage/postPage";

import "../libs/styles/lib/globals.scss";
import styles from "../libs/styles/lib/app.module.scss";
import clsx from "clsx";

const App = () => {
  const [loggedIn, setLoggedIn] = useState<string>("");
  const [alertsList, setAlertsList] = useState<alertProps[]>([]);
  const { addAlert, Alerts } = AlertBox(alertsList, setAlertsList);

  const shk = window.sessionStorage.getItem("shk") || "";
  const uid = parseInt(window.sessionStorage.getItem("uid") || "-1");
  const theme = window.localStorage.getItem("theme");
  const lin = loggedIn !== "";

  useEffect(() => {
    if (!theme) {
      window.localStorage.setItem("theme", "dark");
    } else {
      changeTheme(theme);
    }
    if (shk !== "") {
      setLoggedIn(shk);
    } else {
      setLoggedIn("");
    }
  }, [addAlert, shk, theme]);

  return (
    <Router>
      {lin ? <NavBar /> : null}
      <div
        id="body-container"
        className={clsx(styles["app"], !lin ? styles["app-anon"] : null)}
      >
        <Routes>
          {lin ? (
            <>
              <Route path="/home" element={<Homepage alerts={addAlert} />} />
              <Route
                path="/profile"
                element={<Navigate to={`/profile/${uid}`} />}
              />
              <Route
                path="/profile/:uid"
                element={<ProfilePage uid={uid} addAlerts={addAlert} />}
              />
              <Route path="/posts/:pid" element={<PostPage />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </>
          ) : (
            <>
              <Route
                path="/login"
                element={<LoginPage login={setLoggedIn} alerts={addAlert} />}
              />
              <Route path="/*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
        {lin ? <Footer /> : null}
      </div>
      <Alerts />
    </Router>
  );
};

export default App;
