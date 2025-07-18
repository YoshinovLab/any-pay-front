import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { createCheck, getUser } from "../services/api";

const Issuance: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [memo, setMemo] = useState("");
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState<number>(0);
  const userId = Number(Cookies.get("userId"));

  useEffect(() => {
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

  const handleIssue = () => {
    if (!window.confirm("発行しますよ！いいですか？✈️")) {
      return;
    }
    // 計算結果が未計算の場合は計算する
    const amount = expr !== "" ? Number(eval(expr)) : result;
    createCheck(userId, amount, memo, "")
      .then((check) => {
        window.location.href = `/issuance-result?amount=${amount}&id=${check.id}`;
      })
      .catch((error) => {
        console.error(error);
        alert("発行に失敗しました。");
      });
  };

  return (
    <Card className="max-w-md mx-auto my-8">
      {/* 発行フォーム */}
      <div>
        <div className="text-xl font-semibold mb-2 text-center">為替発行</div>
        <div className="bg-green-100 p-2 rounded-md mb-4 flex justify-between">
          <span className="font-medium">残高:</span>
          <span className="font-bold">{balance.toLocaleString()} ふぅこ</span>
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
          onClick={handleIssue}
          className="w-full bg-green-500 text-white p-2 rounded-md"
        >
          発行する
        </button>
      </div>
    </Card>
  );
};

export default Issuance;
