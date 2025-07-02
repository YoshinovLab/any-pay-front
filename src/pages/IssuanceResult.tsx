import React from "react";
import Card from "../components/Card";
import { claimCheck, getClaimNonce, getUser } from "../services/api";

const IssuanceResult: React.FC = () => {
  // URLのクエリパラメータから値を取得
  const params = new URLSearchParams(window.location.search);
  const amount = Number(params.get("amount") ?? "0");
  const id = params.get("id") ?? "";

  // 使用処理
  const handleUse = async () => {
    if (!window.confirm("本当にこの為替を使用しますか？")) return;
    try {
      // 自分のユーザーIDを取得する方法（例: グローバル状態やpropsから）
      // ここでは例としてwindow.userIdを利用（実際は適切な取得方法に置換してください）
      const me = await getUser(1);
      const nonce = await getClaimNonce(id);
      await claimCheck(id, nonce, me.id);
      alert("為替を使用しました。");
      window.history.back();
    } catch (e) {
      alert("使用に失敗しました。");
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
          onClick={() => {
            void handleUse();
          }}
          className="w-full bg-green-500 text-white p-2 rounded-md"
        >
          為替を使う
        </button>
        <button
          onClick={() => {
            void (async () => {
              try {
                await navigator.clipboard.writeText(window.location.href);
                alert("リンクをコピーしました");
              } catch {
                alert("コピーに失敗しました");
              }
            })();
          }}
          className="w-full bg-blue-500 text-white p-2 rounded-md"
        >
          リンクをコピー
        </button>
        <button
          onClick={() => (window.location.href = "/")}
          className="w-full bg-red-500 text-white p-2 rounded-md"
        >
          閉じる
        </button>
      </div>
    </Card>
  );
};

export default IssuanceResult;
