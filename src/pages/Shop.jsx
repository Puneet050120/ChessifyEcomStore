import Navbar from "../components/Navbar";

export default function Shop() {
    return (
      <>
        <Navbar />
        <div className="container py-16">
          <h1 className="text-3xl font-bold mb-4">Shop</h1>
          <p className="text-gray-600">Explore all products and filters here.</p>
        </div>
      </>
    );
  }
  