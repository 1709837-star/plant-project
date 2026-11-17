/* 로그인 폼 */
// 클라이언트 컴포넌트 - 입력값을 받아야 함 

// 입력값 모으기 > Route Handler에 POST > 실패하면 문구 보여주기 > 성공하면 도감으로 이동 + 헤더 새로고침
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // 틀렸을 때 보여줄 문구
  const [loading, setLoading] = useState(false);  // 로그인 처리 중인지 (버튼 막는 용도)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault(); // 폼이 새로고침하는 기본 동작을 막음 (입력값 안 날아가게)
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", { // 스프링에 직접 가는게 아니라, Route Handler api/auth/login을 부름
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        setError("이메일 또는 비밀번호가 틀렸습니다");
        return;
      }
      router.push("/species"); // 성공하면 /species로 이동
      router.refresh();        // 헤더를 다시 그려라 (로그인 버튼 -> 로그아웃 버튼 보여야하니까)
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
          onChange={(e) => setEmail(e.target.value)} // 입력할 때마다 email상태가 바뀌는 제어 컴포넌트
          placeholder="이메일"
          required // 비어있으면 브라우저가 알아서 막아줌
          className="w-full rounded-full border border-gray-200 bg-white px-4 py-2.5 shadow-sm outline-none"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // 입력할 때마다 비밀번호 상태가 바뀌는 제어 컴포넌트
          placeholder="비밀번호"
          required
          className="w-full rounded-full border border-gray-200 bg-white px-4 py-2.5 shadow-sm outline-none"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          disabled={loading}
          className="w-full rounded-full bg-green-500 px-4 py-2.5 font-semibold text-white shadow-sm hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>
        <p className="mt-4 text-center text-sm text-gray-500">
            계정이 없나요?{" "}
          <Link href="/signup" className="text-green-500 hover:underline">
            회원가입
          </Link>
        </p>
      </form>
    </main>
  );
}
