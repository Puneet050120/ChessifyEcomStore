const products = [
    { name: "Oversized Tee", price: "₹799" },
    { name: "Cargo Pants", price: "₹1,299" },
    { name: "Denim Jacket", price: "₹1,999" },
  ];
  
  export default function ProductGrid() {
    return (
      <section className="py-16 bg-white" id="shop">
        <div className="container">
          <h3 className="text-2xl font-semibold mb-8 text-center">
            Trending Now
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((item, idx) => (
              <div
                key={idx}
                className="border rounded-xl p-4 hover:shadow-md transition"
              >
                <div className="aspect-[4/5] bg-gray-200 mb-4 rounded-lg"></div>
                <h4 className="text-lg font-medium">{item.name}</h4>
                <p className="text-sm text-gray-500">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  