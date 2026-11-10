export default function SpeciesSearchBar({
  keyword,
  light,
}: {
  keyword?: string;
  light?: string;
}) {
  return (
    <form className="mt-4 flex flex-wrap gap-2">
      <input
        name="keyword"
        defaultValue={keyword ?? ""}
        placeholder="식물 이름으로 검색"
        className="min-w-0 flex-1 rounded border px-3 py-2"
      />  
      <select name="light" defaultValue={light ?? ""} className="rounded border px-2 py-2">
        <option value="">광도 전체</option>
        <option value="LOW">낮은 광도</option>
        <option value="MEDIUM">중간 광도</option>
        <option value="HIGH">높은 광도</option>
      </select>
      <button className="rounded bg-green-600 px-4 py-2 text-white">검색</button>
    </form>
  );
}
