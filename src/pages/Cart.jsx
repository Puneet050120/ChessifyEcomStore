import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../store/cartSlice";
import { Link } from "react-router-dom";
import { Plus, Minus, Trash2 } from "lucide-react";

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(price);
};

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingCost = 40;
  const grandTotal = cartTotal + shippingCost;

  const handleUpdateQuantity = (productId, quantity) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <div className="container py-16 text-center">
          <h1 className="text-3xl font-bold mb-4 text-white">Your Cart is Empty</h1>
          <p className="text-gray-400 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/shop" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
            Continue Shopping
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container py-16">
        <h1 className="text-3xl font-bold mb-8 text-white">Your Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between bg-gray-900 p-4 rounded-lg border border-gray-800">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gray-800 rounded-md">
                    {/* Placeholder for image */}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{item.name}</h3>
                    <p className="text-sm text-gray-400">{formatPrice(item.price)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-gray-800 px-2 py-1 rounded-md">
                    <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} className="text-gray-400 hover:text-white">
                      <Minus size={16} />
                    </button>
                    <span className="font-medium text-white">{item.quantity}</span>
                    <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} className="text-gray-400 hover:text-white">
                      <Plus size={16} />
                    </button>
                  </div>
                  <p className="font-semibold text-white w-24 text-right">{formatPrice(item.price * item.quantity)}</p>
                  <button onClick={() => handleRemoveFromCart(item.id)} className="text-gray-500 hover:text-red-500">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 h-fit">
            <h2 className="text-xl font-bold mb-4 text-white">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal</span>
                <span className="font-medium text-white">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Shipping</span>
                <span className="font-medium text-white">{formatPrice(shippingCost)}</span>
              </div>
              <div className="border-t border-gray-800 my-2"></div>
              <div className="flex justify-between text-lg">
                <span className="font-bold text-white">Total</span>
                <span className="font-bold text-white">{formatPrice(grandTotal)}</span>
              </div>
            </div>
            <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700">
              Proceed to Checkout
            </button>
          </div>

        </div>
      </div>
    </>
  );
}