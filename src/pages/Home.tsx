import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import type { UserData } from "../services/api";
import { getUser } from "../services/api";

const User: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  useEffect(() => {
    const userId = Number(Cookies.get("userId"));
    getUser(userId)
      .then(setUserData)
      .catch((err) => console.error(err));
  }, []);

  if (!userData) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <Card className="max-w-lg mx-auto my-8">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center mr-4">
          <i className="i-ic-baseline-person text-5xl"></i>
        </div>
        <div>
          <div className="text-lg font-semibold">
            {userData.editable_profile.name}
          </div>
          <div className="text-sm text-gray-600">ID: {userData.id}</div>
          <div className="text-sm text-gray-600">
            Email: {userData.editable_profile.email}
          </div>
          <div className="text-sm text-gray-600">
            Phone: {userData.editable_profile.phone}
          </div>
        </div>
      </div>
      <div className="bg-green-100 p-2 rounded-md mb-6">
        <span className="font-medium">残高: </span>
        <span className="font-bold">
          {userData.balance.toLocaleString()} ふぅこ
        </span>
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
};

export default User;
