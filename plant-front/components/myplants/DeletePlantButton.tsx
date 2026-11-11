"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeletePlantButton({ plantId }: { plantId: number }) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const onDelete = async () => {
    setDeleting(true);
    const res = await fetch(`/api/my-plants/${plantId}`, { method: "DELETE" });
    setDeleting(false);
    if (!res.ok) {
      alert("삭제에 실패했습니다.");
      return;
    }
    router.push("/plants");
    router.refresh();
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded bg-red-600 px-4 py-2 text-white"
      >
        삭제
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-lg font-semibold">식물을 삭제할까요?</h2>
            <p className="mt-2 text-sm text-gray-600">
              이 식물을 삭제할까요? 물주기 기록도 함께 지워집니다.
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="rounded bg-gray-200 px-4 py-2"
              >
                취소
              </button>
              <button
                onClick={onDelete}
                disabled={deleting}
                className="rounded bg-red-600 px-4 py-2 text-white disabled:opacity-50"
              >
                {deleting ? "삭제 중..." : "삭제하기"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
