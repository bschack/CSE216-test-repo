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
import { alertProps, loginSuccessAlert } from "../libs/constants/constants";
import { AlertBox } from "../libs/components/alert/alert";
// import { googleUserType } from "../libs/constants/types";

const App = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  // const uuid = user?.email.split("@")[0];
  const c = window.sessionStorage.getItem("user_logged_in");

  const [alertsList, setAlertsList] = useState<alertProps[]>([]);
  const { addAlert, Alerts } = AlertBox(alertsList, setAlertsList);

  useEffect(() => {
    if (c === "true") {
      setLoggedIn(true);
      addAlert(loginSuccessAlert);
    } else {
      setLoggedIn(false);
    }
  }, [addAlert, c]);

  return (
    <Router>
      <Link to="/home">Home</Link>
      <Link to="/profile">Profile</Link>
      <Routes>
        <Route
          path="*"
          element={
            loggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />
          }
        />
        {loggedIn ? (
          <>
            <Route path="/home" element={<Homepage />} />
            <Route path="/profile" element={"Profile page"} />
          </>
        ) : (
          <Route path="/login" element={<LoginPage login={setLoggedIn} />} />
        )}
      </Routes>
      <Footer />
      <Alerts />
    </Router>
  );
};

export default App;
