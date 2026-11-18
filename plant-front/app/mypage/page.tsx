/* << 마이페이지 >> */

import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getMe } from "@/lib/api";

export default async function MyPage() {
  // 쿠키를 꺼내서 getMe()로 누구인지 물어보고, null이면 로그인 페이지로 쫓아냄
  const cookie = (await cookies()).toString();
  const me = await getMe(cookie);
  if (!me) redirect("/login");

  return (
    <main className="mx-auto max-w-sm p-6">
      <h1 className="text-2xl text-center font-bold">마이페이지</h1>
      <div className="mx-auto mt-6 w-64 space-y-2 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm">
        <p><span className="text-sm text-gray-500">닉네임</span><br />{me.nickname}</p>
        <p><span className="text-sm text-gray-500">이메일</span><br /><span className="break-all text-sm">{me.email}</span></p>
      </div>
      <div className="mx-auto mt-6 flex w-64 flex-col gap-3">
        <Link href="/plants" className="rounded-full bg-green-500 px-4 py-2.5 text-center font-medium text-white shadow-sm hover:bg-green-600">
          👀 내 식물 보러가기
        </Link>
        <Link href="/mypage/password" className="rounded-full bg-green-500 px-4 py-2.5 text-center font-medium text-white shadow-sm hover:bg-green-600">
          🔒 비밀번호 변경
        </Link>
      </div>
    </main>
  );
}
