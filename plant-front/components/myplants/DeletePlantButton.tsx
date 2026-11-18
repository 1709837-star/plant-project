/* 내 식물 삭제 버튼 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeletePlantButton({ plantId }: { plantId: number }) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false); // 삭제 중인지
  const router = useRouter();

  const onDelete = async () => {
    setDeleting(true);
    const res = await fetch(`/api/my-plants/${plantId}`, { method: "DELETE" });
    // true되면 Route Handler에 DELETE를 보냄
    setDeleting(false);
    if (!res.ok) {
      alert("삭제에 실패했습니다.");
      return;
    }
    router.push("/plants"); // 성공하면 /plants 목록으로 이동
    router.refresh();
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex h-8 items-center rounded-full bg-red-500 px-4 text-sm font-semibold text-white shadow-sm hover:bg-red-600"
      >
        삭제하기
      </button>
      {/* 버튼을 눌러서 open이 true가 되면 모달이 열림
          fixed inset-0 : 화면 전체를 덮음
          bg-black/50 : 반투명 검정으로 뒤를 어둡게 함 */}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-lg font-semibold">식물을 삭제할까요?</h2>
            <p className="mt-2 text-sm text-gray-600">
              물주기 기록도 함께 지워집니다.
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
