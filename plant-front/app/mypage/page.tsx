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
      <h1 className="text-2xl font-bold">마이페이지</h1>
      <div className="mt-6 space-y-2 rounded border p-4">
        <p><span className="text-sm text-gray-500">닉네임</span><br />{me.nickname}</p>
        <p><span className="text-sm text-gray-500">이메일</span><br />{me.email}</p>
      </div>
      <div className="mt-6 flex w-48 flex-col gap-3"> {/* 부모에 w-48을 주고, 버튼들이 그 너비를 꽉 채우도록 (같은 너비) */}
        <Link href="/plants" className="rounded bg-green-600 px-4 py-2 text-center text-white">
          👀 내 식물 보러가기
        </Link>
        <Link href="/mypage/password" className="rounded bg-green-600 px-4 py-2 text-center text-white">
          🔒 비밀번호 변경
        </Link>
      </div>
    </main>
  );
}
