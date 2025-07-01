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
