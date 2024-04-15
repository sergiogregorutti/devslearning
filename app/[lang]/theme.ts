"use client";
import { Nunito, Poppins } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["300", "400"],
});

const theme = createTheme({
  typography: {
    fontFamily: nunito.style.fontFamily,
  },
  components: {
    MuiSelect: {
      styleOverrides: {
        select: {
          padding: "10px 10px 10px 10px",
        },
      },
    },
  },
});

export default theme;
