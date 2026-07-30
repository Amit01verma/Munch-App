import { useEffect, useState } from "react";
import api from "../services/api";

function CategorySection() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const getIcon = (name) => {
    switch (name) {
      case "Burgers":
        return "🍔";
      case "Pizzas":
        return "🍕";
      case "Pasta":
        return "🍝";
      case "Wraps":
        return "🌯";
      case "Fries":
        return "🍟";
      case "Beverages":
        return "🥤";
      default:
        return "🍽️";
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Categories</h2>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginTop: "10px",
        }}
      >
        {categories.map((category) => (
          <button
            key={category.id}
            style={{
              padding: "10px 16px",
              borderRadius: "20px",
              border: "1px solid #ddd",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            {getIcon(category.name)} {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategorySection;