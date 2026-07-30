function Cart({ cart, totalPrice, setCart }) {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Shopping Cart</h2>

      <p>Items in Cart: {cart.length}</p>

      <p>Total: ${totalPrice.toFixed(2)}</p>

      <button
        onClick={() => setCart([])}
        disabled={cart.length === 0}
      >
        Clear Cart
      </button>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;