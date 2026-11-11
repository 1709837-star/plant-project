"use client";

import { useState } from "react";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth/password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await res.json().catch(() => ({}));
    setMessage(res.ok ? "비밀번호가 변경되었습니다" : (data.message ?? "변경에 실패했습니다"));
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-3 rounded border p-4">
      <h2 className="font-semibold">비밀번호 변경</h2>
      <input
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        placeholder="현재 비밀번호"
        required
        className="w-full rounded border px-3 py-2"
      />
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="새 비밀번호 (4자 이상)"
        required
        minLength={4}
        className="w-full rounded border px-3 py-2"
      />
      {message && <p className="text-sm text-gray-600">{message}</p>}
      <button className="w-full rounded bg-green-600 px-4 py-2 text-white">
        비밀번호 변경하기
      </button>
    </form>
  );
}
