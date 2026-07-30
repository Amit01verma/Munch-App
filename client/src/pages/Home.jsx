import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import CategorySection from "../components/CategorySection";
import FoodCard from "../components/FoodCard";
import Hero from "../components/Hero/Hero";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import api from "../services/api";
import { formatPrice } from "../utils/formatPrice";
import SkeletonCard from "../components/SkeletonCard";
import { useNavigate } from "react-router-dom";

function Home({ cart, handleAddToCart }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    document.title = "Home | Munch";

    fetchProducts();
  }, []);

 const fetchProducts = async () => {
  try {
    setLoading(true);

    const res = await api.get("/products");

    setProducts(res.data);
  } catch (error) {
    console.error("Failed to fetch products", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <MainLayout cart={cart}>
      <>
        {/* Hero Section */}
        <Hero />

        {/* Categories */}
        <CategorySection />

        {/* Featured Desserts */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex items-center justify-between">
              <div>
                <p className="font-semibold text-orange-500">
                  Featured Desserts
                </p>

                <h2 className="mt-2 text-4xl font-bold text-gray-900">
                  Most Loved This Week
                </h2>
              </div>

              <button
  onClick={() => navigate("/menu")}
  className="rounded-full border border-orange-500 px-6 py-3 font-semibold text-orange-500 transition-all duration-300 hover:bg-orange-500 hover:text-white"
>
  View All
</button>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {loading
  ? Array.from({ length: 6 }).map((_, index) => (
      <SkeletonCard key={index} />
    ))
  : products.slice(0, 6).map((product) => (
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
          </div>
        </section>

        {/* Why Choose Us */}
        <WhyChooseUs />
        <Testimonials />
        <Newsletter />
      </>
    </MainLayout>
  );
}

export default Home;