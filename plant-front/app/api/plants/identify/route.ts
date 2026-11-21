import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const cookie = req.headers.get("cookie") ?? "";

  const res = await fetch("http://127.0.0.1:8080/api/plants/identify", {
    method: "POST",
    headers: { cookie },
    body: formData,
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
