import React, { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(location?.pathname ?? "/");
  console.log("location", location?.pathname, active);
  const headerNav = [
    { title: "Home", link: "/" },
    { title: "Shop", link: "/shop" },
    { title: "About", link: "/about" },
    { title: "Contact", link: "/contact" },
    { title: "Maps", link: "/maps" },
  ];

  return (
    <div>
      <div className="bg-gray-900 text-xs text-gray-300 py-2 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div>Need help? Call us:</div>
          <b className="text-white">+1 213 997 2861</b>
        </div>
        <span>
          🎉 Summer sale <b className="text-yellow-400">Door Buster Deals!</b>{" "}
          <Link
            to="#"
            className="text-purple-400 underline ml-1 hover:text-purple-300 transition-colors"
          >
            Shop Now
          </Link>
        </span>
        <span>🚚 Order online & pickup offline</span>
      </div>

      {/* ── HEADER ── */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-gray-100 sticky top-0 bg-white z-50 shadow-sm">
        <div className="text-xl font-black tracking-widest uppercase text-gray-900">
          THE <span style={{ color: "#7c3aed" }}> VAPORS</span>
        </div>
        <nav className="md:hidden flex gap-7 text-sm font-medium text-gray-600">
          {headerNav?.map((item) => (
            <div
              key={item?.title}
              onClick={() => {
                navigate(item?.link);
                setActive(item?.link);
              }}
              className="nav-link cursor-pointer hover:text-purple-600 transition-colors"
              style={
                active === item?.link
                  ? { color: "#7c3aed", fontWeight: 700 }
                  : {}
              }
            >
              {item?.title}
            </div>
          ))}
        </nav>
        <div className="flex items-center gap-4 text-gray-600">
          {/* search */}
          <button className="hover:text-purple-600 transition-colors hover:scale-110 transform">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          {/* user */}
          <button className="hover:text-purple-600 transition-colors hover:scale-110 transform">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>
          {/* heart */}
          <button className="hover:text-red-500 transition-colors hover:scale-110 transform">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
          {/* cart */}
          <button className="relative hover:text-purple-600 transition-colors hover:scale-110 transform">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span
              className="absolute -top-1.5 -right-1.5 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold"
              style={{ background: "#7c3aed" }}
            >
              3
            </span>
          </button>
        </div>
      </header>
    </div>
  );
}
