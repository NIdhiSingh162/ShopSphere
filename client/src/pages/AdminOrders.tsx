import { useEffect, useState } from "react";
import axios from "axios";

interface Order {
  id: number;
  user_id: number;
  total_amount: string;
  status: string;
  created_at: string;
}

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders`);
    setOrders(res.data);
  };

  const updateStatus = async (id: number, status: string) => {
    await axios.put(`${import.meta.env.VITE_API_URL}/api/orders/${id}`, {
      status,
    });

    alert("Order status updated");
    fetchOrders();
  };

  const getStatusClass = (status: string) => {
    if (status === "Pending") return "status-badge status-pending";
    if (status === "Processing") return "status-badge status-processing";
    if (status === "Shipped") return "status-badge status-shipped";
    if (status === "Delivered") return "status-badge status-delivered";
    return "status-badge";
  };

  return (
    <div className="container mt-5">
      <h1>Manage Orders</h1>

      <table className="table table-bordered table-hover mt-4">
        <thead className="table-dark">
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Change Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{order.user_id}</td>
              <td>₹{order.total_amount}</td>

              <td>
                <span className={getStatusClass(order.status)}>
                  {order.status}
                </span>
              </td>

              <td>
                <select
                  className="form-select"
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                >
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>
              </td>

              <td>{new Date(order.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;