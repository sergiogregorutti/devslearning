"use client";
import { createTheme } from "@mui/material/styles";
import { blueGrey, lightBlue } from "@mui/material/colors";
export const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    h1: {
      fontWeight: "bold",
      fontSize: "34px",
      color: "#0b376b",
    },
    h2: {
      fontWeight: "bold",
      fontSize: "40px",
      color: "#0b376b",
    },
  },
  palette: {
    primary: {
      main: "#2097f8",
      light: lightBlue[300],
      dark: lightBlue[700],
    },
    secondary: {
      main: "#0b376b",
      light: blueGrey[500],
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "16px",
          boxShadow: "none",
          minWidth: "120px",
          transition: "none",
          padding: "7px 18px",
        },
        contained: {
          color: "#fff",
          backgroundColor: "#2097f8",
          "&:hover": {
            boxShadow: "none",
            backgroundColor: "#0b376b",
          },
        },
        outlined: {
          padding: "6px 18px",
          border: "1px solid #2097f8",
          "&:hover": {
            border: "1px solid #2097f8",
          },
        },
        text: {
          color: "#2097f8",
          "&:hover": {
            backgroundColor: "transparent",
            color: "#0b376b",
          },
        },
        containedSizeSmall: {
          fontSize: "14px",
          minWidth: "0",
          padding: "5px 12px",
        },
      },
    },
  },
});
