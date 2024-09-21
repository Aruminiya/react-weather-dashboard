import { useState, useContext, useEffect, useCallback } from "react";
import { Box, Card, CardContent, Grid2, Stack } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { OpenMeteoApiContext } from "../context/OpenMeteoApiContextProvider";

import TodayWeather from "../components/TodayWeather";
import LoadingModal from "../components/LoadingModal";
import WeekWeather from "../components/WeekWeather";
import CaptialAutocomplete from "../components/CaptialAutocomplete";
import TemperatureChart from "../components/TemperatureChart";

import weatherCodeToDescription from "../utils/weatherCodeToDescription";
import { formatDate } from "../utils/format";

type Location = {
  label: string;
  latlng: number[];
  name: string;
  timezones: string[];
  zho: string;
}

type Weather = {
  temperature_2m: number;
  weather_code: number;
  wind_speed_10m: number;
  relative_humidity_2m: number;
}

type WeekWeather = {
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  time: string[];
  weather_code: number[];
}

type WeatherData = {
  name: string;
  time: string;
  temperature: number;
}

function HomePage() {
  const theme = useTheme();

  const OpenMeteoApiCtx = useContext(OpenMeteoApiContext);
  const { getCurrentWeather } = OpenMeteoApiCtx;

  const [isLoading, setIsLoading] = useState(false);

  const [location, setLocation] = useState<Location>({
    label: '',
    latlng: [],
    name: '',
    timezones: [],
    zho: ''
  });

  const [weather, setWeather] = useState<Weather>({
    temperature_2m: 0,
    weather_code: 0,
    wind_speed_10m: 0,
    relative_humidity_2m: 0
  });

  const [hourlyWeather, setHourlyWeather] = useState<WeatherData[]>([]);
  console.log(hourlyWeather);
  const [weekWeather, setWeekWeather] = useState({
    temperature_2m_max: [] as number[],
    temperature_2m_min: [] as number[],
    time: [] as string[],
    weather_code: [] as number[]
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getSelectCaptial = (selectedCaptial: any)=>{
    const {label, latlng, name, timezones, zho} = selectedCaptial;
    handleGetCurrentWeather(latlng, label, name, timezones, zho);
  };

  const handleGetCurrentWeather = useCallback(async (latlng: number[], label:string, name:string, timezones:string[], zho:string) => {
    try {
      setIsLoading(true);
      const result = await getCurrentWeather(latlng[0], latlng[1]);

      setWeather(result.data.current);

      setWeekWeather(result.data.daily);
      
      const getWeatherHourly = result.data.hourly;
      console.log(getWeatherHourly);
      const weatherHourly: WeatherData[] = [];

      const HOUT_INIT = 3; // 每隔幾小時顯示溫度
      for (let i = 0 ; i <= 24 ; i += HOUT_INIT) {
        weatherHourly.push({
          name: `${formatDate(getWeatherHourly.time[i]).hour}:${formatDate(getWeatherHourly.time[i]).minute}`,
          time: `${formatDate(getWeatherHourly.time[i]).hour}:${formatDate(getWeatherHourly.time[i]).minute}`,
          temperature: getWeatherHourly.temperature_2m[i]
        })
      };

      setHourlyWeather(() => weatherHourly)

      setLocation((prev) => ({
        ...prev,
        label,
        latlng,
        zho,
        name,
        timezones,
      }));
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [getCurrentWeather]);

  useEffect(() => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const latlng = [latitude, longitude];
        handleGetCurrentWeather(latlng, '當前位置 Current location', 'Current location', [], '當前位置');
      },
      (error) => {
        console.error('Error getting geolocation:', error);
        setIsLoading(false);
      }
    );
  }, [handleGetCurrentWeather]);
  

  return (
    <>
      <Box component="span" sx={{ display: 'inline-block', my: '24px' }} >
        <h1>天氣預報 Weather Dashboard</h1>
      </Box>
      {isLoading ?
        <LoadingModal isLoading={isLoading} />
      :  
      <Card sx={{ minWidth: 275, backgroundColor: theme.customColors.darkBlue }}>
        <CardContent>
          <Stack direction='row' sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <Stack spacing={1} sx={{ display: 'inline-block' }} >
              <h4>{location.zho}</h4>
              <h4>{location.name}</h4>
            </Stack>
            <CaptialAutocomplete selectedCaptial={getSelectCaptial}/>
          </Stack>
        </CardContent>
        <CardContent>
          <Grid2 container spacing={2}>
            <Grid2 size={5}>
              <TodayWeather 
                temperture={weather.temperature_2m}
                situation={weatherCodeToDescription(weather.weather_code).description} 
                windSpeed={weather.wind_speed_10m}
                humidity={weather.relative_humidity_2m}
                image={weatherCodeToDescription(weather.weather_code).image}
                sx={{ padding: '24px', bgcolor: theme.customColors.darkPurpleBlue, borderRadius: 1 }}
              />
            </Grid2>
            <Grid2 size={7}>
              <TemperatureChart title='今日溫度變化' hourlyWeather={hourlyWeather} />
            </Grid2>
            <Grid2 size={12}>
              <Stack spacing={1} direction="row" >
                {weekWeather.time.map((time, index) => (
                  <WeekWeather
                    key={index}
                    week={`週${formatDate(time).dayOfWeek}`}
                    image={weatherCodeToDescription(weekWeather.weather_code[index]).image}
                    temperatureMax={weekWeather.temperature_2m_max[index]}
                    temperatureMin={weekWeather.temperature_2m_min[index]}
                  />
                ))}
              </Stack>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>}
    </>
  )
}

export default HomePage