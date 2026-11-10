import { forward } from "@/lib/forward";
import { NextRequest } from "next/server";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  const cookie = request.headers.get("cookie") ?? undefined;
  return forward(`/api/my-plants/${id}`, "PUT", body, cookie);
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const cookie = request.headers.get("cookie") ?? undefined;
  return forward(`/api/my-plants/${id}`, "DELETE", undefined, cookie);
}
