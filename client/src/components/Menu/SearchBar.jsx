import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { formatPrice } from "../utils/formatPrice";

function SearchBar() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);

  const searchRef = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered.slice(0, 6));
    setOpen(true);
  }, [query, products]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <div
      ref={searchRef}
      className="relative hidden w-[420px] lg:block"
    >
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        placeholder="Search cakes, waffles, coffee..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-full border border-gray-300 bg-gray-50 py-3 pl-11 pr-4 outline-none transition focus:border-orange-500 focus:bg-white"
      />

      {open && (
        <div className="absolute mt-3 max-h-[420px] w-full overflow-y-auto rounded-2xl border bg-white shadow-2xl">
          {results.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No products found 😔
            </div>
          ) : (
            results.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                onClick={() => {
                  setOpen(false);
                  setQuery("");
                }}
                className="flex items-center gap-4 border-b p-4 transition hover:bg-orange-50"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-16 w-16 rounded-xl object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-semibold">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    ⭐ {product.rating}
                  </p>
                </div>

                <span className="font-bold text-orange-500">
                  {formatPrice(product.price)}
                </span>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;