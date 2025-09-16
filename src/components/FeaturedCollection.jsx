import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/productService';

export default function FeaturedCollections() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="py-20 bg-gray-900">
      <div className="container text-center">
        <h3 className="text-3xl font-bold mb-10 text-white">Shop by Category</h3>
        <div className="flex flex-wrap justify-center gap-6">
          {categories.map((category) => (
            <Link to={`/shop?category=${category.name}`} key={category.id}>
              <div className="bg-gray-800 p-6 rounded-xl transform hover:scale-105 transition-transform cursor-pointer">
                <h4 className="text-xl font-semibold text-white">{category.name}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}