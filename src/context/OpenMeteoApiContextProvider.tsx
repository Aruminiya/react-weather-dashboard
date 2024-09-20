import { createContext, ReactNode } from 'react';
import axios, { AxiosResponse } from 'axios';

type OpenMeteoApiContextValue = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getCurrentWeather: (latitude: number, longitude: number, timezone?: string) => Promise<AxiosResponse<any>>;
};

type OpenMeteoApiContextProviderProps = {
  children: ReactNode;
};

export const OpenMeteoApiContext = createContext<OpenMeteoApiContextValue>({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getCurrentWeather: () => Promise.resolve({} as AxiosResponse<any>),
});

export default function OpenMeteoApiContextProvider({ children }: OpenMeteoApiContextProviderProps) {
  
  // GET 取得當前地區天氣
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function getCurrentWeather(latitude: number, longitude: number, timezone: string = 'auto'): Promise<AxiosResponse<any>> {
    try {
      const response = await axios.get(`${import.meta.env.VITE_OPEN_METEO_API_HOST}/forecast`, {
        params: {
          latitude,
          longitude,
          current: 'temperature_2m,relative_humidity_2m,rain,weather_code,wind_speed_10m',
          daily: 'weather_code,temperature_2m_max,temperature_2m_min',
          timezone
        }
        // 使用 `axios.get` 的 `params` 屬性： `params` 屬性來傳遞查詢參數，這樣可以讓 URL 更加清晰和易於維護。
      });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || 'An error occurred');
      } else {
        throw error;
      }
    }
  }

  return (
    <OpenMeteoApiContext.Provider value={{ getCurrentWeather }}>
      {children}
    </OpenMeteoApiContext.Provider>
  );
}