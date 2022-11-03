import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import { LoginPage } from "./loginPage/loginPage";
import Homepage from "./homepage/homepage";
import "../libs/styles/lib/globals.scss";
import { Footer } from "../libs/content/footer/footer";
import { useEffect, useState } from "react";
import { alertProps } from "../libs/constants/constants";
import { AlertBox } from "../libs/components/alert/alert";
import { ProfilePage } from "./profilePage/profilePage";
import { NavBar } from "../libs/content/navBar/navBar";
import styles from "../libs/styles/lib/app.module.scss";
import clsx from "clsx";
import { PostPage } from "./postPage/postPage";

const App = () => {
  const [loggedIn, setLoggedIn] = useState<string>("");
  // const uuid = user?.email.split("@")[0];
  const shk = window.sessionStorage.getItem("shk") || "";
  const uid = parseInt(window.sessionStorage.getItem("uid") || "-1");

  const [alertsList, setAlertsList] = useState<alertProps[]>([]);
  const { addAlert, Alerts } = AlertBox(alertsList, setAlertsList);

  const lin = loggedIn !== "";

  useEffect(() => {
    if (shk !== "") {
      setLoggedIn(shk);
    } else {
      setLoggedIn("");
    }
  }, [addAlert, shk]);

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
              <Route path="/login" element={<Navigate to="/home" />} />
              <Route path="/post/:pid" element={<PostPage />} />
            </>
          ) : (
            <Route
              path="/login"
              element={<LoginPage login={setLoggedIn} alerts={addAlert} />}
            />
          )}

          {shk === "" ? (
            <Route path="/*" element={<Navigate to="/login" />} />
          ) : null}
        </Routes>
        {lin ? <Footer /> : null}
      </div>
      <Alerts />
    </Router>
  );
};

export default App;
