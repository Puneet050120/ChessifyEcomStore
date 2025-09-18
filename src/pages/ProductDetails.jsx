import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import Navbar from "../components/Navbar";
import { Plus, Minus } from 'lucide-react';

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(price);
};

export default function ProductDetail() {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  // TODO: Fetch product details from an API
  const product = {
    id: 1,
    name: 'Classic Chess Set',
    price: 2599,
    description: 'A beautiful, classic chess set for players of all levels. Crafted from high-quality wood, this set is built to last and will look great in any home.',
    imageUrl: '/src/assets/react.svg',
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
  };

  return (
    <>
      <Navbar />
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>
            <p className="text-gray-400 mb-6">{product.description}</p>
            <p className="text-3xl font-semibold text-white mb-6">{formatPrice(product.price)}</p>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-md">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="text-gray-400 hover:text-white">
                  <Minus size={20} />
                </button>
                <span className="font-medium text-white text-lg">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="text-gray-400 hover:text-white">
                  <Plus size={20} />
                </button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-grow bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
  