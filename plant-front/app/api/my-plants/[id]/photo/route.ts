import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { API_BASE } from "@/lib/api";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cookie = (await cookies()).toString();
  const formData = await req.formData();
  const res = await fetch(`${API_BASE}/api/my-plants/${id}/photo`, {
    method: "POST",
    headers: { Cookie: cookie },
    body: formData,
  });
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
