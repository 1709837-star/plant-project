/* 사진 올리기 중계 */

// 다른 Route Handler들이 forward()를 쓰는 것과 달리, (JSON으로 바꿈)
// 파일은 직접 fetch()를 함 - 파일을 보내야 하기 때문
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { API_BASE } from "@/lib/api";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // 주소에서 id 꺼내옴
  const cookie = (await cookies()).toString();
  const formData = await req.formData();
  const res = await fetch(`${API_BASE}/api/my-plants/${id}/photo`, {
    method: "POST",
    headers: { Cookie: cookie },
    body: formData,
  });
  const data = await res.json().catch(() => ({})); // 스프링이 준 답을 JSON으로 읽음
  return NextResponse.json(data, { status: res.status });
}
