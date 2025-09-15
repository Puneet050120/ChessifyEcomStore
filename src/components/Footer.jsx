export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-8 mt-10 border-t border-gray-800">
      <div className="container text-center text-sm">
        &copy; {new Date().getFullYear()} Zenith. All rights reserved.
      </div>
    </footer>
  );
}