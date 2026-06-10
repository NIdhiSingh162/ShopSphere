const db = require("../config/db");

// PLACE ORDER
const placeOrder = (req, res) => {
  const { user_id, total_amount } = req.body;

  const sql = `
    INSERT INTO orders (user_id, total_amount)
    VALUES (?, ?)
  `;

  db.query(sql, [user_id, total_amount], (err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(201).json({
      message: "Order Placed Successfully",
      orderId: result.insertId
    });
  });
};

// GET USER ORDERS
const getUserOrders = (req, res) => {
  const { user_id } = req.params;

  const sql = `
    SELECT * FROM orders
    WHERE user_id = ?
    ORDER BY id DESC
  `;

  db.query(sql, [user_id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(200).json(result);
  });
};

// GET ALL ORDERS
const getAllOrders = (req, res) => {
  const sql = `
    SELECT * FROM orders
    ORDER BY id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(200).json(result);
  });
};

// UPDATE ORDER STATUS
const updateOrderStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const sql = "UPDATE orders SET status = ? WHERE id = ?";

  db.query(sql, [status, id], (err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(200).json({
      message: "Order Status Updated Successfully"
    });
  });
};

module.exports = {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
};