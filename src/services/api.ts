// APIサービス: ユーザーおよびチェック関連の取得

// ユーザーデータ型定義
export interface UserData {
  id: number;
  balance: number;
  core_profile: {
    date_of_birth: string;
    created_at: string;
  };
  editable_profile: {
    name: string;
    email: string;
    phone: string;
    updated_at: string;
  };
  attrs: Record<string, { value: string; label: string }>;
}

// APIベースURL
const API_BASE: string = import.meta.env.VITE_API_BASE_URL as string;

// ユーザーを取得
export async function getUser(userId: number): Promise<UserData> {
  const res = await fetch(`${API_BASE}user/${userId}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch user: ${res.status}`);
  }
  return (await res.json()) as UserData;
}

// チェックレスポンス型定義
export interface CheckResponse {
  description: string;
  issuer_user_id: string;
  id: string;
  amount: number;
  memo: string | null;
  issued_at: string;
  expires_at: string;
}

// ユーザーが発行した未受取チェックを取得
export async function getChecksByUser(
  userId: number,
): Promise<CheckResponse[]> {
  const res = await fetch(`${API_BASE}check/user/${userId}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch checks: ${res.status}`);
  }
  return (await res.json()) as CheckResponse[];
}

// チェックを発行
export async function createCheck(
  issuer_user_id: number,
  amount: number,
  memo: string,
  description: string,
): Promise<CheckResponse> {
  const res = await fetch(
    `${API_BASE}check/?issuer_user_id=${issuer_user_id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount, memo, description }),
    },
  );
  console.log(res.body);
  if (!res.ok) {
    console.error("Response:", await res.json());
    throw new Error(`Failed to issue check: ${res.status}`);
  }

  return (await res.json()) as CheckResponse;
}

// トランザクションレスポンス型定義
export interface TransactionResponse {
  id: string;
  amount: number;
  memo: string | null;
  created_at: string;
  // other fields omitted
}

// 指定ユーザーのトランザクション履歴取得
export async function getTransactionsByUser(
  userId: number,
  startDate: string,
  endDate: string,
): Promise<TransactionResponse[]> {
  const res = await fetch(
    `${API_BASE}transaction/user/${userId}?start_date=${startDate}&end_date=${endDate}`,
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch transactions: ${res.status}`);
  }
  return (await res.json()) as TransactionResponse[];
}
interface CheckClaimResponse {
  nonce: string;
}
// チェックclaim用nonce取得
export async function getClaimNonce(checkId: string): Promise<string> {
  const res = await fetch(`${API_BASE}check/${checkId}/claim/init`);
  if (!res.ok) {
    console.error("Response:", await res.json());
    throw new Error("nonce取得失敗");
  }
  const data: { nonce: string } = (await res.json()) as CheckClaimResponse;
  // nonceをCookieに明示的にセット
  document.cookie = `check_claim_nonce=${data.nonce}; path=/`;
  return data.nonce;
}

// チェックをclaim（破棄）
export async function claimCheck(
  checkId: string,
  nonce: string,
  recipientId: number,
): Promise<void> {
  const res = await fetch(
    `${API_BASE}check/${checkId}/claim?nonce=${encodeURIComponent(
      nonce,
    )}&recipient_id=${recipientId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
      credentials: "include",
    },
  );
  if (!res.ok) {
    console.error("Response:", await res.json());
    throw new Error("破棄処理失敗");
  }
}
