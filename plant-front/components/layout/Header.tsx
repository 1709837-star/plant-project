/* << 초록 헤더 >> */
// 서버 컴포넌트 

import Link from "next/link";
import { cookies } from "next/headers";
import { getMe } from "@/lib/api";
import LogoutButton from "./LogoutButton";

export default async function Header() {
  // 페이지 그려지기 전에 쿠키를 꺼내서 "로그인한 사람이 누군지" 먼저 물어봄
  // getMe()가 null이면 비로그인, 값이 있으면 로그인 상태
  const cookie = (await cookies()).toString();
  const me = await getMe(cookie);

  return (
    <header className="bg-[#eef6e9] text-gray-900">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
        {/* 왼쪽: 로고 */}
        <Link href="/species" className="flex shrink-0 items-center gap-2 whitespace-nowrap">
          <img src="/logo1.png" alt="작은 정원 로고" className="h-12 w-30 shrink-0 object-contain" />
        </Link>

        {/* 오른쪽: 아이콘 메뉴 */}
        <nav className="flex items-center gap-4 text-xl">
          <Link href="/species" title="식물 도감">🌱</Link>
          <Link href="/plants" title="나의 정원">🌳</Link>
          {me ? (
            <>
              <Link href="/mypage" title="마이페이지">🏡</Link>
              <LogoutButton />
            </>
          ) : (
            <Link
              href="/login"
              title="로그인"
              className="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-900 shadow-sm"
            >
              로그인
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
