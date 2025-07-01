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

// ユーザーを取得
export async function getUser(userId: number): Promise<UserData> {
  const res = await fetch(`/api/user/${userId}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch user: ${res.status}`);
  }
  return (await res.json()) as UserData;
}

// チェックレスポンス型定義
export interface CheckResponse {
  id: string;
  amount: number;
  memo: string | null;
  // 発行日時
  issued_at: string;
  // 有効期限
  expires_at: string;
}

// ユーザーが発行した未受取チェックを取得
export async function getChecksByUser(
  userId: number,
): Promise<CheckResponse[]> {
  const res = await fetch(`/api/check/user/${userId}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch checks: ${res.status}`);
  }
  return (await res.json()) as CheckResponse[];
}
