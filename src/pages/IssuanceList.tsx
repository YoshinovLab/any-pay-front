import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import type { CheckResponse } from "../services/api";
import { getChecksByUser } from "../services/api";

const IssuanceList: React.FC = () => {
  const [records, setRecords] = useState<CheckResponse[]>([]);

  useEffect(() => {
    getChecksByUser(1)
      .then(setRecords)
      .catch((err) => console.error(err));
  }, []);

  return (
    <Card className="max-w-lg mx-auto my-8">
      <div className="text-xl font-semibold mb-4 text-center">為替一覧</div>
      {records.length > 0 ? (
        <table className="table-auto w-full text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-2 py-1">日付</th>
              <th className="px-2 py-1">メモ</th>
              <th className="px-2 py-1">摘要</th>
              <th className="px-2 py-1 text-right">金額</th>
              <th className="px-2 py-1">ID</th>
              <th className="px-2 py-1">発行者ID</th>
              <th className="px-2 py-1">有効期限</th>
              <th className="px-2 py-1"></th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec) => (
              <tr key={rec.id} className="border-t">
                <td className="px-2 py-1">{rec.issued_at.slice(0, 10)}</td>
                <td className="px-2 py-1">{rec.memo}</td>
                <td className="px-2 py-1">{rec.description}</td>
                <td className="px-2 py-1 text-right">{rec.amount} ふぅこ</td>
                <td className="px-2 py-1">{rec.id}</td>
                <td className="px-2 py-1">{rec.issuer_user_id}</td>
                <td className="px-2 py-1">{rec.expires_at.slice(0, 10)}</td>
                <td className="px-2 py-1">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                    onClick={() => {
                      window.location.href = `/issuance-result?id=${encodeURIComponent(
                        rec.id,
                      )}&amount=${encodeURIComponent(rec.amount)}`;
                    }}
                  >
                    詳細
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-4">発行した為替はありません</div>
      )}
    </Card>
  );
};

export default IssuanceList;
