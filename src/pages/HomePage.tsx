import { Box, Card, CardContent, Grid2, Stack } from "@mui/material";
import { useTheme } from '@mui/material/styles';

import TodayWeather from "../components/TodayWeather";

 
function HomePage() {
  const theme = useTheme();

  return (
    <>
      <Box component="span" sx={{ display: 'inline-block', my: '24px' }} >
        <h1>天氣預報 Weather Dashboard</h1>
      </Box>
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
              <TodayWeather sx={{ minWidth: '400px', padding: '24px', bgcolor: theme.customColors.darkPurpleBlue, borderRadius: 1 }}/>
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
      </Card>
    </>
  )
}

export default HomePage