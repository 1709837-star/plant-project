import { cookies } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getMyPlant, getWaterings } from "@/lib/api";
import WaterButton from "@/components/myplants/WaterButton";
import DeletePlantButton from "@/components/myplants/DeletePlantButton";
import PhotoUpload from "@/components/myplants/PhotoUpload";
import MyPlantDetailInfo from "@/components/myplants/MyPlantDetailInfo";
import WateringLogList from "@/components/myplants/WateringLogList";

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
        ← 나의 정원으로
      </Link>

      <h1 className="mt-4 text-3xl font-bold">{plant.nickname}</h1>
      {plant.speciesName && (
        <p className="mt-1 text-gray-500">{plant.speciesName}</p>
      )}

      {plant.photoUrl ? (
        <img src={`http://127.0.0.1:8080${plant.photoUrl}`} alt={plant.nickname} className="h-48 w-full rounded object-cover" />
      ) : (
        <div className="flex h-48 w-full items-center justify-center rounded bg-green-50 text-7xl">🌱</div>
      )}
      <PhotoUpload plantId={plant.id} />

      <MyPlantDetailInfo plant={plant} />



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

      <WateringLogList logs={waterings} />

    </main>
  );
}
