import { CheckCircle2, ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { useEffect } from "react";
import { formatPrice } from "../utils/formatPrice";

function OrderSuccess({ cart }) {
    useEffect(() => {
  document.title = "Order Success | Munch";
}, []);
  return (
    <MainLayout cart={cart}>
      <section className="flex min-h-[80vh] items-center justify-center bg-orange-50/40 px-6">
        <div className="max-w-xl rounded-3xl bg-white p-10 text-center shadow-2xl">

          <CheckCircle2
            size={90}
            className="mx-auto text-green-500"
          />

          <h1 className="mt-6 text-4xl font-bold text-gray-900">
            Order Placed Successfully!
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Thank you for choosing <span className="font-semibold text-orange-500">Munch</span>.
            Your delicious desserts are now being prepared.
          </p>

          <div className="mt-8 rounded-2xl bg-orange-50 p-5">
            <p className="text-gray-700">
              🚚 Estimated Delivery
            </p>

            <h2 className="mt-2 text-2xl font-bold text-orange-500">
              20 - 30 Minutes
            </h2>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <Link to="/menu" className="flex-1">
              <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 py-4 font-semibold text-white transition hover:bg-orange-600">
                <ShoppingBag size={20} />
                Continue Shopping
              </button>
            </Link>

            <Link to="/" className="flex-1">
              <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-300 bg-white py-4 font-semibold transition hover:bg-gray-100">
                Home
                <ArrowRight size={18} />
              </button>
            </Link>

          </div>

        </div>
      </section>
    </MainLayout>
  );
}

export default OrderSuccess;