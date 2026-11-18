"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteWateringButton({ wateringId }: { wateringId: number }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  async function onDelete() {
    await fetch(`/api/my-plants/waterings/${wateringId}`, { method: "DELETE" });
    setShowModal(false);
    router.refresh();
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="shrink-0 rounded-full bg-gray-200 px-3 py-1 text-xs font-medium shadow-sm hover:bg-red-600"
      >
        삭제
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-xs rounded-3xl bg-white p-6 text-center shadow-lg">
            <p className="font-semibold">이 물주기 기록을 삭제할까요?</p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 rounded-full border border-gray-200 bg-white py-2 text-sm font-semibold text-gray-700 shadow-sm"
              >
                취소
              </button>
              <button
                onClick={onDelete}
                className="flex-1 rounded-full bg-red-500 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600"
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
