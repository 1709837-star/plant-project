import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getMe } from "@/lib/api";
import ChangePasswordForm from "@/components/ChangePasswordForm";

export default async function MyPage() {
  const cookie = (await cookies()).toString();
  const me = await getMe(cookie);
  if (!me) redirect("/login");

  return (
    <main className="mx-auto max-w-sm p-6">
      <h1 className="text-2xl font-bold">마이페이지</h1>
      <div className="mt-6 space-y-2 rounded border p-4">
        <p><span className="text-sm text-gray-500">닉네임</span><br />{me.nickname}</p>
        <p><span className="text-sm text-gray-500">이메일</span><br />{me.email}</p>
      </div>
      <div className="mt-6 space-y-3">
        <Link href="/plants" className="block rounded bg-green-600 px-4 py-2 text-center text-white">
          내 식물 보러가기
        </Link>
      </div>
      <Link
        href="/mypage/password"
        className="mt-6 inline-block rounded bg-green-600 px-4 py-2 text-white"
        >
        비밀번호 변경
        </Link>
    </main>
  );
}
