import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import api from "./services/api";
import MyOrders from "./pages/MyOrders";
import toast from "react-hot-toast";

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  async function loadCart() {
  const token = localStorage.getItem("token");

  if (!token) {
    setCart([]);
    return;
  }

  try {
    const res = await api.get("/cart");

    const items =
      res.data.items?.map((item) => ({
        id: item.id,
        productId: item.product.id,
        name: item.product.name,
        image: item.product.image,
        price: item.product.price,
        quantity: item.quantity,
      })) || [];

    setCart(items);
  } catch (err) {
    console.error(err);
  }
}

async function handleAddToCart(product) {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Please login first!");
    return;
  }

  try {
    await api.post("/cart", {
      productId: product.id,
      quantity: 1,
    });

    await loadCart();

    toast.success(`${product.name} added to cart 🛒`);
  } catch (err) {
    console.error(err);
    toast.error("Failed to add item.");
  }
}

  async function increaseQuantity(id) {
    const item = cart.find((i) => i.id === id);

    if (!item) return;

    try {
      await api.put(`/cart/${id}`, {
        quantity: item.quantity + 1,
      });

      await loadCart();

    } catch (err) {
      console.error(err);
    }
  }

  async function decreaseQuantity(id) {
    const item = cart.find((i) => i.id === id);

    if (!item) return;

    if (item.quantity === 1) {
      removeItem(id);
      return;
    }

    try {
      await api.put(`/cart/${id}`, {
        quantity: item.quantity - 1,
      });

      await loadCart();
    } catch (err) {
      console.error(err);
    }
  }

  async function removeItem(id) {
  try {
    await api.delete(`/cart/${id}`);
    await loadCart();

    toast.success("Item removed");
  } catch (err) {
    console.error(err);
    toast.error("Failed to remove item.");
  }
}
  async function clearCart() {
  try {
    await api.delete("/cart");
    setCart([]);

    toast.success("Cart cleared");
  } catch (err) {
    console.error(err);
    toast.error("Failed to clear cart.");
  }
}

  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              cart={cart}
              handleAddToCart={handleAddToCart}
            />
          }
        />

        <Route
          path="/menu"
          element={
            <Menu
              cart={cart}
              handleAddToCart={handleAddToCart}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeItem={removeItem}
              clearCart={clearCart}
            />
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProductDetails
              cart={cart}
              handleAddToCart={handleAddToCart}
            />
          }
        />

       <Route
  path="/checkout"
  element={
    <Checkout
      cart={cart}
      setCart={setCart}
      loadCart={loadCart}
    />
  }
/>
<Route
   path="/orders"
   element={<MyOrders cart={cart} />}
/>
        <Route
          path="/order-success"
          element={<OrderSuccess cart={cart} />}
        />

        <Route
          path="/login"
          element={<Login cart={cart} />}
        />

        <Route
          path="/register"
          element={<Register cart={cart} />}
        />

        <Route
          path="*"
          element={<NotFound cart={cart} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;