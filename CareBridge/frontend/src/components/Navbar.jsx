import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { Link } from "react-router-dom";
import Logo from "./Logo";
 
function Navbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
 
  return (
    <nav
      className={`sticky top-0 z-50 shadow-sm ${
        darkMode
          ? "bg-slate-900 text-white"
          : "bg-white text-black"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Logo imageClassName="h-20" />
 
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="hover:text-green-600">
            Home
          </a>
 
          <a href="#features" className="hover:text-green-600">
            Features
          </a>
 
          <a href="#about" className="hover:text-green-600">
            About
          </a>
        </div>
 
        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
 
          <Link
            to="/login"
            className="border px-4 py-2 rounded-lg"
          >
            Login
          </Link>
 
          <Link
            to="/signup"
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Sign Up
          </Link>
        </div>
 
        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
 
      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className={`md:hidden px-6 pb-4 ${
            darkMode
              ? "bg-slate-900 text-white"
              : "bg-white text-black"
          }`}
        >
          <div className="flex flex-col gap-4">
            <a href="#" onClick={() => setMenuOpen(false)}>
              Home
            </a>
 
            <a
              href="#features"
              onClick={() => setMenuOpen(false)}
            >
              Features
            </a>
 
            <a
              href="#about"
              onClick={() => setMenuOpen(false)}
            >
              About
            </a>
 
            <ThemeToggle
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
 
            <Link
              to="/login"
              className="border px-4 py-2 rounded-lg text-center"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
 
            <Link
              to="/signup"
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-center"
              onClick={() => setMenuOpen(false)}
            >
            Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
 
export default Navbar;