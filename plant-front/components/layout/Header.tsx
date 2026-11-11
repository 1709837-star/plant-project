import Link from "next/link";
import { cookies } from "next/headers";
import { getMe } from "@/lib/api";
import LogoutButton from "./LogoutButton";

export default async function Header() {
  const cookie = (await cookies()).toString();
  const me = await getMe(cookie);

  return (
    <header className="bg-green-700 text-white">
      <div className="mx-auto max-w-2xl px-4 py-3">
        <Link href="/species" className="block text-center text-xl font-bold">
          🌿 작은 정원
        </Link>
        <nav className="mt-2 flex items-center justify-between px-2 text-sm">
          <Link href="/species">식물 도감</Link>
          <Link href="/plants">나의 정원</Link>
          {me ? (
            <>
              <Link href="/mypage">마이페이지</Link>
              <LogoutButton />
            </>
          ) : (
            <Link href="/login" className="rounded-full bg-white px-3 py-1 font-semibold text-green-700">
              로그인
            </Link>
          )}
        </nav>
      </div>
    </header>

  );
}
