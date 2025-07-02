import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import type { TransactionResponse } from "../services/api";
import { getTransactionsByUser } from "../services/api";

const History: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  // 月表示用 state
  const today = new Date();
  const [yearMonth, setYearMonth] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  });

  // 初期ロードでユーザーのトランザクション履歴取得
  useEffect(() => {
    const startDate = `${yearMonth.year}-${String(yearMonth.month).padStart(
      2,
      "0",
    )}-01`;
    const endDate = `${yearMonth.year}-${String(yearMonth.month).padStart(
      2,
      "0",
    )}-${new Date(yearMonth.year, yearMonth.month, 0).getDate()}`;
    getTransactionsByUser(1, startDate, endDate)
      .then(setTransactions)
      .catch((err) => console.error(err));
  }, [yearMonth.month, yearMonth.year]);
  // 月移動
  const prevMonth = () => {
    setYearMonth(({ year, month }) => ({
      year: month === 1 ? year - 1 : year,
      month: month === 1 ? 12 : month - 1,
    }));
  };
  const nextMonth = () => {
    setYearMonth(({ year, month }) => ({
      year: month === 12 ? year + 1 : year,
      month: month === 12 ? 1 : month + 1,
    }));
  };
  // 該当月の取引フィルタ
  const ym = `${yearMonth.year}-${String(yearMonth.month).padStart(2, "0")}`;
  const monthly = transactions.filter((tx) => tx.created_at.startsWith(ym));
  return (
    <Card className="max-w-lg mx-auto my-8">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          className="bg-green-500 text-white px-2 py-1 rounded-md"
        >
          &lt;
        </button>
        <div className="text-lg font-semibold">
          {yearMonth.year}/{String(yearMonth.month).padStart(2, "0")}
        </div>
        <button
          onClick={nextMonth}
          className="bg-green-500 text-white px-2 py-1 rounded-md"
        >
          &gt;
        </button>
      </div>
      <hr className="mb-4" />
      {monthly.length > 0 ? (
        <table className="table-auto w-full text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-2 py-1 text-left">日付</th>
              <th className="px-2 py-1 text-left">メモ</th>
              <th className="px-2 py-1 text-right">金額</th>
            </tr>
          </thead>
          <tbody>
            {monthly.map((tx) => (
              <tr key={tx.id} className="border-t">
                <td className="px-2 py-1">{tx.created_at.slice(8)}</td>
                <td className="px-2 py-1">{tx.memo ?? "-"}</td>
                <td className="px-2 py-1 text-right">
                  {tx.amount.toLocaleString()} ふぅこ
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-4">データはなかったよ ✌️</div>
      )}
    </Card>
  );
};

export default History;
