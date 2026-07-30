import { useState, useEffect } from "react";
import { CreditCard, MapPin, User, Phone, Mail } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { formatPrice } from "../utils/formatPrice";

function Checkout({ cart, setCart, loadCart }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Checkout | Munch";
  }, []);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const delivery = cart.length > 0 ? 40 : 0;
  const gst = subtotal * 0.05;
  const totalPrice = subtotal + delivery + gst;

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const values = Object.values(formData);

    if (values.some((value) => value.trim() === "")) {
      alert("Please fill in all delivery details.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/orders");

      await loadCart();

      setCart([]);

      navigate("/order-success");
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout cart={cart}>
      <section className="min-h-screen bg-orange-50/40 py-12">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-3">
          {/* Billing Form */}

          <div className="lg:col-span-2 rounded-3xl bg-white p-8 shadow-xl">
            <h1 className="mb-8 text-4xl font-bold text-gray-900">Checkout</h1>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <User className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-200"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-200"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-200"
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-200"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-200"
                />

                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  className="rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-200"
                />

                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP Code"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-200"
                />
              </div>

              <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
                  <CreditCard className="text-orange-500" />
                  Payment Method
                </h3>

                <label className="flex cursor-pointer items-center gap-3">
                  <input type="radio" checked readOnly />
                  Cash on Delivery
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full rounded-2xl bg-orange-500 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </form>
          </div>

          {/* Order Summary */}

          <div className="h-fit rounded-3xl bg-white p-8 shadow-xl">
            <h2 className="text-3xl font-bold">Order Summary</h2>

            {cart.length === 0 ? (
              <p className="mt-6 text-gray-500">Your cart is empty.</p>
            ) : (
              <>
                <div className="mt-6 space-y-5">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between border-b pb-4"
                    >
                      <div>
                        <h4 className="font-semibold">{item.name}</h4>

                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <span className="font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>{formatPrice(delivery)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>GST (5%)</span>
                    <span>{formatPrice(gst)}</span>
                  </div>

                  <hr />

                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default Checkout;
