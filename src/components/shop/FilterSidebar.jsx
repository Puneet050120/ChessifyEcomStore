import { useState } from 'react';
import { X } from 'lucide-react';

export default function FilterSidebar({ onFilter, onClear, brands, colors }) {
  const [priceRange, setPriceRange] = useState([0, 150000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);

  const handleBrandChange = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const applyFilters = () => {
    onFilter({
      priceRange,
      brands: selectedBrands,
      rating: selectedRating,
    });
  };

  const clearFilters = () => {
    setPriceRange([0, 150000]);
    setSelectedBrands([]);
    setSelectedRating(0);
    onClear();
  };

  return (
    <div className="bg-gray-900 border-l border-gray-800 p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-white text-lg">Filters</h3>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-semibold mb-2 text-white">Price Range</h4>
        <div className="flex items-center gap-2">
          <input type="number" value={priceRange[0]} onChange={e => setPriceRange([+e.target.value, priceRange[1]])} className="input w-full" />
          <span>-</span>
          <input type="number" value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], +e.target.value])} className="input w-full" />
        </div>
      </div>

      {/* Brands */}
      <div className="mb-6">
        <h4 className="font-semibold mb-2 text-white">Brands</h4>
        <div className="space-y-2">
          {brands.map((brand, index) => (
            <label key={`${brand}-${index}`} className="flex items-center gap-2 text-gray-300">
              <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => handleBrandChange(brand)} className="form-checkbox bg-gray-800 border-gray-700" />
              {brand}
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <h4 className="font-semibold mb-2 text-white">Rating</h4>
        <div className="space-y-2">
          {[4, 3, 2, 1].map(rating => (
            <label key={rating} className="flex items-center gap-2 text-gray-300">
              <input type="radio" name="rating" checked={selectedRating === rating} onChange={() => setSelectedRating(rating)} className="form-radio bg-gray-800 border-gray-700" />
              {rating} stars & up
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={applyFilters} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Apply</button>
        <button onClick={clearFilters} className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-600">Clear</button>
      </div>
    </div>
  );
}