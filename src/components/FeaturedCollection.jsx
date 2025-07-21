export default function FeaturedCollections() {
    return (
      <section className="py-16">
        <div className="container text-center">
          <h3 className="text-2xl font-semibold mb-8">Featured Collections</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {["Streetwear", "Casual", "Minimal"].map((label) => (
              <div key={label} className="bg-gray-200 p-6 rounded-lg">
                <h4 className="text-xl font-semibold">{label}</h4>
                <p className="text-sm text-gray-600 mt-2">
                  Explore our curated picks in {label} style.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  