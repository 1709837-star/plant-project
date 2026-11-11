"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/species");
    router.refresh();
  };
  return (
    <button onClick={logout} className="rounded border px-3 py-1.5">
      로그아웃
    </button>
  );
}
