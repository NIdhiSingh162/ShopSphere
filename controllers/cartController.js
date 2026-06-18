const db = require("../config/db");

// ADD TO CART
const addToCart = (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  if (!user_id || !product_id || !quantity) {
    return res.status(400).json({
      message: "user_id, product_id and quantity are required",
    });
  }

  const sql = `
    INSERT INTO cart (user_id, product_id, quantity)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [user_id, product_id, quantity], (err, result) => {
    if (err) {
      console.log("Add To Cart DB Error:", err.message);
      return res.status(500).json({ message: err.message });
    }

    res.status(201).json({
      message: "Product Added to Cart",
      cartId: result.insertId,
    });
  });
};

// GET USER CART
const getCart = (req, res) => {
  const { user_id } = req.params;

  const sql = `
    SELECT cart.id, cart.quantity, products.name, products.price, products.image
    FROM cart
    JOIN products ON cart.product_id = products.id
    WHERE cart.user_id = ?
  `;

  db.query(sql, [user_id], (err, result) => {
    if (err) {
      console.log("Get Cart DB Error:", err.message);
      return res.status(500).json({ message: err.message });
    }

    res.status(200).json(result);
  });
};

// REMOVE FROM CART
const removeFromCart = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM cart WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log("Remove Cart DB Error:", err.message);
      return res.status(500).json({ message: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({
      message: "Product Removed from Cart",
    });
  });
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
};