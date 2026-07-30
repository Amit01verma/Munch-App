import { useState } from "react";
import {
  Heart,
  ShoppingCart,
  Star,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";

function FoodCard({
  id,
  name,
  price,
  image,
  rating,
  onAddToCart,
}) {
  const [added, setAdded] = useState(false);

  function handleAdd() {
    onAddToCart();

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  }

  return (
    <div className="group overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Image */}
      <div className="relative overflow-hidden">
        <Link to={`/product/${id}`}>
          <img
            src={image}
            alt={name}
            className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>

        {/* Rating */}
        <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-white px-3 py-1 shadow">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold">
            {rating}
          </span>
        </div>

        {/* Wishlist */}
        <button className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition hover:bg-orange-500 hover:text-white">
          <Heart className="h-5 w-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <Link to={`/product/${id}`} className="block">
          <h3 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-orange-500">
            {name}
          </h3>
        </Link>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          Freshly prepared with premium ingredients and
          delivered with love.
        </p>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-2xl font-bold text-orange-500">
  {formatPrice(price)}
</span>

          <button
            onClick={handleAdd}
            className={`flex items-center gap-2 rounded-full px-5 py-3 font-semibold text-white transition-all duration-500 ease-in-out ${
              added
  ? "scale-105 bg-green-500 shadow-lg shadow-green-300"
  : "bg-orange-500 hover:scale-105 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-300"
            }`}
          >
            {added ? (
              <>
                <Check className="h-5 w-5 animate-pulse" />
                Added
              </>
            ) : (
              <>
                <ShoppingCart className="h-5 w-5 transition-transform duration-300 group-hover:rotate-6" />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;