import { useEffect, useState } from "react";
import axios from "axios";

interface CartItem {
  id: number;
  quantity: number;
  name: string;
  price: string;
  image: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [message, setMessage] = useState<string>("");

  const userId = 1;

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/cart/${userId}`);
      setCartItems(res.data);
    } catch (error) {
      console.log(error);
      setMessage("Failed to load cart");
    }
  };

  const removeFromCart = async (cartId: number) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/cart/${cartId}`);
      setMessage("Product removed from cart");
      fetchCart();
    } catch (error) {
      console.log(error);
      setMessage("Failed to remove product");
    }
  };

  const placeOrder = async () => {
    try {
      const total = cartItems.reduce(
        (sum, item) => sum + Number(item.price) * item.quantity,
        0
      );

      await axios.post(`${import.meta.env.VITE_API_URL}/api/orders`, {
        user_id: userId,
        total_amount: total,
      });

      setMessage("Order placed successfully!");
    } catch (error) {
      console.log(error);
      setMessage("Failed to place order");
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="container mt-5">
      <h2 className="section-title">My Cart</h2>

      {message && <div className="alert alert-info">{message}</div>}

      {cartItems.length === 0 ? (
        <div className="alert alert-warning">Cart is Empty</div>
      ) : (
        <div className="row">
          <div className="col-md-8">
            {cartItems.map((item) => (
              <div className="cart-card" key={item.id}>
                <div className="cart-img">
                  {item.image ? (
                    <img
                      src={`${import.meta.env.VITE_API_URL}${item.image}`}
                      alt={item.name}
                      className="cart-product-image"
                    />
                  ) : (
                    "🛍️"
                  )}
                </div>

                <div className="cart-info">
                  <h5>{item.name}</h5>
                  <p>Quantity: {item.quantity}</p>
                  <p className="price">₹{item.price}</p>
                </div>

                <button
                  className="btn btn-danger"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="col-md-4">
            <div className="summary-card">
              <h4>Price Details</h4>
              <hr />
              <p>Total Items: {cartItems.length}</p>
              <h5>Total Amount: ₹{total}</h5>

              <button
                className="btn btn-success w-100 mt-3"
                onClick={placeOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;