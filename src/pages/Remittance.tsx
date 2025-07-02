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

const Remittance: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [memo, setMemo] = useState("");
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState<number>(0);
  const [recipient, setRecipient] = useState<string>("");

  const userId = Number(Cookies.get("userId"));
  const navigate = useNavigate();

  useEffect(() => {
    // URLパラメータから送金先を取得
    const params = new URLSearchParams(window.location.search);
    const to = params.get("to") || "";
    setRecipient(to);
    getUser(userId)
      .then((user) => setBalance(user.balance))
      .catch((err) => console.error(err));
  }, [userId]);

  const handleButton = (val: string) => () => {
    setExpr((prev) => prev + val);
  };
  const handleClear = () => {
    setExpr("");
    setResult(0);
  };
  const handleCalc = () => {
    try {
      const res = Number(eval(expr || "0"));
      setResult(res);
      setExpr(String(res));
    } catch {
      alert("Invalid expression");
    }
  };

  const handleSend = async () => {
    if (!recipient) {
      alert("送金先が指定されていません。");
      return;
    }
    if (!window.confirm(`本当に${recipient}に送金しますか？`)) {
      return;
    }
    const amount = expr !== "" ? Number(eval(expr)) : result;
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
      {/* 送金フォーム */}
      <div>
        <div className="text-xl font-semibold mb-2 text-center">送金</div>
        <div className="bg-blue-100 p-2 rounded-md mb-4 flex justify-between">
          <span className="font-medium">残高:</span>
          <span className="font-bold">{balance.toLocaleString()} ふぅこ</span>
        </div>
        <div className="mb-2 text-center">
          <span className="font-medium">送金先: </span>
          <span className="font-bold">{recipient || "(未指定)"}</span>
        </div>
        <input
          type="text"
          placeholder="メモ(任意)"
          className="w-full p-2 border rounded-md mb-4"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />
        <div className="w-full p-2 mb-4 text-right text-xl border rounded-md">
          {expr || result}
        </div>
        <div className="grid grid-cols-4 gap-2 mb-4">
          <button
            onClick={handleButton("1")}
            className="p-2 bg-gray-100 rounded-md"
          >
            1
          </button>
          <button
            onClick={handleButton("2")}
            className="p-2 bg-gray-100 rounded-md"
          >
            2
          </button>
          <button
            onClick={handleButton("3")}
            className="p-2 bg-gray-100 rounded-md"
          >
            3
          </button>
          <button
            onClick={handleButton("+")}
            className="p-2 bg-yellow-100 rounded-md"
          >
            +
          </button>

          <button
            onClick={handleButton("4")}
            className="p-2 bg-gray-100 rounded-md"
          >
            4
          </button>
          <button
            onClick={handleButton("5")}
            className="p-2 bg-gray-100 rounded-md"
          >
            5
          </button>
          <button
            onClick={handleButton("6")}
            className="p-2 bg-gray-100 rounded-md"
          >
            6
          </button>
          <button
            onClick={handleButton("-")}
            className="p-2 bg-yellow-100 rounded-md"
          >
            -
          </button>

          <button
            onClick={handleButton("7")}
            className="p-2 bg-gray-100 rounded-md"
          >
            7
          </button>
          <button
            onClick={handleButton("8")}
            className="p-2 bg-gray-100 rounded-md"
          >
            8
          </button>
          <button
            onClick={handleButton("9")}
            className="p-2 bg-gray-100 rounded-md"
          >
            9
          </button>
          <button
            onClick={handleButton("*")}
            className="p-2 bg-yellow-100 rounded-md"
          >
            *
          </button>

          <button onClick={handleClear} className="p-2 bg-red-200 rounded-md">
            C
          </button>
          <button
            onClick={handleButton("0")}
            className="p-2 bg-gray-100 rounded-md"
          >
            0
          </button>
          <button onClick={handleCalc} className="p-2 bg-green-200 rounded-md">
            =
          </button>
          <button
            onClick={handleButton("/")}
            className="p-2 bg-yellow-100 rounded-md"
          >
            /
          </button>
        </div>
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

export default Remittance;
