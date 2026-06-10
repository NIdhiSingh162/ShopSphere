const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload");

const {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

router.post("/", upload.single("image"), addProduct);

router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;