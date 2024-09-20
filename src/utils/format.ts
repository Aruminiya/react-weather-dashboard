import COUNTRY_DATA from '../COUNTRY_DATA.json';

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

type Country = {
  name: string;
  latlng: [number, number];
  timezones: string[];
}

// 確保 COUNTRY_DATA 的型別定義與 Country 介面一致
const countryData: Country[] = COUNTRY_DATA as Country[];

export function findNearestCountry(latitude: number, longitude: number): Country | null {

  function toRadians(degrees: number): number {
    return degrees * Math.PI / 180;
  }
  
  function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // 地球半徑，單位：公里
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
  
  let nearestCountry: Country | null = null;
  let minDistance = Infinity;

  countryData.forEach((country: Country) => {
    const [countryLat, countryLon] = country.latlng;
    const distance = haversineDistance(latitude, longitude, countryLat, countryLon);
    if (distance < minDistance) {
      minDistance = distance;
      nearestCountry = country;
    }
  });

  return nearestCountry;
}
