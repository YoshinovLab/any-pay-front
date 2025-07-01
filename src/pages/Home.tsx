import React from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";

const User: React.FC = () => (
  <Card className="max-w-lg mx-auto my-8">
    <div className="flex items-center mb-4">
      <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center mr-4">
        <i className="i-ic-baseline-person text-5xl"></i>
      </div>
      <div>
        <div className="text-lg font-semibold">MizunoShota/水野翔太</div>
        <div className="text-sm text-gray-600">ID: 213278592169</div>
      </div>
    </div>
    <div className="bg-green-100 p-2 rounded-md mb-6">
      <span className="font-medium">残高: </span>
      <span className="font-bold">5,392 ふぅこ</span>
    </div>
    <div className="grid grid-cols-4 gap-2">
      <Link
        to="/"
        className="flex flex-col items-center p-2 bg-gray-100 rounded-md"
      >
        <i className="i-ic-baseline-home text-5xl mb-2"></i>
        <span>ホーム</span>
      </Link>
      <Link
        to="/history"
        className="flex flex-col items-center p-2 bg-gray-100 rounded-md"
      >
        <i className="i-ic-baseline-history text-5xl mb-2"></i>
        <span>履歴</span>
      </Link>
      <Link
        to="/issuance"
        className="flex flex-col items-center p-2 bg-gray-100 rounded-md"
      >
        <i className="i-ic-baseline-attach-money text-5xl mb-2"></i>
        <span>為替発行</span>
      </Link>
      <Link
        to="/issuance-list"
        className="flex flex-col items-center p-2 bg-gray-100 rounded-md"
      >
        <i className="i-ic-baseline-list text-5xl mb-2"></i>
        <span>為替一覧</span>
      </Link>
      <Link
        to="/my-qr-code"
        className="flex flex-col items-center p-2 bg-gray-100 rounded-md col-span-2"
      >
        <i className="i-ic-baseline-qr-code text-5xl mb-2"></i>
        <span>MyQR</span>
      </Link>
    </div>
  </Card>
);

export default User;
