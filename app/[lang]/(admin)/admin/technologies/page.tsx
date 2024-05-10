"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navigation from "../components/navigation/Navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";

import "../../../../../css/admin-template.css";

export default function Technologies() {
  const [values, setValues] = useState<any>({
    categories: "",
  });

  const { categories } = values;

  const loadCategories = async () => {
    const data = {
      filters: {},
      sortBy: "_id",
      order: "desc",
    };
    const response = await fetch(`/api/categories/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const categories = await response.json();

    setValues({
      ...values,
      categories: categories.categories,
    });
  };

  const init = () => {
    loadCategories();
  };

  useEffect(() => {
    init();
  }, []);

  const destroy = (categoryId: String) => {
    /*
    deleteCategory(categoryId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        toast.success("Category deleted");
        loadCategories();
      }
    });
    */
  };

  return (
    <div className="admin-template">
      <div className="container">
        <div className="content-container">
          <Navigation />
          <div className="content">
            <h1>Technologies</h1>
            <Link className="btn btn-big" href="/admin/technologies">
              Add Technology
            </Link>

            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Category</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories &&
                    categories.map((category: any) => (
                      <TableRow
                        key={category.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={`/assets/technologies/${category._id}.svg`}
                            alt={category.name}
                          />
                          {category.name}
                        </TableCell>
                        <TableCell align="center">
                          <Link
                            className="btn btn-link"
                            href={`/admin/technologies/${category._id}`}
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-link"
                            onClick={() => destroy(category._id)}
                          >
                            Delete
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
