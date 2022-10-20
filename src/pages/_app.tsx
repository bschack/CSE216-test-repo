import {
  BrowserRouter as Router,
  Link,
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import { LoginPage } from "./loginPage/loginPage";
import Homepage from "./homepage/homepage";
// import { NavBar } from '../libs/content/navBar/navBar';
import "../libs/styles/lib/globals.scss";
import { Footer } from "../libs/content/footer/footer";
import { useEffect, useState } from "react";
import { alertProps } from "../libs/constants/constants";
import { AlertBox } from "../libs/components/alert/alert";
import { ProfilePage } from "./profilePage/profilePage";

const App = () => {
  const [loggedIn, setLoggedIn] = useState<string>("");
  // const uuid = user?.email.split("@")[0];
  const shk = window.sessionStorage.getItem("shk") || "";
  const uid = parseInt(window.sessionStorage.getItem("uid") || "-1");

  const [alertsList, setAlertsList] = useState<alertProps[]>([]);
  const { addAlert, Alerts } = AlertBox(alertsList, setAlertsList);

  useEffect(() => {
    if (shk !== "") {
      setLoggedIn(shk);
    } else {
      setLoggedIn("");
    }
  }, [addAlert, shk]);

  return (
    <Router>
      <Link to="/home">Home</Link>
      <Link to={`/profile`}>Profile</Link>
      <Link to={`/profile/1`}>Test valid profile for other person</Link>
      <Link to={`/profile/9999`}>Test invalid profile</Link>
      <Routes>
        {loggedIn !== "" ? (
          <>
            <Route path="/home" element={<Homepage alerts={addAlert} />} />
            <Route
              path="/profile"
              element={<Navigate to={`/profile/${uid}`} />}
            />
            <Route
              path="/profile/:uid"
              element={<ProfilePage uid={uid} alerts={addAlert} />}
            />
            <Route path="/login" element={<Navigate to="/home" />} />
          </>
        ) : (
          <Route
            path="/login"
            element={<LoginPage login={setLoggedIn} alerts={addAlert} />}
          />
        )}

        {loggedIn === "" ? (
          <Route path="/*" element={<Navigate to="/login" />} />
        ) : null}
      </Routes>
      <Footer />
      <Alerts />
    </Router>
  );
};

export default App;
