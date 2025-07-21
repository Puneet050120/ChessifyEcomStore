export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white py-8 mt-10">
        <div className="container text-center text-sm">
          &copy; {new Date().getFullYear()} Clothify. All rights reserved.
        </div>
      </footer>
    );
  }
  