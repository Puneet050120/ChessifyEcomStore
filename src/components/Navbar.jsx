export default function Navbar() {
    return (
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <nav className="container flex items-center justify-between py-4">
          <h1 className="text-xl font-bold">Clothify</h1>
          <ul className="hidden md:flex gap-6 text-sm font-medium">
            <li><a href="#" className="hover:text-gray-700">Home</a></li>
            <li><a href="#" className="hover:text-gray-700">Shop</a></li>
            <li><a href="#" className="hover:text-gray-700">About</a></li>
            <li><a href="#" className="hover:text-gray-700">Contact</a></li>
          </ul>
        </nav>
      </header>
    );
  }
  