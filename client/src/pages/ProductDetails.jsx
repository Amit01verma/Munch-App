import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Star,
  ShoppingCart,
  ArrowLeft,
  Plus,
  Minus,
} from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import { formatPrice } from "../utils/formatPrice";

function ProductDetails({ cart, handleAddToCart }) {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    document.title = "Dessert Details | Munch";
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const productRes = await api.get(`/products/${id}`);
      setProduct(productRes.data);

      const productsRes = await api.get("/products");

      const related = productsRes.data
        .filter(
          (item) =>
            item.category?.name === productRes.data.category?.name &&
            item.id !== productRes.data.id
        )
        .slice(0, 4);

      setRelatedProducts(related);
    } catch (error) {
      console.error(error);
    }
  };

  if (!product) {
    return (
      <MainLayout cart={cart}>
        <div className="flex min-h-screen items-center justify-center">
          <h2 className="text-2xl font-bold">Loading...</h2>
        </div>
      </MainLayout>
    );
  }

  const isInCart = cart.some(
    (item) => item.productId === product.id
  );

  return (
    <MainLayout cart={cart}>
      <section className="bg-orange-50/40 py-16">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-xl">
            <img
              src={product.image}
              alt={product.name}
              className="mx-auto h-[500px] object-contain transition duration-300 hover:scale-105"
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className="w-fit rounded-full bg-orange-100 px-4 py-2 font-semibold text-orange-600">
              {product.category?.name}
            </span>

            <h1 className="mt-5 text-5xl font-bold text-gray-900">
              {product.name}
            </h1>

            <div className="mt-5 flex items-center gap-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{product.rating}</span>
              <span className="text-gray-500">(250 Reviews)</span>
            </div>

            <p className="mt-8 text-lg leading-8 text-gray-600">
              Freshly handcrafted using premium ingredients. Every bite is rich,
              creamy and prepared with love to deliver the perfect dessert
              experience.
            </p>

            <h2 className="mt-8 text-4xl font-bold text-orange-600">
              {formatPrice(product.price)}
            </h2>

            <div className="mt-10 flex items-center gap-5">
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="rounded-xl bg-white p-3 shadow transition hover:bg-orange-100"
              >
                <Minus />
              </button>

              <span className="text-2xl font-bold">{quantity}</span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="rounded-xl bg-white p-3 shadow transition hover:bg-orange-100"
              >
                <Plus />
              </button>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={() => {
                  if (!isInCart) {
                    for (let i = 0; i < quantity; i++) {
                      handleAddToCart(product);
                    }
                  }
                }}
                disabled={isInCart}
                className={`flex items-center gap-3 rounded-2xl px-8 py-4 font-semibold text-white shadow-lg transition ${
                  isInCart
                    ? "cursor-not-allowed bg-green-500"
                    : "bg-orange-500 hover:bg-orange-600"
                }`}
              >
                <ShoppingCart size={20} />
                {isInCart
                  ? "✓ Added to Cart"
                  : `Add ${quantity} to Cart`}
              </button>

              <Link to="/menu">
                <button className="flex items-center gap-2 rounded-2xl border border-gray-300 bg-white px-8 py-4 font-semibold transition hover:bg-gray-100">
                  <ArrowLeft size={20} />
                  Back to Menu
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-24 max-w-7xl px-6">
          <h2 className="mb-10 text-4xl font-bold text-gray-900">
            You May Also Like
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((item) => {
              const relatedInCart = cart.some(
                (cartItem) => cartItem.productId === item.id
              );

              return (
                <div
                  key={item.id}
                  className="group rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
                >
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="mx-auto h-52 object-contain transition duration-300 group-hover:scale-110"
                    />

                    <h3 className="mt-5 text-xl font-bold">
                      {item.name}
                    </h3>

                    <p className="mt-2 font-semibold text-orange-600">
                      {formatPrice(item.price)}
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{item.rating}</span>
                    </div>
                  </Link>

                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={relatedInCart}
                    className={`mt-5 w-full rounded-xl py-3 font-semibold text-white transition ${
                      relatedInCart
                        ? "cursor-not-allowed bg-green-500"
                        : "bg-orange-500 hover:bg-orange-600"
                    }`}
                  >
                    {relatedInCart ? "✓ Added" : "Add to Cart"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default ProductDetails;