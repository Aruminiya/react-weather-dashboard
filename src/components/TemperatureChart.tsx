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

  // 計算資料的最小值和最大值
  const minTemperature = Number(Math.min(...hourlyWeather.map(data => data.temperature)).toFixed(1));
  const maxTemperature = Number(Math.max(...hourlyWeather.map(data => data.temperature)).toFixed(1));

  // 計算均勻分配的刻度值，包含最小值和最大值
  const tickCount = 5; // 設置刻度數量
  const tickInterval = (maxTemperature - minTemperature ) / (tickCount - 1);
  const ticks = Array.from({ length: tickCount }, (_, i) => minTemperature + i * tickInterval);
  console.log(ticks)

  return (
    <Stack spacing={1} sx={{ bgcolor: theme.customColors.darkPurpleBlue, borderRadius: 1, height: '100%' }} >
      <Box sx={{display:'flex', justifyContent: 'center', padding: '12px', paddingTop: '24px'}}>
        <h4>{title}</h4>
      </Box>
      <ResponsiveContainer width="93%" height="100%">
        <LineChart data={hourlyWeather}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" padding={{ left: 30, right: 30 }} />
          <YAxis domain={[minTemperature, maxTemperature]} ticks={ticks} />
          <Tooltip 
            contentStyle={{ backgroundColor: theme.customColors.darkGreenBlue }}
            formatter={(value, name) => [value, name === 'temperature' ? '氣溫' : name]}
          />
          <Legend formatter={(value) => value === 'temperature' ? '氣温' : value}/>
          <Line
            type="monotone"
            dataKey="temperature"
            stroke={theme.customColors.greenBlue}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Stack>
  );
};

export default TemperatureChart