import React from "react";
import Card from "../components/Card";
import { claimCheck, getClaimNonce } from "../services/api";

const IssuanceResult: React.FC = () => {
  // URLのクエリパラメータから値を取得
  const params = new URLSearchParams(window.location.search);
  const amount = Number(params.get("amount") ?? "0");
  const id = params.get("id") ?? "";

  // 破棄処理
  const handleDiscard = async () => {
    if (!window.confirm("本当にこの為替を破棄しますか？")) return;
    try {
      const nonce = await getClaimNonce(id);
      await claimCheck(id, nonce);
      alert("為替を破棄しました。");
      window.location.href = "/";
    } catch (e) {
      alert("破棄に失敗しました。");
      console.error(e);
    }
  };

  return (
    <Card className="max-w-md mx-auto my-8">
      <div className="space-y-4">
        <div className="border-2 border-gray-200 rounded-lg p-4">
          <div className="text-sm text-gray-500 mb-2">ふうこ為替</div>
          <div className="text-3xl font-bold text-center">{amount} ふぅこ</div>
          <div className="text-right text-sm text-gray-500 mt-2">ID: {id}</div>
        </div>
        <button
          onClick={() =>
            window.open(`https://line.me/R/msg/text/?${amount} ふぅこ`)
          }
          className="w-full bg-blue-500 text-white p-2 rounded-md"
        >
          LINEのお友達に送る
        </button>
        <button
          onClick={() => window.history.back()}
          className="w-full bg-red-500 text-white p-2 rounded-md"
        >
          閉じる
        </button>
        <button
          onClick={() => { void handleDiscard(); }}
          className="w-full bg-gray-400 text-white p-2 rounded-md mt-2"
        >
          為替を破棄する
        </button>
      </div>
    </Card>
  );
};

export default IssuanceResult;
