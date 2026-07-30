import { ArrowRight, Star, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeroStats from "./HeroStats";

function HeroContent() {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600">
        <Star className="h-4 w-4 fill-orange-500 text-orange-500" />
        Premium Desserts Since 2020
      </div>

      {/* Heading */}
      <h1 className="mt-6 text-5xl font-extrabold leading-tight text-gray-900 lg:text-6xl">
        Crafted with Love.
        <br />
        <span className="text-orange-500">
          Delivered with Happiness.
        </span>
      </h1>

      {/* Description */}
      <p className="mt-6 text-lg leading-8 text-gray-600">
        Discover handcrafted cakes, creamy ice creams, fresh coffee,
        waffles, and desserts made with premium ingredients and
        delivered fresh to your doorstep.
      </p>

      {/* Buttons */}
      <div className="mt-8 flex flex-wrap gap-4">
        <button
          onClick={() => navigate("/menu")}
          className="flex items-center gap-2 rounded-full bg-orange-500 px-7 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-orange-600"
        >
          Order Now
          <ArrowRight className="h-5 w-5" />
        </button>

        <button
          onClick={() => navigate("/menu")}
          className="rounded-full border border-gray-300 bg-white px-7 py-3 font-semibold text-gray-700 transition-all duration-300 hover:border-orange-500 hover:text-orange-500"
        >
          Explore Menu
        </button>
      </div>

      {/* Trust Row */}
      <div className="mt-10 flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className="h-5 w-5 fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <Users className="h-5 w-5 text-orange-500" />

          <span>
            Trusted by{" "}
            <span className="font-semibold text-gray-900">
              20,000+
            </span>{" "}
            dessert lovers
          </span>
        </div>
      </div>

      {/* Stats */}
      <HeroStats />
    </div>
  );
}

export default HeroContent;