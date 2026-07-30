import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import { formatPrice } from "../utils/formatPrice";

function MyOrders({ cart }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <MainLayout cart={cart}>
        <div className="max-w-5xl mx-auto py-20 text-center">
          <h2 className="text-3xl font-bold">Loading Orders...</h2>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout cart={cart}>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-10">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold">No Orders Yet</h2>

            <p className="text-gray-500 mt-3">
              Place your first order from our menu.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-2xl shadow-md p-6">
                <div className="flex justify-between items-center mb-5">
                  <div>
                    <h2 className="text-xl font-bold">Order #{order.id}</h2>

                    <p className="text-gray-500 text-sm">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                      Placed
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between border-b pb-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />

                        <div>
                          <h3 className="font-semibold">{item.product.name}</h3>

                          <p className="text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>

                      <p className="font-bold text-orange-500">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mt-6">
                  <h3 className="text-2xl font-bold">
                    Total : {formatPrice(order.totalPrice)}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default MyOrders;
