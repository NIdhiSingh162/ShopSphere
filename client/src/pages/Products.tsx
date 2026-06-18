import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";

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

interface ProductsProps {
  searchTerm: string;
}

const Products = ({ searchTerm }: ProductsProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [message, setMessage] = useState<string>("");

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("${import.meta.env.VITE_API_URL}/api/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
      setMessage("Failed to load products");
    }
  };

  const addToCart = async (productId: number) => {
    try {
      await axios.post("${import.meta.env.VITE_API_URL}/api/cart", {
        user_id: 1,
        product_id: productId,
        quantity: 1,
      });

      setMessage("Product added to cart successfully!");
    } catch (error) {
      console.log(error);
      setMessage("Failed to add product to cart");
    }
  };

  const filteredProducts = products.filter((product) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      product.name.toLowerCase().includes(search) ||
      product.brand.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search);

    const matchesCategory =
      !category ||
      product.category.toLowerCase() === category.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container">
      <h2 className="section-title">
        {category ? `${category} Products` : "Featured Products"}
      </h2>

      {message && <div className="alert alert-info">{message}</div>}

      {filteredProducts.length === 0 ? (
        <div className="alert alert-warning">No products found</div>
      ) : (
        <div className="row g-4">
          {filteredProducts.map((product) => (
            <div className="col-md-3" key={product.id}>
              <div className="product-card">
                <img
                  src={`${import.meta.env.VITE_API_URL}/uploads/${product.image}`}
                  alt={product.name}
                  className="product-image"
                />

                <h5 className="mt-3">{product.name}</h5>
                <p className="text-muted">{product.category}</p>
                <p>{product.description}</p>
                <p className="price">₹{product.price}</p>

                <Link
                  to={`/products/${product.id}`}
                  className="btn btn-outline-dark w-100 mb-2"
                >
                  View Details
                </Link>

                <button
                  className="btn btn-warning w-100"
                  onClick={() => addToCart(product.id)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;