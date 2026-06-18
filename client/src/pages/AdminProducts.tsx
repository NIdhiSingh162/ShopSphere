import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("${import.meta.env.VITE_API_URL}/api/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
      alert("Product Deleted Successfully");
      fetchProducts();
    } catch (error) {
      console.log(error);
      alert("Error deleting product");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Manage Products</h1>

      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="admin-product-card">
              <img
                src={`${import.meta.env.VITE_API_URL}/uploads/${product.image}`}
                alt={product.name}
                className="admin-product-image"
              />

              <h5>{product.name}</h5>
              <p>{product.description}</p>
              <p>
                <strong>₹{product.price}</strong>
              </p>
              <p>{product.brand}</p>

              <button
                className="btn btn-primary w-100 mb-2"
                onClick={() => navigate(`/admin/edit-product/${product.id}`)}
              >
                Edit Product
              </button>

              <button
                className="btn btn-danger w-100"
                onClick={() => deleteProduct(product.id)}
              >
                Delete Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;