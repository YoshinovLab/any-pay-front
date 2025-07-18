import Cookies from "js-cookie";
import React, { useState } from "react";
import Card from "../components/Card";

const Login: React.FC = () => {
  const [userId, setUserId] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      alert("userIdを入力してください");
      return;
    }
    // テスト用: userIdをCookieに保存（有効期限5分）
    Cookies.set("userId", userId, { expires: 1 / 288, path: "/" });
    alert(`userId ${userId} でログインしました`);
    window.location.href = "/";
  };

  return (
    <Card className="max-w-md mx-auto my-8">
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="text-xl font-semibold mb-2 text-center">ログイン</div>
        <input
          type="number"
          placeholder="userIdを入力"
          className="w-full p-2 border rounded-md"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md"
        >
          ログイン
        </button>
      </form>
    </Card>
  );
};

export default Login;
