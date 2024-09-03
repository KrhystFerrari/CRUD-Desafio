import { useState, useMemo } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Switch,
  FormControlLabel,
  Box,
} from "@mui/material";
import Home from "./pages/Home";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ModeNightIcon from "@mui/icons-material/ModeNight";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          position: "relative",
          backgroundImage: darkMode
            ? "url('https://img.freepik.com/free-vector/dark-black-background-design-with-stripes_1017-38064.jpg?w=1380&t=st=1725379059~exp=1725379659~hmac=c85c0954d3bae1eb38441a6421e78bc3cdd535ce3ee6674b6c4dce0897a10adf')"
            : "url(https://img.freepik.com/fotos-gratis/fundo-abstrato-simples-com-borda-de-prata_53876-104040.jpg?w=1380&t=st=1725380121~exp=1725380721~hmac=a835a7ed9391b452b613104e48ef00743127492d2eca75d75bdcff5959573c9e)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
          }}
        >
          <FormControlLabel
            control={<Switch checked={darkMode} onChange={handleThemeChange} />}
            label={darkMode ? <ModeNightIcon /> : <WbSunnyIcon />}
          />
        </Box>
        <Home />
      </Box>
    </ThemeProvider>
  );
};

export default App;
