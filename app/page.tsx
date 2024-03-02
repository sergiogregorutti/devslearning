"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../components/layout/Layout";
import { useTheme } from "@mui/material/styles";
import {
  Container,
  Grid,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";

export default function Home() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const [categories, setCategories] = useState<any>();

  const loadCategories = () => {
    /*getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });*/
    setCategories([]);
  };

  const init = () => {
    loadCategories();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Layout>
      <Grid
        container
        justifyContent="center"
        spacing={2}
        sx={{
          paddingTop: "40px",
          paddingBottom: "40px",
          flexDirection: { xs: "column-reverse", sm: "row" },
          alignItems: { xs: "center", sm: "normal" },
        }}
      >
        <Grid
          item
          sm={6}
          sx={{
            paddingLeft: { xs: "0 !important", sm: "16px !important" },
            paddingTop: { xs: "0 !important", sm: "16px !important" },
            display: { xs: "block", sm: "flex" },
            alignItems: { xs: "top", sm: "center" },
          }}
        >
          <Container
            sx={{
              padding: { sm: "0 !important" },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <Typography
              variant="h1"
              component="div"
              sx={{ fontSize: { xs: "34px", lg: "63px" } }}
            >
              Welcome to
            </Typography>
            <img src="../assets/logo.svg" style={{ width: "78%" }} />
            <Typography
              variant="subtitle1"
              gutterBottom
              component="div"
              sx={{
                marginTop: "-5px",
                fontSize: { xs: "16px", sm: "18px", lg: "20px" },
              }}
            >
              Course directory for developers.
            </Typography>
          </Container>
        </Grid>
        <Grid
          item
          sm={6}
          sx={{
            paddingLeft: { xs: "0 !important", lg: "16px !important" },
            paddingTop: { xs: "0 !important", lg: "16px !important" },
          }}
        >
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
        </Grid>
      </Grid>

      <div
        style={{
          borderRadius: "10px",
          padding: "20px",
          background: "#f7f7f7",
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          component="div"
          sx={{
            textAlign: "center",
            marginBottom: { xs: "25px", sm: "40px" },
            fontSize: { xs: "28px", sm: "40px" },
          }}
        >
          What do you want to learn?
        </Typography>

        <Grid container spacing={4}>
          {categories &&
            categories.map((category: any) => (
              <Grid item key={category.name} xs={12} sm={6} lg={3}>
                <Button
                  variant="outlined"
                  component={Link}
                  to={`/categories/${category._id}`}
                  sx={{
                    position: "relative",
                    fontSize: "20px",
                    textAlign: "center",
                    width: "100%",
                    padding: "13px 10px 13px 42px",
                    " img": {
                      position: "absolute",
                      top: "12px",
                      left: "13px",
                    },
                  }}
                >
                  <img
                    src={`${process.env.REACT_APP_API}/category/photo/${category._id}`}
                    alt={category.name}
                    style={{ height: "38px", marginRight: "10px" }}
                  />
                  {category.name}
                </Button>
              </Grid>
            ))}
        </Grid>
      </div>
    </Layout>
  );
}
