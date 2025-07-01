import React from "react";
import Card from "../components/Card";

const IssuanceResult: React.FC = () => {
  // URLのクエリパラメータから値を取得
  const params = new URLSearchParams(window.location.search);
  const amount = Number(params.get("amount") ?? "0");
  const id = params.get("id") ?? "";

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
      </div>
    </Card>
  );
};

export default IssuanceResult;
