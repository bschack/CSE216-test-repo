import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AboutPage } from "./about/about";
import Homepage from "./homepage/homepage";
// import { NavBar } from '../libs/content/navBar/navBar';
import "../libs/styles/lib/globals.scss";
import { Footer } from "../libs/content/footer/footer";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
