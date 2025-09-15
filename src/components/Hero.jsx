export default function Hero() {
  return (
    <section className="bg-gray-900 py-24">
      <div className="container text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white">
          Discover Your World
        </h2>
        <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
          Explore the latest in tech, style, and creativity. Your next favorite thing is here.
        </p>
        <a
          href="#shop"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Explore Now
        </a>
      </div>
    </section>
  );
}