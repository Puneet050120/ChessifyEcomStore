import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(price);
};

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col group transition-all duration-300 hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-600/20">
      <div className="aspect-[4/5] bg-gray-800 mb-4 rounded-lg overflow-hidden">
        {/* Placeholder for image */}
      </div>
      <div className="flex-grow">
        <h4 className="text-lg font-medium text-white truncate">{product.name}</h4>
        <p className="text-sm text-gray-400">{formatPrice(product.price)}</p>
      </div>
      <button 
        onClick={() => dispatch(addToCart(product))}
        className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        Add to Cart
      </button>
    </div>
  );
}