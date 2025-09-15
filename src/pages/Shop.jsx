import { useState } from 'react';
import Navbar from '../components/Navbar';
import { shopData } from '../data/shopData';
import ProductCard from '../components/shop/ProductCard';
import FilterSidebar from '../components/shop/FilterSidebar';
import { Filter, X } from 'lucide-react';

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setFilteredProducts(category.products);
  };

  const handleFilter = (filters) => {
    let products = selectedCategory.products;
    
    products = products.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);

    if (filters.brands.length > 0) {
      products = products.filter(p => filters.brands.includes(p.brand));
    }

    if (filters.rating > 0) {
      products = products.filter(p => p.rating >= filters.rating);
    }

    setFilteredProducts(products);
    setIsFilterOpen(false);
  };

  const handleClearFilters = () => {
    setFilteredProducts(selectedCategory.products);
  };

  const currentCategoryData = selectedCategory ? shopData.find(c => c.category === selectedCategory.category) : null;
  const brands = currentCategoryData ? [...new Set(currentCategoryData.products.map(p => p.brand))] : [];
  const colors = currentCategoryData ? [...new Set(currentCategoryData.products.map(p => p.color))] : [];

  if (!selectedCategory) {
    return (
      <>
        <Navbar />
        <div className="container py-16">
          <h1 className="text-3xl font-bold mb-8 text-white text-center">Explore Our Collections</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {shopData.map(cat => (
              <div key={cat.category} onClick={() => handleCategoryClick(cat)} className="relative rounded-lg overflow-hidden h-64 cursor-pointer group">
                <div className="absolute inset-0 bg-gray-800"></div>
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-colors"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-white">{cat.category}</h2>
                    <p className="text-gray-300">{cat.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <button onClick={() => setSelectedCategory(null)} className="text-gray-400 hover:text-white mb-4">
              &larr; Back to Categories
            </button>
            <h1 className="text-3xl font-bold text-white">{selectedCategory.category}</h1>
          </div>
          <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="md:hidden bg-gray-800 p-2 rounded-md">
            <Filter className="text-white" />
          </button>
        </div>

        <div className="flex gap-8">
          <div className={`w-full md:w-1/4 ${isFilterOpen ? 'block' : 'hidden'} md:block`}>
            <FilterSidebar onFilter={handleFilter} onClear={handleClearFilters} brands={brands} colors={colors} />
          </div>
          <div className="w-full md:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-400">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}