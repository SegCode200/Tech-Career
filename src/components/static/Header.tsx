import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white max-md:shadow-md fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[70px] flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-semibold uppercase text-black">CareerTrait</div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-black font-medium">
          <a href="/" className="hover:text-gray-500">Home</a>
          <a href="/#" className="hover:text-gray-500">About</a>
          <a href="/#" className="hover:text-gray-500">Contact</a>
        </nav>

        {/* Action Button (Always Visible) */}
        <div className="hidden md:flex">
           <Link to={"/instructions"}>
          <div

            className="bg-gradient-to-r from-[#605CFF] to-[#8B59FF] text-white px-4 py-2 rounded-3xl font-medium hover:opacity-90 transition"
          >
            Get Started
          </div>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
            {menuOpen ? (
              <XMarkIcon className="w-6 h-6 text-black" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-black" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow px-6 pt-4 pb-6 space-y-4 text-black font-medium">
          <a href="/" className="block hover:text-gray-500">Home</a>
          <a href="/about" className="block hover:text-gray-500">About</a>
          <a href="/contact" className="block hover:text-gray-500">Contact</a>
          <a
            href="/instructions"
            className="inline-block mt-2 bg-gradient-to-r from-[#605CFF] to-[#8B59FF] text-white px-4 py-2 rounded-3xl font-medium"
          >
            Get Started
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
