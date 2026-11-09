import { forward } from "@/lib/forward";
import { NextRequest } from "next/server";

type Params = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const cookie = request.headers.get("cookie") ?? undefined;
  return forward(`/api/my-plants/${id}/waterings`, "POST", body, cookie);
}
