import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedCollections from "../components/FeaturedCollection";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedCollections />
      <ProductGrid />
      <Footer />
    </>
  );
}
