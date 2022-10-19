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

const App = () => {
  const [loggedIn, setLoggedIn] = useState<string>("");
  // const uuid = user?.email.split("@")[0];
  const c = window.sessionStorage.getItem("shk") || "";

  const [alertsList, setAlertsList] = useState<alertProps[]>([]);
  const { addAlert, Alerts } = AlertBox(alertsList, setAlertsList);

  useEffect(() => {
    if (c !== "") {
      setLoggedIn(c);
      addAlert(loginSuccessAlert);
    } else {
      setLoggedIn("");
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
            loggedIn !== "" ? <Navigate to="/home" /> : <Navigate to="/login" />
          }
        />
        {loggedIn !== "" ? (
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
