import Link from "next/link";
import { cookies } from "next/headers";
import { getMe } from "@/lib/api";
import LogoutButton from "./LogoutButton";

export default async function Header() {
  const cookie = (await cookies()).toString();
  const me = await getMe(cookie);

  return (
    <header className="border-b px-4 py-3">
      <div className="text-center">
        <Link href="/species" className="text-xl font-bold">
          🌿 작은 정원
        </Link>
      </div>
      <nav className="mt-2 flex items-center justify-center gap-6 text-sm">
        <Link href="/species" className="whitespace-nowrap">
          식물 도감
        </Link>
        <Link href="/plants" className="whitespace-nowrap">
          나의 정원
        </Link>
        {me ? (
          <>
            <Link href="/mypage" className="whitespace-nowrap">
              마이페이지
            </Link>
            <LogoutButton />
          </>
        ) : (
          <Link
            href="/login"
            className="whitespace-nowrap rounded bg-green-600 px-3 py-1.5 text-white"
          >
            로그인
          </Link>
        )}
      </nav>
    </header>
  );
}
