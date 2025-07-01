import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MenuPopup from "./components/MenuPopup";
import __Home from "./pages/__Home.tsx";
import Home from "./pages/Home.tsx";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div className="p-4">
        <Routes>
          <Route path="/__home" element={<__Home />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
      <MenuPopup isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </Router>
  );
}

export default App;
