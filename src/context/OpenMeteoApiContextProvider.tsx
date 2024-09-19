import { createContext, ReactNode } from 'react';
import axios, { AxiosResponse } from 'axios';

type OpenMeteoApiContextValue = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getCurrentWeather: (latitude:number, longitude:number) => Promise<AxiosResponse<any>>;
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
  async function getCurrentWeather(latitude:number, longitude:number): Promise<AxiosResponse<any>> {
    try {
      const response = await axios.get(`${import.meta.env.VITE_OPEN_METEO_API_HOST}/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,rain,weather_code,wind_speed_10m`);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || 'An error occurred');
      } else {
        throw error;
      }
    }
  };

  return (
    <OpenMeteoApiContext.Provider value={{ getCurrentWeather }}>
      {children}
    </OpenMeteoApiContext.Provider>
  );
};