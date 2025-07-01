import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MenuPopup from "./components/MenuPopup.tsx";
import __Home from "./pages/__Home.tsx";
import History from "./pages/History.tsx";
import Home from "./pages/Home.tsx";
import Issuance from "./pages/Issuance.tsx";
import IssuanceList from "./pages/IssuanceList.tsx";
import IssuanceResult from "./pages/IssuanceResult.tsx";
import MyQRCode from "./pages/MyQRCode.tsx";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <BrowserRouter>
      <div className="relative h-screen">
        <nav className="absolute top-0 right-0 p-4 flex items-center z-10">
          <button onClick={() => setIsMenuOpen(true)} className="text-xl">
            <i className="i-ic-baseline-menu text-5xl"></i>
          </button>
        </nav>
        <div className="flex h-full justify-center items-center">
          <Routes>
            <Route path="/__home" element={<__Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/issuance" element={<Issuance />} />
            <Route path="/my-qr-code" element={<MyQRCode />} />
            <Route path="/issuance-list" element={<IssuanceList />} />
            <Route path="/issuance/result" element={<IssuanceResult />} />
          </Routes>
        </div>
        <MenuPopup isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>
    </BrowserRouter>
  );
}

export default App;
