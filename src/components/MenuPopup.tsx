import React from "react";
import { Link } from "react-router-dom";

interface MenuPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuPopup: React.FC<MenuPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-4/5 max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">メニュー</h2>
          <button onClick={onClose}>
            <i className="i-ic-baseline-close text-2xl"></i>
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Link
            to="/"
            onClick={onClose}
            className="flex flex-col items-center p-3 bg-gray-100 rounded-md"
          >
            <i className="i-ic-baseline-home text-5xl mb-1"></i>
            <span>ホーム</span>
          </Link>
          <Link
            to="/about"
            onClick={onClose}
            className="flex flex-col items-center p-3 bg-gray-100 rounded-md"
          >
            <i className="i-ic-baseline-history text-5xl mb-1"></i>
            <span>履歴</span>
          </Link>
          <Link
            to="/contact"
            onClick={onClose}
            className="flex flex-col items-center p-3 bg-gray-100 rounded-md"
          >
            <i className="i-ic-baseline-attach-money text-5xl mb-1"></i>
            <span>為替発行</span>
          </Link>
          <Link
            to="/user"
            onClick={onClose}
            className="flex flex-col items-center p-3 bg-gray-100 rounded-md"
          >
            <i className="i-ic-baseline-list text-5xl mb-1"></i>
            <span>為替一覧</span>
          </Link>
          <Link
            to="/user"
            onClick={onClose}
            className="flex flex-col items-center p-3 bg-gray-100 rounded-md col-span-2"
          >
            <i className="i-ic-baseline-qr-code text-5xl mb-1"></i>
            <span>MyQR</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MenuPopup;
