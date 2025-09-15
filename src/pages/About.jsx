import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  const team = [
    { name: 'Abhishek Solanki', role: 'Founder & CEO' },
    { name: 'Puneet Kosal', role: 'Co-Founder & Developer' },
    { name: 'Rishabh Rajput', role: 'Co-Founder & Developer' },
  ];

  return (
    <>
      <Navbar />
      <div className="bg-gray-950 text-white">
        {/* Hero Section */}
        <div className="container text-center py-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Beyond the Checkout</h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            We are Zenith, a curated marketplace for the modern world. We believe in quality, innovation, and the power of great products to enhance your life.
          </p>
        </div>

        {/* Our Mission Section */}
        <div className="py-20 bg-gray-900">
          <div className="container grid md:grid-cols-2 gap-12 items-center">
            <div className="h-80 bg-gray-800 rounded-lg"></div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-400 leading-relaxed">
                Our mission is to bring the world's best products to your fingertips. We tirelessly search for items that are not only beautiful and functional but also built to last. At Zenith, every product has a story and a purpose. We're here to connect you with things you'll love.
              </p>
            </div>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="container py-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-xl font-semibold mb-2">Quality Curation</h3>
              <p className="text-gray-400">Every item in our store is hand-picked and vetted for quality and design.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Customer Obsession</h3>
              <p className="text-gray-400">We are committed to providing an exceptional experience, from browsing to unboxing.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Constant Innovation</h3>
              <p className="text-gray-400">We are always looking for new ways to improve our platform and your shopping experience.</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="py-20 bg-gray-900">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 text-center">Meet the Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {team.map(member => (
                <div key={member.name} className="text-center">
                  <div className="w-32 h-32 bg-gray-800 rounded-full mx-auto mb-4"></div>
                  <h4 className="font-semibold text-lg">{member.name}</h4>
                  <p className="text-gray-400">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}