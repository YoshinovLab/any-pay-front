import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import {
  claimCheck,
  createCheck,
  getClaimNonce,
  getUser,
} from "../services/api";

const FixedRemittance: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [memo, setMemo] = useState("");
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const userId = Number(Cookies.get("userId"));
  const navigate = useNavigate();

  useEffect(() => {
    // URLパラメータから送金先と金額を取得
    const params = new URLSearchParams(window.location.search);
    const to = params.get("to") || "";
    const amt = params.get("amount") || "0";
    setRecipient(to);
    setAmount(Number(amt));
    getUser(userId)
      .then((user) => setBalance(user.balance))
      .catch((err) => console.error(err));
  }, [userId]);

  const handleSend = async () => {
    if (!recipient) {
      alert("送金先が指定されていません。");
      return;
    }
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("金額が不正です。");
      return;
    }
    if (!window.confirm(`本当に${recipient}に${amount}ふぅこ送金しますか？`)) {
      return;
    }
    try {
      const check = await createCheck(userId, amount, memo, "");
      const nonce = await getClaimNonce(check.id);
      await claimCheck(check.id, nonce, Number(recipient));
      navigate("/history");
    } catch (e) {
      alert("送金に失敗しました");
      console.error(e);
    }
  };

  return (
    <Card className="max-w-md mx-auto my-8">
      {/* 定額送金フォーム */}
      <div>
        <div className="text-xl font-semibold mb-2 text-center">定額送金</div>
        <div className="bg-blue-100 p-2 rounded-md mb-4 flex justify-between">
          <span className="font-medium">残高:</span>
          <span className="font-bold">{balance.toLocaleString()} ふぅこ</span>
        </div>
        <div className="mb-2 text-center">
          <span className="font-medium">送金先: </span>
          <span className="font-bold">{recipient || "(未指定)"}</span>
        </div>
        <div className="mb-2 text-center">
          <span className="font-medium">金額: </span>
          <span className="font-bold">
            {amount ? amount.toLocaleString() : "(未指定)"} ふぅこ
          </span>
        </div>
        <input
          type="text"
          placeholder="メモ(任意)"
          className="w-full p-2 border rounded-md mb-4"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />
        <button
          onClick={() => {
            void handleSend();
          }}
          className="w-full bg-blue-500 text-white p-2 rounded-md"
        >
          送金する
        </button>
      </div>
    </Card>
  );
};

export default FixedRemittance;
