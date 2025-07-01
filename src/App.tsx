import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PWABadge from "./PWABadge.tsx";
import icon from "/favicon.svg?url";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import User from "./pages/User";
import MenuPopup from "./components/MenuPopup";

function App() {
  const [count, setCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <nav className="p-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/" className="mr-4">
            Home
          </Link>
          <Link to="/about" className="mr-4">
            About
          </Link>
          <Link to="/contact" className="mr-4">
            Contact
          </Link>
          <Link to="/user" className="ml-4">
            User
          </Link>
        </div>
        <button onClick={() => setIsMenuOpen(true)} className="text-xl">
          <i className="i-ic-baseline-menu"></i>
        </button>
      </nav>
      <hr />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </div>
      <footer className="p-4 border-t">
        <img src={icon} alt="icon" width={100} />
        <button onClick={() => setCount(count + 1)} className="ml-4">
          {count}
        </button>
        <PWABadge />
      </footer>
      <MenuPopup isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </Router>
  );
}

export default App;
