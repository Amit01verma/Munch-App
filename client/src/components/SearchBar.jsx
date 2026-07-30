import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { formatPrice } from "../utils/formatPrice";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const wrapperRef = useRef(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    const search = query.trim().toLowerCase();

    if (!search) {
      setFilteredProducts([]);
      return;
    }

    const results = products.filter((product) =>
      product.name.toLowerCase().includes(search)
    );

    setFilteredProducts(results.slice(0, 6));
  }, [query, products]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target)
      ) {
        setFilteredProducts([]);
      }
    }

    function handleEscape(e) {
      if (e.key === "Escape") {
        setQuery("");
        setFilteredProducts([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative w-80 xl:w-96"
    >
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search cakes, coffee, waffles..."
        className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-700 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
      />

      {query && (
        <div className="absolute left-0 top-12 z-50 max-h-96 w-full overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-2xl">

          {loading ? (
            <div className="p-5 text-center text-gray-500">
              Loading...
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-5 text-center text-gray-500">
              No desserts found 🍰
            </div>
          ) : (
            filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                onClick={() => {
                  setQuery("");
                  setFilteredProducts([]);
                }}
                className="flex items-center gap-3 border-b border-gray-100 p-3 transition-all duration-200 hover:bg-orange-50 last:border-none"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-14 w-14 rounded-xl object-cover"
                />

                <div className="flex-1">
                  <h3 className="line-clamp-1 font-medium text-gray-900">
                    {product.name}
                  </h3>

                  <div className="mt-1 flex items-center justify-between">
                    <span className="font-semibold text-orange-500">
                      {formatPrice(product.price)}
                    </span>

                    <span className="text-xs text-yellow-500">
                      ⭐ {product.rating}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;