const weekdays = ["日", "月", "火", "水", "木", "金", "土"];

export function formatDate(dateStr: string): string {
  const [datePart, timePart] = dateStr.split(" ");
  const d = new Date(datePart + "T00:00:00");
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const weekday = weekdays[d.getDay()];
  const base = `${month}/${day}(${weekday})`;
  return timePart ? `${base} ${timePart}` : base;
}
