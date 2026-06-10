import { Link, useNavigate } from "react-router-dom";

interface NavbarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const Navbar = ({ searchTerm, setSearchTerm }: NavbarProps) => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    navigate("/products");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="shop-navbar d-flex align-items-center justify-content-between flex-wrap">
      <Link to="/" className="logo">
        Shop<span>Sphere</span>
      </Link>

      <input
        type="text"
        className="form-control search-box"
        placeholder="Search for products, brands and more"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />

      <div className="d-flex align-items-center gap-3">
        <Link className="nav-link-custom" to="/">
          Home
        </Link>

        <Link className="nav-link-custom" to="/products">
          Products
        </Link>

        <Link className="nav-link-custom" to="/cart">
          Cart
        </Link>

        <Link className="nav-link-custom" to="/orders">
          Orders
        </Link>

        {user?.role === "admin" && (
          <Link className="nav-link-custom" to="/admin">
            Admin
          </Link>
        )}

        {user ? (
          <>
            <span className="user-name">
              Hi, {user.name}
            </span>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <Link className="nav-link-custom" to="/login">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;