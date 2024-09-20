import { useState, useContext, useEffect } from "react";
import { Box, Card, CardContent, Grid2, Stack } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { OpenMeteoApiContext } from "../context/OpenMeteoApiContextProvider";

import TodayWeather from "../components/TodayWeather";
import LoadingModal from "../components/LoadingModal";
import WeekWeather from "../components/WeekWeather";

import weatherCodeToDescription from "../utils/weatherCodeToDescription";
import { formatDate } from "../utils/format";

 
function HomePage() {
  const theme = useTheme();

  const OpenMeteoApiCtx = useContext(OpenMeteoApiContext);
  const { getCurrentWeather } = OpenMeteoApiCtx;

  const[isLoading, setIsLoading] = useState(false);

  const [weather, setWeather] = useState({
    temperature_2m: 0,
    weather_code: 0,
    wind_speed_10m: 0,
    relative_humidity_2m: 0
  });
  
  const [weekWeather, setWeekWeather] = useState({
    temperature_2m_max: [] as number[],
    temperature_2m_min: [] as number[],
    time: [] as string[],
    weather_code: [] as number[]
  });
  
  useEffect(()=>{
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      
      getCurrentWeather(latitude, longitude).then((res)=>{
        console.log(res);
        setIsLoading(false);
        setWeather(() => ({
          ...res.data.current
        }));
        setWeekWeather(() => ({
          ...res.data.daily
        }))
      });

    }); // 取得用戶位置
   
  },[getCurrentWeather]);
  

  return (
    <>
      <h1>weather</h1><p>{weather ? JSON.stringify(weather) : "null"}</p>
      <h1>weekWeather</h1><p>{weekWeather ? JSON.stringify(weekWeather) : "null"}</p>
      <Box component="span" sx={{ display: 'inline-block', my: '24px' }} >
        <h1>天氣預報 Weather Dashboard</h1>
      </Box>
      {isLoading ?
        <LoadingModal isLoading={isLoading} />
      :  
      <Card sx={{ minWidth: 275, backgroundColor: theme.customColors.darkBlue }}>
        <CardContent>
          <Box component="span" sx={{ display: 'inline-block' }} >
            <h4>台北市, 士林區</h4>
            <h4>Taipei City, Shilin District</h4>
          </Box>
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
              <Box >
                今日天氣資料
              </Box>
            </Grid2>
            <Grid2 size={12}>
              <Stack spacing={1} direction="row" >
                {weekWeather.time.map((time, index) => (
                  <WeekWeather
                    key={index}
                    week={formatDate(time)}
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