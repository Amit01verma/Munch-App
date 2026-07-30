import { useState, useEffect } from "react";
import { Search, ArrowUpDown } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import FoodCard from "../components/FoodCard";
import api from "../services/api";
import { formatPrice } from "../utils/formatPrice";

function Menu({ cart, handleAddToCart }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([
    { name: "All", icon: "🍽️" },
  ]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popular");

  useEffect(() => {
    document.title = "Menu | Munch";

    fetchProducts();
    fetchCategories();
  }, []);

  const getCategoryIcon = (name) => {
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

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");

      const formatted = [
        { name: "All", icon: "🍽️" },
        ...res.data.map((category) => ({
          name: category.name,
          icon: getCategoryIcon(category.name),
        })),
      ];

      setCategories(formatted);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };
    const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        product.category?.name === selectedCategory ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "low":
          return a.price - b.price;

        case "high":
          return b.price - a.price;

        case "rating":
          return b.rating - a.rating;

        default:
          return 0;
      }
    });

  return (
    <MainLayout cart={cart}>
      <section className="min-h-screen bg-orange-50/40">
        <div className="mx-auto max-w-7xl px-6 py-12">
          {/* Hero */}
          <div className="mb-12 text-center">
            <span className="rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-600">
              🍽️ Freshly Made Every Day
            </span>

            <h1 className="mt-6 text-5xl font-bold text-gray-900">
              Explore Our Menu
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
              Explore our delicious burgers, pizzas, pasta, wraps, fries and
              refreshing beverages made with premium ingredients.
            </p>
          </div>

          {/* Search */}
          <div className="mx-auto mb-10 max-w-xl">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="Search your favorite food..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full border border-orange-200 bg-white py-4 pl-14 pr-5 text-gray-700 shadow-md outline-none transition-all duration-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-200"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="mb-10 flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                  selectedCategory === category.name
                    ? "bg-orange-500 text-white shadow-lg"
                    : "bg-white text-gray-700 shadow hover:-translate-y-1 hover:bg-orange-100"
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          {/* Results + Sort */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Our Menu
              </h2>

              <p className="mt-1 text-gray-500">
                {filteredProducts.length} item
                {filteredProducts.length !== 1 ? "s" : ""} found
              </p>
            </div>

            <div className="relative w-full md:w-64">
              <ArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none rounded-xl border border-orange-200 bg-white py-3 pl-12 pr-5 shadow outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-200"
              >
                <option value="popular">⭐ Popular</option>
                <option value="rating">⭐ Highest Rated</option>
                <option value="low">💰 Price: Low to High</option>
                <option value="high">💎 Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Products */}
          {filteredProducts.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <FoodCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  rating={product.rating}
                  onAddToCart={() => handleAddToCart(product)}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-white py-20 text-center shadow">
              <h2 className="text-2xl font-bold text-gray-700">
                No food found 🍽️
              </h2>

              <p className="mt-3 text-gray-500">
                Try another search or choose a different category.
              </p>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}

export default Menu;