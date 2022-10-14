import {
  BrowserRouter as Router,
  Link,
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import { LoginPage } from "./login/login";
import Homepage from "./homepage/homepage";
// import { NavBar } from '../libs/content/navBar/navBar';
import "../libs/styles/lib/globals.scss";
import { Footer } from "../libs/content/footer/footer";
import { useState } from "react";
import { googleUserType } from "../libs/constants/types";

const App = () => {
  const [user, setUser] = useState<googleUserType>();

  const uuid = user?.email.split("@")[0];

  return (
    <Router>
      <Link to="/home">Home</Link>
      <Link to="/profile">Profile</Link>
      <Routes>
        <Route
          path="/*"
          element={user ? <Navigate to="/home" /> : <Navigate to="/login" />}
        />
        {user ? (
          <>
            <Route path="/home" element={<Homepage />} />
            <Route path="/profile" element={uuid} />
          </>
        ) : (
          <Route path="/login" element={<LoginPage login={setUser} />} />
        )}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
