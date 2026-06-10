import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Order {
  id: number;
  user_id: number;
  total_amount: string;
  status: string;
  created_at: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });

  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchStats();
    fetchRecentOrders();
  }, []);

  const fetchStats = async () => {
    const res = await axios.get("http://10.52.129.168:5000/api/admin/stats");
    setStats(res.data);
  };

  const fetchRecentOrders = async () => {
    const res = await axios.get("http://10.52.129.168:5000/api/orders");
    setRecentOrders(res.data.slice(0, 5));
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
      <h1 className="mb-4">Admin Dashboard</h1>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card shadow text-center p-3">
            <h6>Total Products</h6>
            <h2>{stats.totalProducts}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center p-3">
            <h6>Total Orders</h6>
            <h2>{stats.totalOrders}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center p-3">
            <h6>Total Users</h6>
            <h2>{stats.totalUsers}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center p-3">
            <h6>Total Revenue</h6>
            <h2>₹{stats.totalRevenue}</h2>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <Link to="/admin/add-product" className="admin-dashboard-card">
            <h3>➕</h3>
            <h5>Add Product</h5>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/admin/products" className="admin-dashboard-card">
            <h3>📦</h3>
            <h5>Manage Products</h5>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/admin/orders" className="admin-dashboard-card">
            <h3>🧾</h3>
            <h5>Manage Orders</h5>
          </Link>
        </div>
      </div>

      <div className="recent-orders-card">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Recent Orders</h3>
          <Link to="/admin/orders" className="btn btn-dark btn-sm">
            View All
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p>No recent orders found.</p>
        ) : (
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Order ID</th>
                <th>User ID</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.user_id}</td>
                  <td>₹{order.total_amount}</td>
                  <td>
                    <span className={getStatusClass(order.status)}>
                      {order.status}
                    </span>
                  </td>
                  <td>{new Date(order.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;