"use client";

import { useRef, useState } from "react";
import Link from "next/link";

// plant-api IdentifyRepository (dto)랑 같은 형태
type TopItem = { korean: string; english: string; speciesId: number | null; confidence: number };
type Result = {
  speciesName: string | null;
  speciesId: number | null;
  imageUrl: string | null;
  confidence: number;
  isUnknown: boolean;
  top3: TopItem[];
};

export default function IdentifyModal() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 사진 고르기
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
  };

  // 분석하기
  const onSubmit = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);  // FormData에 파일을 담아
    const res = await fetch("/api/plants/identify", { method: "POST", body: formData });
    setResult(await res.json());    // 돌아온 JSON을 result에 담아
    setLoading(false);
  };

  const close = () => {
    setOpen(false);
    setFile(null);
    setPreview("");
    setResult(null);
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="text-xl" aria-label="식물 찾기">
        🔍
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={close}>
          <div
            className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-[2rem] bg-[#f6faf3] p-6 shadow-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">사진으로 식물 찾기</h2>
              <button onClick={close} className="text-xl text-gray-500">✕</button>
            </div>

            {!file && !result && (
                <p className="mt-2 text-center text-sm text-gray-500">
              사진을 올리면 AI가 분석해서 1위부터 3위까지 확률로 알려줘요.
            </p>
            )}

            <div className="mt-4 flex flex-col items-center gap-3">
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={onChange}
                className="hidden"
              />
              <button
                onClick={() => inputRef.current?.click()}
                className="rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-semibold shadow-sm"
              >
                📷 사진 선택하기
              </button>

              {preview && !result && (
                <img src={preview} alt="미리보기" className="h-48 w-48 rounded-3xl object-cover" />
              )}

              {!result && file && (
                <button
                  onClick={onSubmit}
                  disabled={!file || loading}
                  className="rounded-full bg-green-500 px-6 py-2 text-sm text-white hover:bg-green-600 disabled:opacity-50"
                >
                  {loading ? "분석 중..." : "🔎 분석해줘!"}
                </button>
              )}

              {result && (
                <div className="w-full rounded-3xl bg-white p-4 text-center shadow-sm">
                  {result.isUnknown ? (
                    <div className="text-center">
                        <p className="text-sm font-bold">도감에 없는 식물이거나, 사진이 잘 안 보여요.</p>
                        <div className="mt-2 text-xs font-normal text-gray-500">
                        <p></p>
                        <p className="text-center">💡</p> 
                        <p>잎을 가까이서 밝은 곳에서 찍어주세요.</p>
                        <p>한 식물만 화면에 나오게 찍어주세요.</p>
                        <p>흔들리지 않게 또렷하게 찍어주세요.</p>
                        </div>
                    </div>
                    ) : (
                    <>
                      <p className="text-2xl font-bold">{result.speciesName}</p>
                      <p className="mt-1 text-sm text-gray-500">
                        {Math.round(result.confidence * 100)}% 확신해요.
                      </p>
                      {result.confidence < 0.98 && (
                        <p className="mt-1 text-sm text-yellow-600">확실하지 않아요. 직접 확인해주세요.</p>
                      )}
                      {result.imageUrl ? (
                        <img
                          src={result.imageUrl}
                          alt={result.speciesName ?? ""}
                          className="mx-auto mt-3 h-48 w-48 rounded-3xl object-cover" />
                        ) : (
                         <div className="mx-auto mt-3 flex h-48 w-48 items-center justify-center rounded-3xl bg-[#f6faf3] text-6xl">🌱</div>
                      )}
                      {result.speciesId && (
                        <Link
                          href={`/species/${result.speciesId}`}
                          onClick={close}
                          className="mx-auto mt-3 block w-fit rounded-full bg-green-500 px-4 py-2 text-sm text-white hover:bg-green-600"
                        >
                          이 식물 보러가기
                        </Link>
                      )}

                      <div className="mt-4 border-t border-gray-100 pt-3">
                        {(result.top3 ?? []).slice(1)
                            .filter((t) => t.confidence > 0.01)
                            .map((t) => (
                            <div key={t.english} className="flex items-center justify-between py-1 text-sm">
                                <span>🪴 {t.korean}</span>
                                <span className="flex items-center gap-3">
                                    <span className="text-gray-400"> {Math.round(t.confidence * 100)}%</span>
                                    {t.speciesId && (
                                    <Link
                                        href={`/species/${t.speciesId}`}
                                        onClick={close}
                                        className="rounded-full border border-gray-200 bg-white px-3 py-1"
                                    >
                                        보러가기
                                    </Link>
                                    )}
                                </span>
                                </div>
                            ))}
                        </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
