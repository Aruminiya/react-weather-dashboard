export function formatDate(dateString: string): string {
  const daysOfWeek = ["日", "一", "二", "三", "四", "五", "六"];
  
  const date = new Date(dateString);
  // const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份從0開始，所以需要+1
  // const day = date.getDate().toString().padStart(2, '0');
  const dayOfWeek = daysOfWeek[date.getDay()];

  // const result = `${month}/${day} (${dayOfWeek})`;
  const result = `週${dayOfWeek}`;

  return result;
}
