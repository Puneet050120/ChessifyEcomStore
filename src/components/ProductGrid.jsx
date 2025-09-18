import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { useState, useEffect } from 'react';
import { getProducts } from '../services/productService';

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  export default function ProductGrid() {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const productsData = await getProducts();
          setProducts(productsData.slice(0, 6));
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      fetchProducts();
    }, []);

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
                  onClick={() => dispatch(addToCart({ product: item, quantity: 1 }))}
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