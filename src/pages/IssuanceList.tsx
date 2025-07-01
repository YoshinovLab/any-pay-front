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
              <th className="px-2 py-1 text-right">金額</th>
              <th className="px-2 py-1">ID</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec) => (
              <tr key={rec.id} className="border-t">
                <td className="px-2 py-1">{rec.issued_at.slice(0, 10)}</td>
                <td className="px-2 py-1">{rec.memo}</td>
                <td className="px-2 py-1 text-right">{rec.amount} ふぅこ</td>
                <td className="px-2 py-1">{rec.id}</td>
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
