// plant-front/components/MyPlantForm.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Species } from "@/lib/api";

type Props = {
  speciesList: Species[];
  initialSpeciesId?: number;
};

export default function MyPlantForm({ speciesList, initialSpeciesId }: Props) {
  const router = useRouter();
  const [speciesId, setSpeciesId] = useState<number | "">(
    initialSpeciesId ?? ""
  );
  const initialName = speciesList.find((s) => s.id === initialSpeciesId)?.name ?? "";
  const [keyword, setKeyword] = useState(initialName);
  const [open, setOpen] = useState(false);
  const [noSpecies, setNoSpecies] = useState(false);
  const filtered = speciesList.filter((s) => s.name.includes(keyword));

  const [nickname, setNickname] = useState("");
  const [location, setLocation] = useState("");
  const [wateringIntervalDays, setWateringIntervalDays] = useState("");
  const [lastWateredDate, setLastWateredDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [memo, setMemo] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/my-plants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          speciesId: speciesId === "" ? null : speciesId,
          nickname,
          location: location || null,
          wateringIntervalDays: wateringIntervalDays
            ? Number(wateringIntervalDays)
            : null,
          lastWateredDate,
          memo: memo || null,
        }),
      });
      if (!res.ok) {
        setError("등록에 실패했습니다. 로그인 상태를 확인해주세요");
        return;
      }
      router.push("/plants");
      router.refresh();
    } catch {
      setError("등록에 실패했습니다");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-3">
      <div>
  <label className="mb-1 block text-sm font-medium">도감 식물</label>
  <input
    type="text"
    value={keyword}
    disabled={noSpecies}
    onFocus={() => {
      if (!noSpecies) setOpen(true);
    }}
    onChange={(e) => {
      setKeyword(e.target.value);
      setSpeciesId("");
      setOpen(true);
    }}
    onBlur={() => setTimeout(() => setOpen(false), 150)}
    placeholder="식물 이름을 검색하세요 (예: 몬스테라)"
    className={`w-full rounded border px-3 py-2 ${
      noSpecies ? "bg-gray-100 text-gray-400" : ""
    }`}
  />
  {open && !noSpecies && (
    <div className="mt-2 max-h-60 overflow-y-auto rounded border p-2">
      {filtered.map((s) => (
        <button
          key={s.id}
          type="button"
          onMouseDown={() => {
            setSpeciesId(s.id);
            setKeyword(s.name);
            setOpen(false);
          }}
          className="w-full rounded px-2 py-1.5 text-left hover:bg-green-50"
        >
          {s.name}
        </button>
      ))}
      {filtered.length === 0 && (
        <p className="px-2 py-1.5 text-sm text-gray-500">검색 결과가 없습니다.</p>
      )}
    </div>
  )}
  <button
    type="button"
    onClick={() => {
      if (noSpecies) {
        // 다시 켜기
        setNoSpecies(false);
        setKeyword("");
      } else {
        // 도감에 없는 식물로 바꾸기
        setNoSpecies(true);
        setSpeciesId("");
        setKeyword("");
        setOpen(false);
      }
    }}
    className={`mt-2 w-full rounded border px-3 py-2 text-left text-sm ${
      noSpecies ? "border-green-600 bg-green-100 font-semibold" : "hover:bg-green-50"
    }`}
  >
    {noSpecies ? "● 도감에 없는 식물 (선택됨 — 다시 누르면 취소)" : "○ 도감에 없는 식물"}
  </button>
</div>



      <label className="block">
        <span className="text-sm text-gray-600">별명 *</span>
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="예: 몬스 1호"
          required
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </label>

      <label className="block">
        <span className="text-sm text-gray-600">놓은 장소</span>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="예: 거실 창측"
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </label>

      <label className="block">
        <span className="text-sm text-gray-600">물주기 간격 (일)</span>
        <input
          type="number"
          min={1}
          value={wateringIntervalDays}
          onChange={(e) => setWateringIntervalDays(e.target.value)}
          placeholder="예: 7"
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </label>

      <label className="block">
        <span className="text-sm text-gray-600">마지막 물 준 날짜 *</span>
        <input
          type="date"
          value={lastWateredDate}
          onChange={(e) => setLastWateredDate(e.target.value)}
          required
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </label>

      <label className="block">
        <span className="text-sm text-gray-600">메모</span>
        <input
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        disabled={loading}
        className="w-full rounded bg-green-600 px-4 py-2 font-semibold text-white disabled:opacity-50"
      >
        {loading ? "등록 중..." : "등록하기"}
      </button>
    </form>
  );
}
