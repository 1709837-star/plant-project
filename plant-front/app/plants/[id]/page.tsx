/* 내 식물 상세 */
// 서버 컴포넌트

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
  const { id } = await params;  // params : /plant/5에 들어가면 id="5"
  const cookieStore = await cookies();
  const cookie = cookieStore.toString(); // 이 식물이 내 식물인지 확인해야 해서
  const plant = await getMyPlant(Number(id), cookie); // 문자를 number로 바꿈

  if (!plant) {
    // 로그인 안 했으면 로그인으로, 없는 식물이면 404로
    // getMyPlant가 null을 주는 경우가 둘 다라서, 쿠키가 없으면 로그인으로 보내
    if (!cookie) redirect("/login");
    notFound();
  }

  const waterings = await getWaterings(plant.id, cookie);

  return (
    <main className="mx-auto max-w-2xl p-6">
      {/* 나의 정원으로 — 하얀 버튼으로 */}
      <Link href="/plants" className="inline-block rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-semibold text-gray-700 shadow-sm">
        ← 나의 정원으로
      </Link>

      {/* 이름 + 종류 — 가운데정렬 */}
      <div className="mt-4 text-center">
        <h1 className="text-3xl font-bold">{plant.nickname}</h1>
        {plant.speciesName && (
          <p className="mt-1 text-gray-500">{plant.speciesName}</p>
        )}
      </div>

      {plant.photoUrl ? (
        <img src={`http://127.0.0.1:8080${plant.photoUrl}`} alt={plant.nickname} className="mt-4 h-48 w-full rounded-2xl object-cover" />
      ) : (
        <div className="mt-4 flex h-48 w-full items-center justify-center rounded-2xl bg-green-50 text-7xl">🌱</div>
      )}

      {/* 사진 올리기 — 오른쪽으로 */}
      <div className="mt-3 flex justify-end">
        <PhotoUpload plantId={plant.id} />
      </div>

      <MyPlantDetailInfo plant={plant} />

      {/* 물주기 / 수정하기 / 삭제하기 — 가운데정렬, 크기 통일 */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <WaterButton plantId={plant.id} />
        <Link
          href={`/plants/${plant.id}/edit`}
          className="inline-flex h-8 items-center rounded-full bg-gray-200 px-4 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300"
        >
          수정하기
        </Link>
        <DeletePlantButton plantId={plant.id} />
      </div>

      <WateringLogList logs={waterings} />
    </main>

  );
}
