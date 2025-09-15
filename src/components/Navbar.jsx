import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/authSlice";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-lg border-b border-gray-800">
      <nav className="container flex items-center justify-between py-4">
        <Link to="/" className="text-2xl font-bold tracking-tight text-white">Zenith</Link>
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
          <li><Link to="/" className="text-gray-300 hover:text-white transition">Home</Link></li>
          <li><Link to="/shop" className="text-gray-300 hover:text-white transition">Shop</Link></li>
          <li><Link to="/about" className="text-gray-300 hover:text-white transition">About</Link></li>
          <li>
            <Link to="/cart" className="relative text-gray-300 hover:text-white transition">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </li>
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

        {/* Mobile Menu Button */}
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
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-950/95">
          <ul className="flex flex-col items-center gap-4 py-4">
            <li><Link to="/" className="text-gray-300 hover:text-white transition">Home</Link></li>
            <li><Link to="/shop" className="text-gray-300 hover:text-white transition">Shop</Link></li>
            <li><Link to="/about" className="text-gray-300 hover:text-white transition">About</Link></li>
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
    </header>
  );
}