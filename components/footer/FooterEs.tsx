import { Container, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Container
      sx={{
        borderTop: "1px solid #ccc",
        marginTop: "25px",
        paddingTop: "5px",
        paddingBottom: "15px",
      }}
    >
      <Typography sx={{ textAlign: "center", fontSize: "13px" }}>
        DevsLearning 2024 | Creado por{" "}
        <a
          href="https://github.com/sergiogregorutti"
          target="_blank"
          rel="noreferrer"
          style={{
            color: "#2097f8",
            textDecoration: "none",
          }}
        >
          @sergiogregorutti
        </a>
      </Typography>
    </Container>
  );
}
