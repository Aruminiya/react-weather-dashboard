import calm from '../assets/weather/Calm.png';
// import cloud from '../assets/weather/Cloud.png';
// import cold from '../assets/weather/Cold.png';
// import hot from '../assets/weather/Hot.png';
// import nightCloud from '../assets/weather/Night Cloud.png';
// import night from '../assets/weather/Night.png';
import rain from '../assets/weather/Rain.png';
import sleet from '../assets/weather/Sleet.png';
import snow from '../assets/weather/Snow.png';
import sun from '../assets/weather/Sun.png';
import sunnyAndCloudy from '../assets/weather/Sunny and cloudy.png';
import thunder from '../assets/weather/Thunder.png';
import thunderstorm from '../assets/weather/Thunderstorm.png';
// import tornado from '../assets/weather/Tornado.png';
// import wind from '../assets/weather/Wind.png';


type WeatherDescription = {
  image: string;
  description: string;
};

const weatherCodeToDescription = (code: number): WeatherDescription => {
  switch (code) {
    case 0:
      return {
        image: sun,
        description: '晴朗的天空'
      };
    case 1:
    case 2:
    case 3:
      return {
        image: sunnyAndCloudy,
        description: '晴時多雲'
      };
    case 45:
    case 48:
      return {
        image: calm,
        description: '霧天'
      };
    case 51:
    case 53:
    case 55:
      return {
        image: rain,
        description: '毛毛雨'
      };
    case 56:
    case 57:
      return {
        image: sleet,
        description: '凍毛毛雨'
      };
    case 61:
    case 63:
    case 65:
      return {
        image: rain,
        description: '雨天'
      };
    case 66:
    case 67:
      return {
        image: sleet,
        description: '凍雨'
      };
    case 71:
    case 73:
    case 75:
      return {
        image: snow,
        description: '降雪'
      };
    case 77:
      return {
        image: snow,
        description: '雪粒'
      };
    case 80:
    case 81:
    case 82:
      return {
        image: rain,
        description: '陣雨'
      };
    case 85:
    case 86:
      return {
        image: snow,
        description: '陣雪'
      };
    case 95:
      return {
        image: thunder,
        description: '雷暴'
      };
    case 96:
    case 99:
      return {
        image: thunderstorm,
        description: '雷陣雨'
      };
    default:
      return {
        image: '',
        description: '未知的代碼'
      };
  }
};

export default weatherCodeToDescription;