import { Box, Stack } from "@mui/material";
import { useTheme } from '@mui/material/styles';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

type WeatherData = {
  name: string;
  time: string;
  temperature: number;
}

type TemperatureChartProps = {
  title: string;
  hourlyWeather: WeatherData[];
}

function TemperatureChart({ title, hourlyWeather }:TemperatureChartProps) {
  const theme = useTheme();

  return (
    <Stack spacing={1} sx={{ bgcolor: theme.customColors.darkPurpleBlue, borderRadius: 1, height: '100%' }} >
      <Box sx={{display:'flex', justifyContent: 'center', padding: '12px', paddingTop: '24px'}}>
        <h4>{title}</h4>
      </Box>
      <ResponsiveContainer width="93%" height="100%">
        <LineChart data={hourlyWeather}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" padding={{ left: 30, right: 30 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Stack>
  );
};

export default TemperatureChart