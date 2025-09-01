import Navbar from "../components/Navbar";

export default function Checkout() {
    return (
      <>
        <Navbar />
        <div className="container py-16">
          <h1 className="text-3xl font-bold mb-4">Checkout</h1>
          <p className="text-gray-600">Fill in your details to place the order.</p>
        </div>
      </>
    );
  }
  