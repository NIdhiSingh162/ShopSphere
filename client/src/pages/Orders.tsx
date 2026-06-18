import { useEffect, useState } from "react";
import axios from "axios";

interface Order {
  id: number;
  total_amount: string;
  status: string;
  created_at: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "${import.meta.env.VITE_API_URL}/api/orders/1"
      );

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="section-title">My Orders</h2>

      {orders.length === 0 ? (
        <div className="alert alert-warning">
          No Orders Found
        </div>
      ) : (
        <div className="row">
          {orders.map((order) => (
            <div
              key={order.id}
              className="col-md-6 mb-4"
            >
              <div className="summary-card">
                <h5>Order #{order.id}</h5>

                <p>
                  Amount: ₹{order.total_amount}
                </p>

                <p>
                  Status:
                  <span className="text-success ms-2">
                    {order.status}
                  </span>
                </p>

                <p>
                  Date:
                  {new Date(
                    order.created_at
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;