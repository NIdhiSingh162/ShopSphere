import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    navigate(`/products?category=${category}`);
  };

  return (
    <>
      <div className="container">
        <div className="hero">
          <h1>Biggest Shopping Deals</h1>
          <p>
            Explore mobiles, fashion, electronics and lifestyle products at best prices.
          </p>
          <Link to="/products">
            <button className="hero-btn">Shop Now</button>
          </Link>
        </div>

        <h2 className="section-title">Shop by Category</h2>

        <div className="row g-4">
          <div className="col-md-3">
            <div
              className="category-card"
              onClick={() => handleCategoryClick("Mobile")}
            >
              <div className="category-icon">📱</div>
              <h5>Mobiles</h5>
            </div>
          </div>

          <div className="col-md-3">
            <div
              className="category-card"
              onClick={() => handleCategoryClick("Fashion")}
            >
              <div className="category-icon">👗</div>
              <h5>Fashion</h5>
            </div>
          </div>

          <div className="col-md-3">
            <div
              className="category-card"
              onClick={() => handleCategoryClick("Electronics")}
            >
              <div className="category-icon">💻</div>
              <h5>Electronics</h5>
            </div>
          </div>

          <div className="col-md-3">
            <div
              className="category-card"
              onClick={() => handleCategoryClick("Home")}
            >
              <div className="category-icon">🏠</div>
              <h5>Home</h5>
            </div>
          </div>
        </div>

        <div className="offer-banner">
          <h2>Festival Sale is Live!</h2>
          <p>Get up to 70% off on top products.</p>
        </div>
      </div>

      <footer className="footer">
        <h4>ShopSphere</h4>
        <p>Modern Full Stack E-Commerce Platform</p>
      </footer>
    </>
  );
};

export default Home;