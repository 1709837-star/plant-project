/* 내 식물 목록 (서버 컴포넌트, D-day순) */

import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getMyPlants } from "@/lib/api";
import WaterButton from "@/components/myplants/WaterButton";

export default async function MyPlantsPage() {
  const cookieStore = await cookies();
  const plants = await getMyPlants(cookieStore.toString());

  // 로그인 안 했으면 로그인 페이지로 보내
  if (plants === null) redirect("/login");

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-bold">내 식물</h1>
      <p className="mt-1 text-sm text-gray-500">D-day 임박순으로 보여줍니다</p>

      {plants.length === 0 ? (
        <p className="mt-8 text-gray-500">
          아직 등록한 식물이 없습니다.{" "}
          <Link href="/species" className="text-green-700 underline">
            도감에서 골라보세요
          </Link>
        </p>
      ) : (
        <ul className="mt-6 space-y-3">
          {plants.map((p) => (
            <li key={p.id} className="flex items-start justify-between rounded border p-4">
              <div>
                <p className="text-lg font-semibold">
                  <Link href={`/plants/${p.id}`} className="hover:underline">
                    {p.nickname}
                  </Link>
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  {p.speciesName}
                </p>  
                <p className="mt-1 text-sm text-gray-600">
                  {p.location ?? ""}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  {p.nextWateringDate && ` 다음 물주기 ${p.nextWateringDate}`}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                {p.photoUrl ? (
                  <img
                    src={`http://127.0.0.1:8080${p.photoUrl}`}
                    alt={p.nickname}
                    className="h-24 w-32 rounded object-cover"
                  />
                ) : (
                  <div className="flex h-24 w-32 items-center justify-center rounded bg-green-50 text-3xl">
                    🌱
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded px-2 py-1 text-sm font-bold ${
                      p.dDay === null
                        ? "bg-gray-100 text-gray-600"
                        : p.dDay <= 0
                          ? "bg-red-100 text-red-700"
                          : p.dDay <= 3
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-700"
                    }`}
                  >
                    {p.dDay === null ? "D-day 없음" : p.dDay === 0 ? "D-day" : p.dDay < 0 ? `D+${-p.dDay}` : `D-${p.dDay}`}
                  </span>
                  <WaterButton plantId={p.id} />
                </div>
              </div>
            </li>

          ))}
        </ul>
      )}
    </main>
  );
}
