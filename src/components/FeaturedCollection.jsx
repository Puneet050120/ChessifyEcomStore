export default function FeaturedCollections() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container text-center">
        <h3 className="text-3xl font-bold mb-10 text-white">Shop by Category</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {["Gadgets", "Gaming", "Style", "Home", "Books"].map((label) => (
            <div key={label} className="bg-gray-800 p-6 rounded-xl transform hover:scale-105 transition-transform cursor-pointer">
              <h4 className="text-xl font-semibold text-white">{label}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}