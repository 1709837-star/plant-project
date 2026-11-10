import Link from "next/link";
import { cookies } from "next/headers";
import { getMe } from "@/lib/api";
import LogoutButton from "./LogoutButton";

export default async function Header() {
  const cookie = (await cookies()).toString();
  const me = await getMe(cookie);

  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-2xl items-center justify-between p-4">
        <Link href="/species" className="text-lg font-bold">🌱 반려식물</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/species">도감</Link>
          <Link href="/plants">내 식물</Link>
          {me ? (
            <>
              <span>{me.nickname ?? me.email}님</span>
              <LogoutButton />
            </>
          ) : (
            <Link href="/login" className="rounded bg-green-600 px-3 py-1.5 text-white">
              로그인
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
