import { cookies } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getMyPlant, getWaterings } from "@/lib/api";
import WaterButton from "@/components/myplants/WaterButton";
import DeletePlantButton from "@/components/myplants/DeletePlantButton";
import PhotoUpload from "@/components/myplants/PhotoUpload";

type Params = { params: Promise<{ id: string }> };

export default async function MyPlantDetailPage({ params }: Params) {
  const { id } = await params;
  const cookieStore = await cookies();
  const cookie = cookieStore.toString();
  const plant = await getMyPlant(Number(id), cookie);

  if (!plant) {
    // 로그인 안 했으면 로그인으로, 없는 식물이면 404로
    // getMyPlant가 null을 주는 경우가 둘 다라서, 쿠키가 없으면 로그인으로 보내
    if (!cookie) redirect("/login");
    notFound();
  }

  const waterings = await getWaterings(plant.id, cookie);

  return (
    <main className="mx-auto max-w-2xl p-6">
      <Link href="/plants" className="text-sm text-gray-500">
        ← 내 식물 목록으로
      </Link>

      <h1 className="mt-4 text-3xl font-bold">{plant.nickname}</h1>
      {plant.speciesName && (
        <p className="mt-1 text-gray-500">{plant.speciesName}</p>
      )}

      {plant.photoUrl ? (
        <img src={`http://127.0.0.1:8080${plant.photoUrl}`} alt={plant.nickname} className="h-48 w-full rounded object-cover" />
      ) : (
        <p className="text-sm text-gray-500">아직 사진이 없습니다</p>
      )}
      <PhotoUpload plantId={plant.id} />

      <dl className="mt-6 space-y-3 rounded border p-4">
        <div className="flex justify-between">
          <dt className="text-gray-500">놓은 장소</dt>
          <dd className="font-semibold">{plant.location ?? "-"}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-500">물주기 간격</dt>
          <dd className="font-semibold">
            {plant.wateringIntervalDays ? `${plant.wateringIntervalDays}일` : "-"}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-500">마지막 물 준 날</dt>
          <dd className="font-semibold">{plant.lastWateredDate}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-500">다음 물주기</dt>
          <dd className="font-semibold">
            {plant.nextWateringDate ?? "-"}{" "}
            {plant.dDay !== null && plant.dDay !== undefined && (
              <span className="text-green-700">
                {plant.dDay === 0 ? "(오늘)" : plant.dDay < 0 ? `(D+${-plant.dDay})` : `(D-${plant.dDay})`}
              </span>
            )}
          </dd>
        </div>
        {plant.memo && (
          <div className="flex justify-between">
            <dt className="text-gray-500">메모</dt>
            <dd className="font-semibold">{plant.memo}</dd>
          </div>
        )}
      </dl>

      <div className="mt-6 flex gap-3">
        <WaterButton plantId={plant.id} />
        <Link
          href={`/plants/${plant.id}/edit`}
          className="rounded bg-gray-200 px-4 py-2 text-sm font-semibold"
        >
          수정하기
        </Link>
        <DeletePlantButton plantId={plant.id} />
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-bold">물주기 기록</h2>
        {waterings.length === 0 ? (
          <p className="mt-2 text-sm text-gray-500">아직 물주기 기록이 없습니다</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {waterings.map((w) => (
              <li key={w.id} className="flex justify-between rounded border px-3 py-2 text-sm">
                <span>{w.wateredDate}</span>
                <span className="text-gray-500">{w.memo ?? ""}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
