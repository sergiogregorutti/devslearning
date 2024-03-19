"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Typography,
  useMediaQuery,
} from "@mui/material";

interface ICategory {
  _id: string;
  name: string;
}

interface ICourse {
  _id: string;
  name: string;
  description: string;
  platform: string;
  author: string;
  pricing: string;
  price: number;
  year: number;
  link: string;
}

const getFilteredCourses = (
  page: Number,
  size: Number,
  filters = {},
  sortBy: String = "price",
  order: String = "desc"
) => {
  const data = {
    page,
    size,
    filters,
    sortBy,
    order,
  };
  return fetch(`/api/courses/by/search`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

const CategoryEs = ({ category }: { category: ICategory }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const [myFilters, setMyFilters] = useState<any>({
    filters: { category: "" },
  });
  const [sortBy, setSortBy] = useState<any>("priceHighToLow");
  const size = 5;
  const [page, setPage] = useState(0);
  const [filteredResults, setFilteredResults] = useState<any>([]);

  const generateSorting = (value: String) => {
    switch (value) {
      case "priceHighToLow":
        return {
          sortBy: "price",
          order: "desc",
        };
      case "priceLowToHigh":
        return {
          sortBy: "price",
          order: "asc",
        };
      case "newest":
        return {
          sortBy: "year",
          order: "desc",
        };
      default:
        return {
          sortBy: "price",
          order: "desc",
        };
    }
  };

  useEffect(() => {
    init(category._id);
  }, []);

  const handleFilters = (filters: any, filterBy: string) => {
    const sorting = generateSorting(sortBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    loadFilteredResults(
      page,
      size,
      myFilters.filters,
      sorting.sortBy,
      sorting.order
    );
    setMyFilters(newFilters);
  };

  const init = (categoryId: String) => {
    handleFilters(categoryId, "category");
  };

  const loadFilteredResults = (
    page: Number,
    size: Number,
    newFilters: any,
    sortBy: String,
    order: String
  ) => {
    getFilteredCourses(page, size, newFilters, sortBy, order).then((data) => {
      if (data.error) {
        console.error("There is an error loading the courses");
      } else {
        setFilteredResults(data.courses);
        setPage(0);
      }
    });
  };

  const renderPricing = (value: String) => {
    switch (value) {
      case "free":
        return (
          <Typography
            variant="body1"
            component="div"
            gutterBottom
            sx={{
              fontSize: "15px",
              color: "#4CC94D",
              fontWeight: "bold",
              marginBottom: "0",
            }}
          >
            Free
          </Typography>
        );
      case "one-time-payment":
        return (
          <Typography
            variant="body1"
            component="div"
            gutterBottom
            sx={{
              fontSize: "15px",
              color: "#E5057E",
              fontWeight: "bold",
              marginBottom: "0",
            }}
          >
            One Time Payment
          </Typography>
        );
      case "subscription":
        return (
          <Typography
            variant="body1"
            component="div"
            gutterBottom
            sx={{
              fontSize: "15px",
              color: "#EE741C",
              fontWeight: "bold",
              marginBottom: "0",
            }}
          >
            Subscription
          </Typography>
        );
    }
  };

  const handleSortByChange = (
    event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent
  ) => {
    const value = event.target.value;
    const sorting = generateSorting(value);
    loadFilteredResults(
      0,
      size,
      myFilters.filters,
      sorting.sortBy,
      sorting.order
    );
    setSortBy(value);
    setPage(0);
  };

  return (
    <>
      <Grid container justifyContent="center">
        <Grid
          item
          sm={9}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "left",
            borderBottom: "1px solid #000",
            marginBottom: "20px",
            paddingBottom: "20px",
            width: "100%",
          }}
        >
          {matches
            ? category && (
                <img
                  src={`/api/category/photo/${category._id}`}
                  alt={category.name}
                  style={{ height: "70px", marginRight: "15px" }}
                />
              )
            : category && (
                <img
                  src={`/api/category/photo/${category._id}`}
                  alt={category.name}
                  style={{ height: "50px", marginRight: "10px" }}
                />
              )}

          <Typography
            variant="h1"
            component="div"
            gutterBottom
            sx={{
              fontSize: { xs: "24px", sm: "42px" },
              marginBottom: "0",
            }}
          >
            {category && category.name}
          </Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" sx={{ alignItems: "left" }}>
        <Grid item sm={9} sx={{ marginBottom: "10px", width: "100%" }}>
          <FormControl
            component="fieldset"
            sx={{
              display: { xs: "none", sm: "block" },
            }}
          >
            <FormLabel component="legend">Sort By</FormLabel>
            <RadioGroup
              row
              aria-label="sort-by-radio"
              value={sortBy}
              onChange={handleSortByChange}
              name="sort-by-radio"
            >
              <FormControlLabel
                value="priceHighToLow"
                control={<Radio />}
                label="Price: High to Low"
              />
              <FormControlLabel
                value="priceLowToHigh"
                control={<Radio />}
                label="Price: Low to High"
              />
              <FormControlLabel
                value="newest"
                control={<Radio />}
                label="Newest"
              />
            </RadioGroup>
          </FormControl>
          <FormControl
            variant="standard"
            margin="dense"
            sx={{
              display: { xs: "block", sm: "none" },
            }}
          >
            <InputLabel id="sort-by-select">Sort By</InputLabel>
            <Select
              labelId="sort-by-select"
              id="sort-by-select"
              value={sortBy}
              label="SortBy"
              onChange={handleSortByChange}
            >
              <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
              <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
              <MenuItem value="newest">Newest</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={9}>
          {filteredResults.map((course: ICourse, i: number) => (
            <Grid
              key={i}
              container
              justifyContent="center"
              sx={{
                borderRadius: "10px",
                padding: { xs: "20px", sm: "20px 20px 20px 0" },
                background: "#f7f7f7",
                marginBottom: "15px",
              }}
            >
              <Grid
                item
                sm={3}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: { xs: "start", sm: "center" },
                  marginBottom: { xs: "15px", sm: "0" },
                }}
              >
                <img
                  src={`/api/course/photo/${course._id}`}
                  alt={course.name}
                  style={{
                    width: "80%",
                  }}
                />
              </Grid>
              <Grid
                item
                sm={9}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                }}
              >
                {renderPricing(course.pricing)}
                <Typography
                  variant="h2"
                  component="div"
                  gutterBottom
                  sx={{
                    fontSize: "18px",
                    marginBottom: "5px",
                    color: "#0b376b",
                  }}
                >
                  {course.name}
                </Typography>

                <Typography
                  variant="subtitle1"
                  gutterBottom
                  component="div"
                  sx={{
                    fontSize: "14px",
                    lineHeight: "16px",
                    marginBottom: "8px",
                  }}
                >
                  {course.description}
                </Typography>

                <div>
                  {course.platform && (
                    <Typography
                      variant="body1"
                      gutterBottom
                      component="span"
                      sx={{
                        fontSize: "14px",
                        lineHeight: "16px",
                        marginRight: "10px",
                      }}
                    >
                      <strong>Platform:</strong> {course.platform}
                    </Typography>
                  )}
                  {course.author && (
                    <Typography
                      variant="body1"
                      gutterBottom
                      component="span"
                      sx={{
                        fontSize: "14px",
                        lineHeight: "16px",
                        marginRight: "10px",
                      }}
                    >
                      <strong>Author:</strong> {course.author}
                    </Typography>
                  )}
                  <Typography
                    variant="body1"
                    gutterBottom
                    component="span"
                    sx={{
                      fontSize: "14px",
                      lineHeight: "16px",
                      marginRight: "10px",
                    }}
                  >
                    <strong>Price:</strong> US$ {course.price}
                  </Typography>
                  {course.year && (
                    <Typography
                      variant="body1"
                      gutterBottom
                      component="span"
                      sx={{
                        fontSize: "14px",
                        lineHeight: "16px",
                        marginRight: "10px",
                      }}
                    >
                      <strong>Year:</strong> {course.year}
                    </Typography>
                  )}
                </div>
                <div style={{ marginTop: "10px" }}>
                  <Button
                    variant="contained"
                    href={course.link}
                    target="_blank"
                    size="small"
                    sx={{ width: "auto" }}
                  >
                    Visit Course
                  </Button>
                </div>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default CategoryEs;
