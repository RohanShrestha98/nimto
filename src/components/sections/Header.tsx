import { Link } from "react-router-dom";
import { Search, User, Heart, ShoppingCart, Menu } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "HOME", href: "/" },
    { label: "ABOUT", href: "/#about" },
    { label: "SHOP", href: "/#shop" },
    { label: "BLOGS", href: "/#blogs" },
    { label: "PAGES", href: "/#pages" },
    { label: "CONTACT", href: "/#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wider text-primary"
        >
          SHOPLITE<span className="text-secondary">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className=" flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-sm font-semibold text-gray-600 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-5">
          <button
            className="text-gray-600 hover:text-primary transition-colors"
            onClick={() => {}}
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            className="text-gray-600 hover:text-primary transition-colors hidden sm:block"
            onClick={() => {}}
          >
            <User className="w-5 h-5" />
          </button>
          <button
            className="text-gray-600 hover:text-primary transition-colors hidden sm:block"
            onClick={() => {}}
          >
            <Heart className="w-5 h-5" />
          </button>
          <button
            className="text-gray-600 hover:text-primary transition-colors relative"
            onClick={() => {}}
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              3
            </span>
          </button>
          <button
            className="text-gray-600 hover:text-primary transition-colors md:hidden ml-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 py-4">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-semibold text-gray-600 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
