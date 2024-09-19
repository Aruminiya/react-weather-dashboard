import { createTheme } from '@mui/material/styles'; 

declare module '@mui/material/styles' {
  interface Theme {
    customColors: {
      darkPurpleBlue: string;
      darkBlue: string;
      darkGreenBlue: string;
      greenBlue: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    customColors?: {
      darkPurpleBlue?: string;
      darkBlue?: string;
      darkGreenBlue?: string;
      greenBlue?: string;
    };
  }
}

const customTheme = createTheme({
  customColors: {
    darkPurpleBlue: '#242230',
    darkBlue: '#2E3540',
    darkGreenBlue: '#445665',
    greenBlue: '#91AEA2',
  },
});

export default customTheme;