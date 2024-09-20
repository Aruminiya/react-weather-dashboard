import { Stack } from "@mui/material";
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';

const Image = styled('div')(() => ({
  '& img': {
    objectFit: "contain",
    width: '100%',
    height: '100%',
  }
}));

const TemperatureLevel = styled('div')(() => ({
  '.hight': {
    margin: '5px 0'
  },
  '.low': {
    color: 'LightGray',
    margin: '5px 0'
  }
}));

type WeekWeatherProps = {
  week: string;
  image: string;
  temperatureMax: number;
  temperatureMin: number;
};

function WeekWeather({ week, image, temperatureMax, temperatureMin }: WeekWeatherProps) {
  const theme = useTheme()
  return (
    <Stack sx={{
        backgroundColor: theme.customColors.darkGreenBlue,
        borderRadius: '6px',
        flex: 1,
        padding: '24px',
        justifyContent: "space-between",
        alignItems: "center",
      }}
      spacing={3}
    >
      <h4>{week}</h4>
      <Image>
        <img src={image} alt="SunnyAndCloudy Image" />
      </Image>
      <TemperatureLevel>
        <h4 className="hight">{temperatureMax}°C</h4>
        <h4 className="low">{temperatureMin}°C</h4>
      </TemperatureLevel>
    </Stack>
  );
};

export default WeekWeather