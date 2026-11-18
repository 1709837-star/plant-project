/* << 비밀번호 변경 폼 >> */
// 클라이언트 컴포넌트 

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ChangePasswordForm() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);  // 처음엔 false라서 모달이 안 보임. 비밀번호 변경 성공하면 true -> 모달창 

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("새 비밀번호가 일치하지 않습니다");
      return;
    }
    const res = await fetch("/api/auth/password", {
      method: "PUT", // 수정하는 거니까
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      setShowModal(true);
    } else {
      setMessage(data.message ?? "변경에 실패했습니다.")
    }
    setMessage(res.ok ? "비밀번호가 변경되었습니다" : (data.message ?? "변경에 실패했습니다"));
  }

  return (
    <>
      <form onSubmit={onSubmit} className="mx-auto mt-4 flex w-64 flex-col gap-3">
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="현재 비밀번호"
          className="w-full rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm shadow-sm outline-none focus:ring-2 focus:ring-green-100"
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="새 비밀번호 (4자 이상)"
          className="w-full rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm shadow-sm outline-none focus:ring-2 focus:ring-green-100"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="새 비밀번호 확인"
          className="w-full rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm shadow-sm outline-none focus:ring-2 focus:ring-green-100"
        />
        <button className="w-full rounded-full bg-green-500 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-600">
          변경하기
        </button>
        {message && <p className="text-center text-sm text-gray-500">{message}</p>}
      </form>

      {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-xs rounded-3xl bg-white p-6 text-center shadow-lg">
              <p className="font-semibold">비밀번호가 변경되었습니다.</p>
              <button
                onClick={() => router.push("/mypage")}
                className="mt-4 w-full rounded-full bg-green-500 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-600"
              >
                확인
              </button>
            </div>
          </div>
        )}
      </>
  );
}
