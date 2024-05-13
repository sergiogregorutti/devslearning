"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navigation from "../ui/navigation/Navigation";
import Search from "../ui/search/Search";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";

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
            <div className="main-actions">
              <div>
                <Link className="btn btn-big" href="/admin/technologies">
                  + Add New
                </Link>
              </div>
              <div className="search-column">
                <Search placeholder="Search technologies..." />
              </div>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories &&
                    categories.map((category: any) => (
                      <tr key={category.name}>
                        <td>
                          <span className="image-container">
                            <img
                              src={`/assets/technologies/${category._id}.svg`}
                              alt={category.name}
                            />
                          </span>
                          <span className="name">{category.name}</span>
                        </td>
                        <td>
                          <Link
                            className="btn btn-link"
                            href={`/admin/technologies/edit/${category._id}`}
                          >
                            <EditIcon />
                            <span className="btn-text">Edit</span>
                          </Link>
                          <button
                            className="btn btn-link btn-remove"
                            onClick={() => destroy(category._id)}
                          >
                            <ClearIcon />
                            <span className="btn-text">Remove</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
