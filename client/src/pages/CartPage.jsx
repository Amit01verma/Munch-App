import { Link } from "react-router-dom";
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import { formatPrice } from "../utils/formatPrice";

function CartPage({
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
}) {
  useEffect(() => {
    document.title = "Cart | Munch";
  }, []);

  if (cart.length === 0) {
    return (
      <MainLayout cart={cart}>
        <section className="flex min-h-[70vh] items-center justify-center bg-orange-50/40 px-6">
          <div className="text-center">
            <ShoppingCart className="mx-auto h-24 w-24 text-orange-400" />

            <h2 className="mt-6 text-4xl font-bold text-gray-900">
              Your Cart is Empty
            </h2>

            <p className="mt-3 text-lg text-gray-500">
              Add some delicious food from our menu.
            </p>

            <Link to="/menu">
              <button className="mt-8 rounded-2xl bg-orange-500 px-8 py-4 font-semibold text-white shadow-lg transition hover:bg-orange-600">
                Browse Menu
              </button>
            </Link>
          </div>
        </section>
      </MainLayout>
    );
  }

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const FREE_DELIVERY_THRESHOLD = 499;

const remaining = Math.max(FREE_DELIVERY_THRESHOLD - subtotal, 0);

const progress = Math.min(
  (subtotal / FREE_DELIVERY_THRESHOLD) * 100,
  100,
);

  const delivery = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : 40;
  const gst = subtotal * 0.05;
  const total = subtotal + delivery + gst;

  return (
    <MainLayout cart={cart}>
      <section className="min-h-screen bg-orange-50/40 py-12">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h1 className="mb-8 text-4xl font-bold text-gray-900">
              Shopping Cart
            </h1>

            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center gap-6 rounded-3xl bg-white p-6 shadow-lg sm:flex-row"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-36 w-36 object-contain"
                  />

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold">{item.name}</h3>

                    <p className="mt-2 text-gray-500">
                      {formatPrice(item.price)}
                    </p>

                    <p className="mt-2 font-semibold text-orange-600">
                      {formatPrice(item.price * item.quantity)}
                    </p>

                    <div className="mt-5 flex items-center gap-3">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="rounded-xl bg-orange-100 p-2 transition hover:bg-orange-200"
                      >
                        <Minus size={18} />
                      </button>

                      <span className="text-xl font-bold">{item.quantity}</span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="rounded-xl bg-orange-100 p-2 transition hover:bg-orange-200"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="rounded-xl bg-red-100 p-3 text-red-500 transition hover:bg-red-200"
                  >
                    <Trash2 />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="h-fit rounded-3xl bg-white p-8 shadow-xl">
            <h2 className="text-3xl font-bold">Order Summary</h2>
            <div className="mt-6 rounded-2xl bg-orange-50 p-5">
  {remaining > 0 ? (
    <>
      <div className="flex items-center justify-between text-sm font-medium">
        <span>🚚 Free Delivery Progress</span>

        <span>{Math.round(progress)}%</span>
      </div>

      <div className="mt-3 h-3 overflow-hidden rounded-full bg-orange-200">
        <div
          className="h-full rounded-full bg-orange-500 transition-all duration-700"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <p className="mt-3 text-sm text-gray-700">
        Add{" "}
        <span className="font-bold text-orange-600">
          {formatPrice(remaining)}
        </span>{" "}
        more to unlock
        <span className="font-semibold text-green-600">
          {" "}
          FREE Delivery 🚚
        </span>
      </p>
    </>
  ) : (
    <>
      <div className="flex items-center justify-between text-green-600 font-semibold">
        <span>🎉 Free Delivery Unlocked</span>

        <span>100%</span>
      </div>

      <div className="mt-3 h-3 overflow-hidden rounded-full bg-green-200">
        <div
          className="h-full rounded-full bg-green-500 transition-all duration-700"
          style={{
            width: "100%",
          }}
        />
      </div>

      <p className="mt-3 text-sm text-green-600 font-medium">
        Congratulations! You unlocked FREE Delivery 🚚
      </p>
    </>
  )}
</div>

            <div className="mt-8 space-y-5">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <div className="flex justify-between">
  <span>Delivery</span>

  {delivery === 0 ? (
    <span className="font-semibold text-green-600">
      <span className="mr-2 text-gray-400 line-through">
        {formatPrice(40)}
      </span>
      FREE
    </span>
  ) : (
    <span>{formatPrice(delivery)}</span>
  )}
</div>

              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span>{formatPrice(gst)}</span>
              </div>

              <hr />

              <div className="flex justify-between text-2xl font-bold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <Link to="/checkout">
              <button className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-orange-500 py-4 font-semibold text-white shadow-lg transition hover:bg-orange-600">
                Proceed to Checkout
                <ArrowRight />
              </button>
            </Link>

            <button
              onClick={clearCart}
              className="mt-4 w-full rounded-2xl border border-red-300 py-4 font-semibold text-red-500 transition hover:bg-red-50"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default CartPage;
