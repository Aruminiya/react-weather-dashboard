import { Box, Stack } from "@mui/material";
import { styled } from '@mui/system';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

import SunnyAndCloudy from '../assets/weather/Sunny and cloudy.png'


const TempertureText = styled('p')(() => ({
  fontSize: '96px',
  fontWeight: 900
}));

const Image = styled('p')(() => ({
  width: '200px',
  height: '200px',
  '& img': {
    width: '100%',
    height: '100%',
  }
}));

function TodayWeather({...props}) {

  return (
    <Box {...props}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TempertureText>22°C</TempertureText>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
          <h4>High 28°C </h4>
          <h4>Low 20°C </h4>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack spacing={1} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
          <h4><Brightness4Icon />晴時多雲</h4>
          <h4><ThermostatIcon />體感溫度 22°C</h4>
          <h4><AirIcon /> 風速</h4>
          <h4><WaterDropIcon />濕度</h4>
        </Stack>
        <Image>
          <img src={SunnyAndCloudy} alt="SunnyAndCloudy Image" />
        </Image>
      </Box>        
    </Box>
  )
};

export default TodayWeather