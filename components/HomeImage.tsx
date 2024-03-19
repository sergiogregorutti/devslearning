"use client";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

export default function HomeImage() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      {matches ? (
        <img src="../assets/girl.png" style={{ width: "100%" }} />
      ) : (
        <img
          src="../assets/girl.png"
          style={{
            height: "150px",
            marginBottom: "20px",
            marginTop: "-25px",
          }}
        />
      )}
    </>
  );
}
