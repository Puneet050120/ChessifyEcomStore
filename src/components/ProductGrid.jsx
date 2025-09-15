import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const products = [
    { id: 1, name: "Wireless Earbuds", price: 2499 },
    { id: 2, name: "Mechanical Keyboard", price: 7999 },
    { id: 3, name: "Graphic Hoodie", price: 1499 },
    { id: 4, name: "Smart Water Bottle", price: 3999 },
    { id: 5, name: "Sci-Fi Novel", price: 699 },
    { id: 6, name: "Desk Lamp", price: 1999 },
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  export default function ProductGrid() {
    const dispatch = useDispatch();

    return (
      <section className="py-20 bg-gray-950" id="shop">
        <div className="container">
          <h3 className="text-3xl font-bold mb-10 text-center text-white">
            Trending Now
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((item) => (
              <div
                key={item.id}
                className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col group transition-all duration-300 hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-600/20"
              >
                <div className="aspect-[4/5] bg-gray-800 mb-4 rounded-lg overflow-hidden">
                  {/* Placeholder for image */}
                </div>
                <div className="flex-grow">
                  <h4 className="text-lg font-medium text-white truncate">{item.name}</h4>
                  <p className="text-sm text-gray-400">{formatPrice(item.price)}</p>
                </div>
                <button 
                  onClick={() => dispatch(addToCart(item))}
                  className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }