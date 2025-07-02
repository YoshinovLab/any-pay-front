import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import MenuPopup from "./components/MenuPopup.tsx";
import FixedRemittance from "./pages/FixedRemittance.tsx";
import History from "./pages/History.tsx";
import Home from "./pages/Home.tsx";
import Issuance from "./pages/Issuance.tsx";
import IssuanceList from "./pages/IssuanceList.tsx";
import IssuanceResult from "./pages/IssuanceResult.tsx";
import Login from "./pages/Login.tsx";
import MyQRCode from "./pages/MyQRCode.tsx";
import Remittance from "./pages/Remittance.tsx";

export default App;

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const userId = Cookies.get("userId");
    const base = import.meta.env.BASE_URL;
    if (!userId && window.location.pathname !== `${base}login`) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);
  return (
    <div className="relative h-screen">
      <nav className="absolute top-0 right-0 p-4 flex items-center z-10">
        <button onClick={() => setIsMenuOpen(true)} className="text-xl">
          <i className="i-ic-baseline-menu text-5xl"></i>
        </button>
      </nav>
      <div className="flex h-full justify-center items-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/issuance" element={<Issuance />} />
          <Route path="/my-qr-code" element={<MyQRCode />} />
          <Route path="/issuance-list" element={<IssuanceList />} />
          <Route path="/issuance-result" element={<IssuanceResult />} />
          <Route path="/remittance" element={<Remittance />} />
          <Route path="/login" element={<Login />} />
          <Route path="/fixed-remittance" element={<FixedRemittance />} />
        </Routes>
      </div>
      <MenuPopup isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
}
