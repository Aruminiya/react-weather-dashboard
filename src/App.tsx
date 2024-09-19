import Router from "./router/Router.tsx";
import { Container } from '@mui/material';
import { styled } from '@mui/system';

const MainScreen = styled('div')(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  "& main": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    flex: 1,
  }
}));

function App() {
  return (
    <>
      <MainScreen>
        <main>
          <Container maxWidth="lg">
            <Router />
          </Container>
        </main>
      </MainScreen>
    </>
  )
}

export default App
