import { useState, useContext, useEffect } from "react";
import { Box, Card, CardContent, Grid2, Stack } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { OpenMeteoApiContext } from "../context/OpenMeteoApiContextProvider";

import TodayWeather from "../components/TodayWeather";
import weatherCodeToDescription from "../utils/weatherCodeToDescription";

 
function HomePage() {
  const theme = useTheme();

  const OpenMeteoApiCtx = useContext(OpenMeteoApiContext);
  const { getCurrentWeather } = OpenMeteoApiCtx;

  const [weather, setWeather] = useState({
    isLoding: true,
    temperature_2m: 0,
    weather_code: 0,
    wind_speed_10m: 0,
    relative_humidity_2m: 0
  });
  
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      
      getCurrentWeather(latitude, longitude).then((res)=>{
        console.log(res);
        setWeather(() => ({
          isLoding: false,
          ...res.data.current
        }))
      });

    }); // 取得用戶位置
   
  },[getCurrentWeather]);
  

  return (
    <>
      <p>{weather ? JSON.stringify(weather) : "null"}</p>
      <Box component="span" sx={{ display: 'inline-block', my: '24px' }} >
        <h1>天氣預報 Weather Dashboard</h1>
      </Box>
      {weather.isLoding ?
        <h1>Loading...</h1>
      :  
      <Card sx={{ minWidth: 275, backgroundColor: theme.customColors.darkGreenBlue }}>
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
                sx={{ minWidth: '450px', padding: '24px', bgcolor: theme.customColors.darkPurpleBlue, borderRadius: 1 }}
              />
            </Grid2>
            <Grid2 size={7}>
              <Box >
                今日天氣資料
              </Box>
            </Grid2>
            <Grid2 size={12}>
              <Stack spacing={1} direction="row" >
                <Box sx={{backgroundColor: 'red', height: '250px', flex: 1}}>1</Box>
                <Box sx={{backgroundColor: 'red', height: '250px', flex: 1}}>2</Box>
                <Box sx={{backgroundColor: 'red', height: '250px', flex: 1}}>3</Box>
                <Box sx={{backgroundColor: 'red', height: '250px', flex: 1}}>4</Box>
                <Box sx={{backgroundColor: 'red', height: '250px', flex: 1}}>5</Box>
                <Box sx={{backgroundColor: 'red', height: '250px', flex: 1}}>6</Box>
                <Box sx={{backgroundColor: 'red', height: '250px', flex: 1}}>7</Box>
              </Stack>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>}
    </>
  )
}

export default HomePage