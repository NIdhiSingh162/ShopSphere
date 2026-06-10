const db = require("../config/db");

// ADD PRODUCT WITH IMAGE
const addProduct = (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  const category = req.body.category;
  const brand = req.body.brand;
  const stock = req.body.stock;

  const image = req.file ? `/uploads/${req.file.filename}` : "";

  if (!name || !price) {
    return res.status(400).json({
      message: "Name and price are required",
      body: req.body,
      file: req.file
    });
  }

  const sql = `
    INSERT INTO products 
    (name, description, price, category, brand, stock, image)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, description, price, category, brand, stock, image],
    (err, result) => {
      console.log("DB ERROR:", err);
      console.log("DB RESULT:", result);

      if (err) {
        return res.status(500).json({
          message: err.message
        });
      }

      res.status(201).json({
        message: "Product Added Successfully",
        productId: result.insertId,
        image: image
      });
    }
  );
};

// GET ALL PRODUCTS
const getAllProducts = (req, res) => {
  const sql = "SELECT * FROM products ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message
      });
    }

    res.status(200).json(result);
  });
};

// GET SINGLE PRODUCT
const getSingleProduct = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM products WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json(result[0]);
  });
};

// UPDATE PRODUCT WITH IMAGE
const updateProduct = (req, res) => {
  const { id } = req.params;

  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  const category = req.body.category;
  const brand = req.body.brand;
  const stock = req.body.stock;

  const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

  const sql = `
    UPDATE products
    SET name = ?, description = ?, price = ?, category = ?, brand = ?, stock = ?, image = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [name, description, price, category, brand, stock, image, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Product not found"
        });
      }

      res.status(200).json({
        message: "Product Updated Successfully"
      });
    }
  );
};

// DELETE PRODUCT
const deleteProduct = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM products WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product Deleted Successfully"
    });
  });
};

module.exports = {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct
};