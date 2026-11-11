"use client";

import { useRouter } from "next/navigation";

export default function BackButton({ label = "← 뒤로가기" }: { label?: string }) {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className="text-sm text-gray-600 hover:underline">
      {label}
    </button>
  );
}
