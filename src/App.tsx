import Router from "./router/Router.tsx";
import { Container } from '@mui/material';
import { styled } from '@mui/system';

import OpenMeteoApiContextProvider from "./context/OpenMeteoApiContextProvider.tsx";

const MainScreen = styled('div')(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  "& main": {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",

    flex: 1,
  }
}));

function App() {
  return (
    <OpenMeteoApiContextProvider>
      <MainScreen>
        <main>
          <Container maxWidth="lg">
            <Router />
          </Container>
        </main>
      </MainScreen>
    </OpenMeteoApiContextProvider>
  )
}

export default App
