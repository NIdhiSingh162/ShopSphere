import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  brand: string;
  stock: number;
  image: string;
}

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async () => {
    if (!product) return;

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/cart`, {
        user_id: 1,
        product_id: product.id,
        quantity: 1,
      });

      setMessage("Product added to cart successfully!");
    } catch (error) {
      console.log(error);
      setMessage("Failed to add product to cart");
    }
  };

  if (!product) {
    return <h3 className="m-5">Loading...</h3>;
  }

  return (
    <div className="container mt-5">
      {message && <div className="alert alert-success">{message}</div>}

      <div className="product-detail-card">
        <div className="detail-image">
          {product.image ? (
            <img
              src={`${import.meta.env.VITE_API_URL}${product.image}`}
              alt={product.name}
              className="detail-product-img"
            />
          ) : (
            "🛍️"
          )}
        </div>

        <div className="product-detail-info">
          <h2>{product.name}</h2>
          <p className="text-muted">{product.category}</p>
          <h3 className="price">₹{product.price}</h3>
          <p>{product.description}</p>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Stock:</strong> {product.stock}</p>

          <button className="btn btn-warning me-3" onClick={addToCart}>
            Add To Cart
          </button>

          <button className="btn btn-success">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;