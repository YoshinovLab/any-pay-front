import React, { useEffect, useState } from "react";
import Card from "../components/Card";

interface IssuanceRecord {
  id: string;
  amount: number;
  memo: string;
  date: string;
}

const IssuanceList: React.FC = () => {
  const [records, setRecords] = useState<IssuanceRecord[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("issuanceRecords");
    if (stored) {
      setRecords(JSON.parse(stored) as IssuanceRecord[]);
    }
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
                <td className="px-2 py-1">{rec.date.slice(5)}</td>
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
