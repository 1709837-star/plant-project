/* <<< 헤더에 있는 로그아웃 버튼 >> */

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
    <button onClick={logout} className="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-900 shadow-sm"
    >
      로그아웃
    </button>
  );
}
