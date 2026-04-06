import { Menu, Search, Flame, Heart, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MainNavbar = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-slate-800 text-white">
      <div className="max-w-[1200px] mx-auto flex items-center py-4 gap-4">
        {/* Hamburger */}
        <div className="space-y-1 cursor-pointer">
          <Menu />
        </div>

        {/* Logo */}
        <img src="/img/logo.png" className="w-32 ml-4" />

        {/* Search */}
        <div className="flex flex-1 max-w-xl ml-10">
          <input
            placeholder="Search for products..."
            className="w-full h-10 px-4 rounded-l-full text-sm text-black outline-none"
          />
          <button className="bg-indigo-700  px-5 rounded-r-full">
            <Search size={18} />
          </button>
        </div>

        {/* Right icons */}
        <div className="ml-auto flex items-center gap-6">
          <div className="flex items-center gap-1 hover:text-indigo-400">
            <Flame size={20} /> Insider
          </div>
          <div className="hover:text-indigo-400">
            <Heart size={18} />
          </div>
          <div
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 hover:text-indigo-400"
          >
            <ShoppingCart size={18} /> <span className="block">Rs 0.00</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainNavbar;
