import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
const theme = createTheme({
  palette: {
    primary: {
      main: "#4F46E5",
    },
  },
  components: {
    MuiStepLabel: {
      styleOverrides: {
        label: {
          color: "white",
          "&.Mui-active": {
            color: "white",
          },
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: "transparent",
          border: "1px solid white",
          width: "35px",
          height: "35px",

          borderRadius: "50%",
          "&.Mui-active": {
            border: "unset",
            color: "white",
            "& .MuiStepIcon-text": {
              fill: "#4F46E5",
            },
          },
          "&.Mui-completed": {
            border: "unset",
            color: "white",
          },
        },
        text: {
          fill: "white",
        },
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
