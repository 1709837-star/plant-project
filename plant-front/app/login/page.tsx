/* 로그인 폼 (클라이언트 컴포넌트) */

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        setError("이메일 또는 비밀번호가 틀렸습니다");
        return;
      }
      router.push("/species");
      router.refresh();
    } catch {
      setError("로그인에 실패했습니다");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-sm p-6">
      <h1 className="text-2xl font-bold">로그인</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
          required
          className="w-full rounded border px-3 py-2"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          required
          className="w-full rounded border px-3 py-2"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          disabled={loading}
          className="w-full rounded bg-green-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>
        <p className="mt-4 text-center text-sm text-gray-500">
            계정이 없나요?{" "}
          <Link href="/signup" className="text-green-600 hover:underline">
            회원가입
          </Link>
        </p>
      </form>
    </main>
  );
}
