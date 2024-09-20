import { Box, Stack } from "@mui/material";
import { styled } from '@mui/system';

// Mui Icon
import Brightness4Icon from '@mui/icons-material/Brightness4';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';


const TempertureText = styled('p')(() => ({
  fontSize: '76px',
  fontWeight: 900
}));

const Image = styled('p')(() => ({
  width: '200px',
  height: '200px',
  '& img': {
    objectFit: "contain",
    width: '100%',
    height: '100%',
  }
}));

type TodayWeatherProps = {
  temperture: number;
  situation: string;
  windSpeed: number;
  humidity: number;
  image: string
}& React.ComponentProps<typeof Box>

function TodayWeather({temperture, situation, windSpeed, humidity, image, ...props}: TodayWeatherProps) {
  return (
    <Box {...props}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TempertureText>{temperture}°C</TempertureText>
        {/* <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
          <h4>High 28°C </h4>
          <h4>Low 20°C </h4>
        </Box> */}
      </Box>
      <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack spacing={1} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
          <Stack direction="row" spacing={1} sx={{ whiteSpace: 'nowrap' }}>
            <Brightness4Icon sx={{color: 'white'}} />
            <h5>{situation}</h5>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ whiteSpace: 'nowrap' }}>
            <AirIcon sx={{color: 'white'}} /> 
            <h5>風速 {windSpeed}km/h</h5>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ whiteSpace: 'nowrap' }}>
            <WaterDropIcon sx={{color: 'white'}} />
            <h5>濕度 {humidity}%</h5>
          </Stack>
        </Stack>
        <Image>
          <img src={image} alt="SunnyAndCloudy Image" />
        </Image>
      </Stack>        
    </Box>
  )
};

export default TodayWeather