"use client";

import { useRouter } from "next/navigation";

export default function BackButton({ label = "← 뒤로가기" }: { label?: string }) {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-900 shadow-sm">
      {label}
    </button>
  );
}
