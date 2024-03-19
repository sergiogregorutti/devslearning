import Link from "next/link";
import dbConnect from "../../lib/dbConnect";
import CategoryEs from "../../models/CategoryEs";
import LayoutEs from "../../components/layout/LayoutEs";
import HomeImage from "../../components/HomeImage";
import { Container, Grid, Typography, Button } from "@mui/material";

async function getCategories() {
  await dbConnect();

  const result = await CategoryEs.find({});

  const categories = result.map((doc) => {
    const category = JSON.parse(JSON.stringify(doc));
    return category;
  });

  return categories;
}

export default async function HomeEs() {
  const categories = await getCategories();

  return (
    <LayoutEs>
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
              Bienvenidos a
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
              Directorio de cursos para desarrolladores.
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
          <HomeImage />
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
          ¿Que te gustaría aprender?
        </Typography>

        <Grid container spacing={4}>
          {categories &&
            categories.map((category: any) => (
              <Grid item key={category.name} xs={12} sm={6} lg={3}>
                <Link
                  href={`/es/categories/${category._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    variant="outlined"
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
                      src={`/api/es/category/photo/${category._id}`}
                      alt={category.name}
                      style={{ height: "38px", marginRight: "10px" }}
                    />
                    {category.name}
                  </Button>
                </Link>
              </Grid>
            ))}
        </Grid>
      </div>
    </LayoutEs>
  );
}
