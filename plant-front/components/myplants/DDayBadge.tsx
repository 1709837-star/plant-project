/* D-Day 뱃지 */

export default function DDayBadge({ dDay }: { dDay: number | null }) {
  // dDay는 MyplantListItem에서 넘겨줌
  const d = dDay ?? 0;
  const color =
    d <= 0                                    // 오늘이거나 지났으면 빨강
      ? "bg-red-100 text-red-700"
      : d <= 3                                // 3일 이내면 노랑  
        ? "bg-yellow-100 text-yellow-700"
        : "bg-green-100 text-green-700";      // 나머지는 초록

  return (
      <span className={`inline-flex h-8 items-center rounded-full px-4 text-sm font-semibold ${color}`}>
      D{d > 0 ? `-${d}` : `+${-d}`}
    </span>
  );
}
