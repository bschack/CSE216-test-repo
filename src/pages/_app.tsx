import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AboutPage } from './about/about';
import Homepage from './homepage/homepage';
import { NavBar } from '../libs/content/navBar/navBar';

const App = () => {
  return (
    <Router>
    <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
