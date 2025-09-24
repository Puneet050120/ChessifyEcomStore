import { useState } from "react";
import { Menu, X, ShoppingCart, Search as SearchIcon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { clearCart } from "../store/cartSlice";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?searchTerm=${searchTerm}`);
      setSearchTerm("");
      setIsMenuOpen(false); // Close mobile menu after search
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-lg border-b border-gray-800">
      <div className="container py-4">
        {/* Top Row: Logo, Desktop Nav, Mobile Icons */}
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-tight text-white">Zenith</Link>
          
          {/* Desktop Navigation and Search */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <ul className="flex items-center gap-6">
              <li><Link to="/" className="text-gray-300 hover:text-white transition">Home</Link></li>
              <li><Link to="/shop" className="text-gray-300 hover:text-white transition">Shop</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition">About</Link></li>
              {isAuthenticated && <li><Link to="/my-orders" className="text-gray-300 hover:text-white transition">My Orders</Link></li>}
            </ul>
            <form onSubmit={handleSearch} className="flex items-center bg-gray-800 rounded-full px-4 py-2 border border-gray-700 focus-within:border-blue-600 transition-all duration-300 max-w-xs ml-6">
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent text-white outline-none w-full text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="text-gray-400 hover:text-white transition">
                <SearchIcon size={20} />
              </button>
            </form>
            <Link to="/cart" className="relative text-gray-300 hover:text-white transition">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                  {totalItems}
                </span>
              )}
            </Link>
            {isAuthenticated ? (
              <button onClick={handleLogout} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                Logout
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-gray-300 hover:text-white transition py-2">Login</Link>
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Icons and Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <Link to="/cart" className="relative text-white">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                  {totalItems}
                </span>
              )}
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (separate row) */}
        <div className="md:hidden mt-4">
          <form onSubmit={handleSearch} className="flex items-center bg-gray-800 rounded-full px-4 py-2 border border-gray-700 focus-within:border-blue-600 transition-all duration-300 w-full">
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent text-white outline-none w-full text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="text-gray-400 hover:text-white transition">
              <SearchIcon size={20} />
            </button>
          </form>
        </div>

        {/* Mobile Navigation Links (only when menu is open) */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-950/95 pb-4 mt-4">
            <ul className="flex flex-col items-center gap-4 py-4">
              <li><Link to="/" className="text-gray-300 hover:text-white transition">Home</Link></li>
              <li><Link to="/shop" className="text-gray-300 hover:text-white transition">Shop</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition">About</Link></li>
              {isAuthenticated && <li><Link to="/my-orders" className="text-gray-300 hover:text-white transition">My Orders</Link></li>}
              {isAuthenticated ? (
                <li>
                  <button onClick={handleLogout} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li><Link to="/login" className="text-gray-300 hover:text-white transition">Login</Link></li>
                  <li>
                    <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}