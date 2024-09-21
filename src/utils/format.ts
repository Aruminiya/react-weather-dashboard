type formatDateResult = {
  month: string;
  day: string;
  dayOfWeek: string;
  hour: string | undefined;
  minute: string | undefined
}

export function formatDate(dateString: string): formatDateResult  {
  const daysOfWeek = ["日", "一", "二", "三", "四", "五", "六"];

  const dateData = dateString.split('T')[0];
  const timeData = dateString.split('T')[1];

  const date = new Date(dateData);
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份從0開始，所以需要+1
  const day = date.getDate().toString().padStart(2, '0');
  const dayOfWeek = daysOfWeek[date.getDay()];

  let hour;
  let minute; 
  if (timeData) {
    hour = timeData.split(':')[0];
    minute =  timeData.split(':')[1];
  }

  const result: formatDateResult = {
    month,
    day,
    dayOfWeek,
    hour,
    minute
  };

  return result;
}
