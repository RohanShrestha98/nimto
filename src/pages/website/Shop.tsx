import { useState, useEffect, useRef, useMemo } from "react";

/* ─── STYLES ─── */
const injectStyles = () => `
  @keyframes fadeUp    { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeLeft  { from{opacity:0;transform:translateX(-34px)} to{opacity:1;transform:translateX(0)} }
  @keyframes fadeRight { from{opacity:0;transform:translateX(34px)} to{opacity:1;transform:translateX(0)} }
  @keyframes popIn     { 0%{transform:scale(.55);opacity:0} 65%{transform:scale(1.12)} 100%{transform:scale(1);opacity:1} }
  @keyframes drawerIn  { from{transform:translateX(100%)} to{transform:translateX(0)} }
  @keyframes drawerOut { from{transform:translateX(0)} to{transform:translateX(100%)} }
  @keyframes sideIn    { from{transform:translateX(-100%)} to{transform:translateX(0)} }
  @keyframes sideOut   { from{transform:translateX(0)} to{transform:translateX(-100%)} }
  @keyframes overlayIn { from{opacity:0} to{opacity:1} }
  @keyframes badgePop  { 0%{transform:scale(1)} 40%{transform:scale(1.65)} 100%{transform:scale(1)} }
  @keyframes spin      { to{transform:rotate(360deg)} }
  @keyframes shimmer   { 0%{background-position:-700px 0} 100%{background-position:700px 0} }
  @keyframes toastIn   { from{opacity:0;transform:translateX(-50%) translateY(20px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }

  .anim-fadeUp    { animation:fadeUp   .5s ease both }
  .anim-fadeLeft  { animation:fadeLeft  .55s ease both }
  .anim-fadeRight { animation:fadeRight .55s ease both }
  .anim-popIn     { animation:popIn .38s ease both }
  .anim-drawerIn  { animation:drawerIn  .38s cubic-bezier(.22,.61,.36,1) both }
  .anim-drawerOut { animation:drawerOut .3s cubic-bezier(.55,0,1,.45) both }
  .anim-sideIn    { animation:sideIn   .36s cubic-bezier(.22,.61,.36,1) both }
  .anim-sideOut   { animation:sideOut  .28s cubic-bezier(.55,0,1,.45) both }
  .anim-overlayIn { animation:overlayIn .28s ease both }
  .anim-spin      { animation:spin 1s linear infinite }
  .anim-toast     { animation:toastIn .35s ease both }
  .badge-pop      { animation:badgePop .38s ease }

  .d1{animation-delay:.06s} .d2{animation-delay:.12s} .d3{animation-delay:.18s}
  .d4{animation-delay:.24s} .d5{animation-delay:.30s} .d6{animation-delay:.36s}

  .card-lift { transition:transform .26s ease,box-shadow .26s ease }
  .card-lift:hover { transform:translateY(-6px); box-shadow:0 18px 46px rgba(0,0,0,.11) }

  .nav-link { position:relative }
  .nav-link::after { content:'';position:absolute;bottom:-2px;left:0;width:0;height:2px;background:#7c3aed;transition:width .3s }
  .nav-link:hover::after { width:100% }

  .shimmer-box {
    background: linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%);
    background-size:700px 100%;
    animation: shimmer 1.4s infinite;
  }

  .filter-check input:checked + span { background:#7c3aed; border-color:#7c3aed; }
  .filter-check input:checked + span::after { content:'✓'; color:white; font-size:10px; font-weight:900; }

  .range-input { -webkit-appearance:none; appearance:none; height:4px; background:#e5e7eb; border-radius:4px; outline:none; }
  .range-input::-webkit-slider-thumb { -webkit-appearance:none; width:18px; height:18px; border-radius:50%; background:#7c3aed; cursor:pointer; border:3px solid white; box-shadow:0 1px 6px rgba(124,58,237,.4); }

  .drawer-scroll::-webkit-scrollbar { width:4px }
  .drawer-scroll::-webkit-scrollbar-track { background:#f3f4f6 }
  .drawer-scroll::-webkit-scrollbar-thumb { background:#d1d5db; border-radius:4px }

  .wishlist-btn { transition:transform .2s ease, color .2s ease }
  .wishlist-btn:hover { transform:scale(1.2) }

  .grad-text {
    background:linear-gradient(135deg,#7c3aed,#a855f7,#ec4899);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  }
`;

/* ─── PRODUCT DATA ─── */
const PRODUCTS = [
  // Vapes
  {
    id: 1,
    name: "Fogor Pro 8000",
    brand: "Fogor",
    category: "Vapes",
    price: 16.99,
    oldPrice: 22.99,
    rating: 4.8,
    reviews: 312,
    img: "https://picsum.photos/seed/fogor1/300/300",
    badge: "Best Seller",
    inStock: true,
    puffs: "8000 Puffs",
  },
  {
    id: 2,
    name: "Fogor Ultra Slim",
    brand: "Fogor",
    category: "Vapes",
    price: 14.99,
    oldPrice: null,
    rating: 4.6,
    reviews: 189,
    img: "https://picsum.photos/seed/fogor2/300/300",
    badge: null,
    inStock: true,
    puffs: "6000 Puffs",
  },
  {
    id: 3,
    name: "Viho Turbo 10000",
    brand: "Viho",
    category: "Vapes",
    price: 18.99,
    oldPrice: 24.99,
    rating: 4.9,
    reviews: 540,
    img: "https://picsum.photos/seed/viho1/300/300",
    badge: "New",
    inStock: true,
    puffs: "10000 Puffs",
  },
  {
    id: 4,
    name: "Viho Lite Disposable",
    brand: "Viho",
    category: "Vapes",
    price: 12.99,
    oldPrice: null,
    rating: 4.5,
    reviews: 201,
    img: "https://picsum.photos/seed/viho2/300/300",
    badge: null,
    inStock: true,
    puffs: "5000 Puffs",
  },
  {
    id: 5,
    name: "Lost Mary OS5000",
    brand: "Lost Mary",
    category: "Vapes",
    price: 17.99,
    oldPrice: 21.99,
    rating: 4.8,
    reviews: 723,
    img: "https://picsum.photos/seed/lostmary1/300/300",
    badge: "Best Seller",
    inStock: true,
    puffs: "5000 Puffs",
  },
  {
    id: 6,
    name: "Lost Mary MO5000",
    brand: "Lost Mary",
    category: "Vapes",
    price: 19.99,
    oldPrice: null,
    rating: 4.7,
    reviews: 445,
    img: "https://picsum.photos/seed/lostmary2/300/300",
    badge: "Hot",
    inStock: true,
    puffs: "5000 Puffs",
  },
  {
    id: 7,
    name: "Geek Lite Mesh 7500",
    brand: "Geek Lite",
    category: "Vapes",
    price: 15.99,
    oldPrice: 19.99,
    rating: 4.6,
    reviews: 278,
    img: "https://picsum.photos/seed/geeklist1/300/300",
    badge: "Sale",
    inStock: true,
    puffs: "7500 Puffs",
  },
  {
    id: 8,
    name: "Geek Bar Pulse 15000",
    brand: "Geek Bar",
    category: "Vapes",
    price: 22.99,
    oldPrice: 27.99,
    rating: 4.9,
    reviews: 891,
    img: "https://picsum.photos/seed/geekbar1/300/300",
    badge: "Premium",
    inStock: true,
    puffs: "15000 Puffs",
  },
  {
    id: 9,
    name: "Geek Bar B5000",
    brand: "Geek Bar",
    category: "Vapes",
    price: 13.99,
    oldPrice: null,
    rating: 4.4,
    reviews: 156,
    img: "https://picsum.photos/seed/geekbar2/300/300",
    badge: null,
    inStock: false,
    puffs: "5000 Puffs",
  },
  {
    id: 10,
    name: "Nexa Glow 9000",
    brand: "Nexa",
    category: "Vapes",
    price: 19.49,
    oldPrice: 24.99,
    rating: 4.7,
    reviews: 334,
    img: "https://picsum.photos/seed/nexa1/300/300",
    badge: "New",
    inStock: true,
    puffs: "9000 Puffs",
  },
  {
    id: 11,
    name: "Walar Wave 8000",
    brand: "Walar",
    category: "Vapes",
    price: 16.49,
    oldPrice: 20.99,
    rating: 4.5,
    reviews: 210,
    img: "https://picsum.photos/seed/walar1/300/300",
    badge: null,
    inStock: true,
    puffs: "8000 Puffs",
  },
  {
    id: 12,
    name: "Walar Ocean Max",
    brand: "Walar",
    category: "Vapes",
    price: 18.49,
    oldPrice: null,
    rating: 4.6,
    reviews: 198,
    img: "https://picsum.photos/seed/walar2/300/300",
    badge: "Hot",
    inStock: true,
    puffs: "10000 Puffs",
  },
  // Smoke & Wellness
  {
    id: 13,
    name: "Booster Shot — Mango",
    brand: "Generic",
    category: "Booster Shots",
    price: 8.99,
    oldPrice: null,
    rating: 4.5,
    reviews: 142,
    img: "https://picsum.photos/seed/boost1/300/300",
    badge: null,
    inStock: true,
    puffs: null,
  },
  {
    id: 14,
    name: "Looper Shot 30ml",
    brand: "Generic",
    category: "Looper Shots",
    price: 11.99,
    oldPrice: 14.99,
    rating: 4.6,
    reviews: 98,
    img: "https://picsum.photos/seed/looper1/300/300",
    badge: "Sale",
    inStock: true,
    puffs: null,
  },
  {
    id: 15,
    name: "7-OH Hydroxi 250mg",
    brand: "Generic",
    category: "7-OH",
    price: 24.99,
    oldPrice: 32.99,
    rating: 4.8,
    reviews: 267,
    img: "https://picsum.photos/seed/sevenoh1/300/300",
    badge: "Popular",
    inStock: true,
    puffs: null,
  },
  {
    id: 16,
    name: "7-OH Caps 500mg",
    brand: "Generic",
    category: "7-OH",
    price: 34.99,
    oldPrice: null,
    rating: 4.9,
    reviews: 189,
    img: "https://picsum.photos/seed/sevenoh2/300/300",
    badge: null,
    inStock: true,
    puffs: null,
  },
  {
    id: 17,
    name: "Classic Pre-Roll 5pk",
    brand: "Generic",
    category: "Pre-Rolls",
    price: 15.99,
    oldPrice: 19.99,
    rating: 4.7,
    reviews: 320,
    img: "https://picsum.photos/seed/preroll1/300/300",
    badge: "Sale",
    inStock: true,
    puffs: null,
  },
  {
    id: 18,
    name: "Infused King Pre-Roll",
    brand: "Generic",
    category: "Pre-Rolls",
    price: 22.99,
    oldPrice: null,
    rating: 4.8,
    reviews: 412,
    img: "https://picsum.photos/seed/preroll2/300/300",
    badge: "Premium",
    inStock: true,
    puffs: null,
  },
  {
    id: 19,
    name: "THC-A Flower 3.5g",
    brand: "Generic",
    category: "THC-A",
    price: 39.99,
    oldPrice: 49.99,
    rating: 4.9,
    reviews: 567,
    img: "https://picsum.photos/seed/thca1/300/300",
    badge: "Best Seller",
    inStock: true,
    puffs: null,
  },
  {
    id: 20,
    name: "THC-A Diamonds 1g",
    brand: "Generic",
    category: "THC-A",
    price: 44.99,
    oldPrice: null,
    rating: 4.8,
    reviews: 301,
    img: "https://picsum.photos/seed/thca2/300/300",
    badge: "Hot",
    inStock: true,
    puffs: null,
  },
  {
    id: 21,
    name: "THC-A Vape Cart 1g",
    brand: "Generic",
    category: "THC-A",
    price: 29.99,
    oldPrice: 36.99,
    rating: 4.7,
    reviews: 234,
    img: "https://picsum.photos/seed/thca3/300/300",
    badge: null,
    inStock: false,
    puffs: null,
  },
  {
    id: 22,
    name: "THC-P Gummies 25mg",
    brand: "Generic",
    category: "THC-P",
    price: 27.99,
    oldPrice: 34.99,
    rating: 4.8,
    reviews: 389,
    img: "https://picsum.photos/seed/thcp1/300/300",
    badge: "New",
    inStock: true,
    puffs: null,
  },
  {
    id: 23,
    name: "THC-P Cart 1g",
    brand: "Generic",
    category: "THC-P",
    price: 32.99,
    oldPrice: null,
    rating: 4.7,
    reviews: 278,
    img: "https://picsum.photos/seed/thcp2/300/300",
    badge: null,
    inStock: true,
    puffs: null,
  },
  {
    id: 24,
    name: "CBD Hemp Flower 7g",
    brand: "Generic",
    category: "Flowers",
    price: 29.99,
    oldPrice: 39.99,
    rating: 4.6,
    reviews: 445,
    img: "https://picsum.photos/seed/flower1/300/300",
    badge: "Sale",
    inStock: true,
    puffs: null,
  },
  {
    id: 25,
    name: "Exotic Strain 3.5g",
    brand: "Generic",
    category: "Flowers",
    price: 34.99,
    oldPrice: null,
    rating: 4.8,
    reviews: 312,
    img: "https://picsum.photos/seed/flower2/300/300",
    badge: "Limited",
    inStock: true,
    puffs: null,
  },
  {
    id: 26,
    name: "Smok Nord 5 Kit",
    brand: "Smok",
    category: "Devices & Pods",
    price: 44.99,
    oldPrice: 54.99,
    rating: 4.7,
    reviews: 521,
    img: "https://picsum.photos/seed/smok1/300/300",
    badge: "Popular",
    inStock: true,
    puffs: null,
  },
  {
    id: 27,
    name: "Smok RPM Pod System",
    brand: "Smok",
    category: "Devices & Pods",
    price: 29.99,
    oldPrice: null,
    rating: 4.5,
    reviews: 289,
    img: "https://picsum.photos/seed/smok2/300/300",
    badge: null,
    inStock: true,
    puffs: null,
  },
  {
    id: 28,
    name: "Replacement Pod 4pk",
    brand: "Smok",
    category: "Devices & Pods",
    price: 12.99,
    oldPrice: 16.99,
    rating: 4.4,
    reviews: 167,
    img: "https://picsum.photos/seed/smok3/300/300",
    badge: "Sale",
    inStock: true,
    puffs: null,
  },
];

const CATEGORIES = [
  "All",
  "Vapes",
  "Booster Shots",
  "Looper Shots",
  "7-OH",
  "Pre-Rolls",
  "THC-A",
  "THC-P",
  "Flowers",
  "Devices & Pods",
];
const BRANDS = [
  "All Brands",
  "Fogor",
  "Viho",
  "Lost Mary",
  "Geek Lite",
  "Geek Bar",
  "Nexa",
  "Walar",
  "Smok",
];
const SORT_OPTIONS = [
  { val: "featured", label: "Featured" },
  { val: "price-asc", label: "Price: Low to High" },
  { val: "price-desc", label: "Price: High to Low" },
  { val: "rating", label: "Top Rated" },
  { val: "newest", label: "Newest" },
];

const BADGE_COLOR = {
  "Best Seller": "#7c3aed",
  New: "#059669",
  Hot: "#ef4444",
  Sale: "#f59e0b",
  Premium: "#0891b2",
  Popular: "#db2777",
  Limited: "#6366f1",
};
const TAX_RATE = 0.08;

/* ─── helpers ─── */
function useVisible(ref) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setV(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return v;
}

const StarRating = ({ score = 5, small = false }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <svg
        key={i}
        width={small ? 10 : 13}
        height={small ? 10 : 13}
        viewBox="0 0 20 20"
        fill={i <= Math.round(score) ? "#facc15" : "#e5e7eb"}
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

/* ─── CART DRAWER ─── */
function CartDrawer({ open, onClose, items, onQty, onRemove }) {
  const [closing, setClosing] = useState(false);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const close = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 290);
  };
  if (!open && !closing) return null;

  return (
    <div className="fixed inset-0 z-[999] flex justify-end">
      <div
        className="absolute inset-0 anim-overlayIn cursor-pointer"
        style={{ background: "rgba(0,0,0,.45)", backdropFilter: "blur(2px)" }}
        onClick={close}
      />
      <div
        className={`relative flex flex-col bg-white h-full shadow-2xl ${closing ? "anim-drawerOut" : "anim-drawerIn"}`}
        style={{ width: "min(420px,95vw)" }}
      >
        {/* header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "#ede9fe" }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="#7c3aed"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <p className="font-black text-gray-900">Your Cart</p>
              <p className="text-xs text-gray-400">
                {items.length} item{items.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <button
            onClick={close}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* items */}
        <div className="flex-1 overflow-y-auto drawer-scroll px-5 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <svg
                  className="w-10 h-10 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <p className="font-bold text-gray-700 text-lg">
                Your cart is empty
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Add some products to get started!
              </p>
              <button
                onClick={close}
                className="mt-6 px-7 py-2.5 rounded-full text-sm font-bold text-white"
                style={{
                  background: "linear-gradient(135deg,#7c3aed,#a855f7)",
                }}
              >
                Browse Products
              </button>
            </div>
          ) : (
            items.map((item, idx) => (
              <div
                key={item.id}
                className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3"
                style={{
                  animation: `fadeUp .3s ease both`,
                  animationDelay: `${idx * 0.05}s`,
                }}
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-white border border-gray-100">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black text-gray-800 truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.brand}</p>
                  <p
                    className="text-sm font-bold mt-0.5"
                    style={{ color: "#7c3aed" }}
                  >
                    ${item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <button
                      onClick={() => onQty(item.id, item.qty - 1)}
                      className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm hover:border-purple-400 transition-colors"
                    >
                      −
                    </button>
                    <span className="text-sm font-bold text-gray-700 w-5 text-center">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => onQty(item.id, item.qty + 1)}
                      className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm hover:border-purple-400 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <p className="text-sm font-black text-gray-900">
                    ${(item.price * item.qty).toFixed(2)}
                  </p>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-6 pt-4 pb-6 space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Promo code"
                className="flex-1 text-xs px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-purple-400 transition-colors"
              />
              <button
                className="px-4 py-2 rounded-lg text-xs font-bold text-white"
                style={{ background: "#7c3aed" }}
              >
                Apply
              </button>
            </div>
            <div className="space-y-2 pt-1">
              {[
                ["Subtotal", `$${subtotal.toFixed(2)}`],
                ["Shipping", "Free"],
                ["Tax (8%)", `$${tax.toFixed(2)}`],
              ].map(([l, v]) => (
                <div
                  key={l}
                  className="flex justify-between text-sm text-gray-500"
                >
                  <span>{l}</span>
                  <span
                    className={`font-semibold ${l === "Shipping" ? "text-green-600" : "text-gray-700"}`}
                  >
                    {v}
                  </span>
                </div>
              ))}
              <div className="h-px bg-gray-100" />
              <div className="flex justify-between">
                <span className="font-black text-gray-900 text-base">
                  Total
                </span>
                <span
                  className="font-black text-lg"
                  style={{ color: "#7c3aed" }}
                >
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
            <button
              className="w-full py-4 rounded-2xl text-white font-black text-sm flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.01] transition-all shadow-lg"
              style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="white"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
              Proceed to Checkout
            </button>
            <button
              onClick={close}
              className="w-full py-3 rounded-2xl text-sm font-semibold text-gray-500 border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </button>
            <div className="flex items-center justify-center gap-4">
              {["🔒 Secure", "🚚 Free Ship", "↩️ Easy Returns"].map((b) => (
                <span key={b} className="text-[10px] text-gray-400 font-medium">
                  {b}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── FILTER SIDEBAR ─── */
function FilterSidebar({ open, onClose, filters, setFilters }) {
  const [closing, setClosing] = useState(false);
  const close = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 280);
  };
  if (!open && !closing) return null;

  return (
    <div className="fixed inset-0 z-[998] flex">
      <div
        className="absolute inset-0 anim-overlayIn"
        style={{ background: "rgba(0,0,0,.4)" }}
        onClick={close}
      />
      <div
        className={`relative flex flex-col bg-white h-full shadow-2xl overflow-y-auto drawer-scroll ${closing ? "anim-sideOut" : "anim-sideIn"}`}
        style={{ width: "min(320px,90vw)" }}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="#7c3aed"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
              />
            </svg>
            <p className="font-black text-gray-900">Filters</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setFilters((f) => ({
                  ...f,
                  category: "All",
                  brand: "All Brands",
                  minPrice: 0,
                  maxPrice: 100,
                  inStock: false,
                  onSale: false,
                }))
              }
              className="text-xs font-bold text-purple-600 hover:underline"
            >
              Clear All
            </button>
            <button
              onClick={close}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="px-6 py-5 space-y-7">
          {/* Category */}
          <div>
            <p className="text-xs font-black text-gray-700 uppercase tracking-widest mb-3">
              Category
            </p>
            <div className="space-y-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilters((f) => ({ ...f, category: cat }))}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                  style={{
                    background:
                      filters.category === cat ? "#ede9fe" : "transparent",
                    color: filters.category === cat ? "#7c3aed" : "#4b5563",
                    fontWeight: filters.category === cat ? 800 : 500,
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-gray-100" />

          {/* Brand */}
          <div>
            <p className="text-xs font-black text-gray-700 uppercase tracking-widest mb-3">
              Brand
            </p>
            <div className="space-y-1.5">
              {BRANDS.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setFilters((f) => ({ ...f, brand }))}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all"
                  style={{
                    background:
                      filters.brand === brand ? "#ede9fe" : "transparent",
                    color: filters.brand === brand ? "#7c3aed" : "#4b5563",
                    fontWeight: filters.brand === brand ? 800 : 500,
                  }}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-gray-100" />

          {/* Price Range */}
          <div>
            <p className="text-xs font-black text-gray-700 uppercase tracking-widest mb-3">
              Price Range
            </p>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-black text-purple-600">
                ${filters.minPrice}
              </span>
              <span className="text-sm font-black text-purple-600">
                ${filters.maxPrice}+
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters((f) => ({ ...f, maxPrice: +e.target.value }))
              }
              className="range-input w-full"
            />
          </div>

          <div className="h-px bg-gray-100" />

          {/* Toggles */}
          <div className="space-y-3">
            {[
              { key: "inStock", label: "In Stock Only", icon: "📦" },
              { key: "onSale", label: "On Sale", icon: "🏷️" },
            ].map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() => setFilters((f) => ({ ...f, [key]: !f[key] }))}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all"
                style={{
                  borderColor: filters[key] ? "#7c3aed" : "#f3f4f6",
                  background: filters[key] ? "#faf5ff" : "white",
                }}
              >
                <div className="flex items-center gap-2">
                  <span>{icon}</span>
                  <span className="text-sm font-bold text-gray-700">
                    {label}
                  </span>
                </div>
                <div
                  className="w-10 h-6 rounded-full relative transition-all"
                  style={{ background: filters[key] ? "#7c3aed" : "#e5e7eb" }}
                >
                  <div
                    className="absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all"
                    style={{ left: filters[key] ? "calc(100% - 20px)" : "4px" }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── PRODUCT CARD ─── */
function ProductCard({
  product,
  onAddToCart,
  onWishlist,
  wishlist,
  animDelay = 0,
  visible = true,
  viewMode,
}) {
  const wished = wishlist.includes(product.id);
  const isGrid = viewMode === "grid";

  if (!isGrid) {
    return (
      <div
        className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-5 card-lift"
        style={
          visible
            ? {
                animation: `fadeUp .45s ease both`,
                animationDelay: `${animDelay}s`,
              }
            : { opacity: 0 }
        }
      >
        <div className="relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-gray-50">
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          {product.badge && (
            <span
              className="absolute top-1 left-1 text-[9px] font-black text-white px-1.5 py-0.5 rounded-md"
              style={{ background: BADGE_COLOR[product.badge] || "#7c3aed" }}
            >
              {product.badge}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-400 font-medium">{product.brand}</p>
          <p className="font-black text-gray-900 text-sm mt-0.5 truncate">
            {product.name}
          </p>
          {product.puffs && (
            <p className="text-xs text-purple-500 font-bold mt-0.5">
              {product.puffs}
            </p>
          )}
          <div className="flex items-center gap-1.5 mt-1">
            <StarRating score={product.rating} small />
            <span className="text-[10px] text-gray-400">
              ({product.reviews})
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <div className="text-right">
            <p className="font-black text-lg" style={{ color: "#7c3aed" }}>
              ${product.price.toFixed(2)}
            </p>
            {product.oldPrice && (
              <p className="text-xs text-gray-400 line-through">
                ${product.oldPrice.toFixed(2)}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onWishlist(product.id)}
              className={`wishlist-btn w-8 h-8 rounded-full border flex items-center justify-center transition-all ${wished ? "border-red-200 text-red-500 bg-red-50" : "border-gray-200 text-gray-400 hover:text-red-500"}`}
            >
              <svg
                className="w-4 h-4"
                fill={wished ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
            <button
              onClick={() => product.inStock && onAddToCart(product)}
              className="px-4 py-2 rounded-xl text-xs font-black text-white transition-all hover:opacity-90 hover:scale-105 disabled:opacity-40"
              style={{
                background: product.inStock
                  ? "linear-gradient(135deg,#7c3aed,#a855f7)"
                  : "#e5e7eb",
                color: product.inStock ? "white" : "#9ca3af",
              }}
              disabled={!product.inStock}
            >
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-white border border-gray-100 rounded-2xl overflow-hidden card-lift cursor-pointer group"
      style={
        visible
          ? {
              animation: `fadeUp .45s ease both`,
              animationDelay: `${animDelay}s`,
            }
          : { opacity: 0 }
      }
    >
      <div
        className="relative overflow-hidden bg-gray-50"
        style={{ height: 150 }}
      >
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
        />
        {product.badge && (
          <span
            className="absolute top-3 left-3 text-[10px] font-black text-white px-2.5 py-1 rounded-full shadow-md"
            style={{ background: BADGE_COLOR[product.badge] || "#7c3aed" }}
          >
            {product.badge}
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-xs font-black text-gray-600 bg-white px-4 py-2 rounded-full shadow border border-gray-200">
              Out of Stock
            </span>
          </div>
        )}
        {/* quick actions on hover */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onWishlist(product.id);
            }}
            className={`w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-all ${wished ? "bg-red-500 text-white" : "bg-white text-gray-500 hover:text-red-500"}`}
          >
            <svg
              className="w-4 h-4"
              fill={wished ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
        {product.oldPrice && (
          <div className="absolute bottom-3 right-3">
            <span
              className="text-[9px] font-black text-white px-2 py-0.5 rounded-full"
              style={{ background: "#ef4444" }}
            >
              -{Math.round((1 - product.price / product.oldPrice) * 100)}%
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
          {product.brand}
        </p>
        <p className="font-black text-gray-900 text-sm mt-0.5 leading-tight">
          {product.name}
        </p>
        {product.puffs && (
          <p
            className="text-[10px] font-bold mt-0.5"
            style={{ color: "#7c3aed" }}
          >
            {product.puffs}
          </p>
        )}
        <div className="flex items-center gap-1.5 mt-1.5">
          <StarRating score={product.rating} small />
          <span className="text-[10px] text-gray-400">({product.reviews})</span>
        </div>
        <div className="flex items-end justify-between mt-3">
          <div>
            <p
              className="font-black text-lg leading-none"
              style={{ color: "#7c3aed" }}
            >
              ${product.price.toFixed(2)}
            </p>
            {product.oldPrice && (
              <p className="text-xs text-gray-400 line-through mt-0.5">
                ${product.oldPrice.toFixed(2)}
              </p>
            )}
          </div>
          <button
            onClick={() => product.inStock && onAddToCart(product)}
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-black text-white transition-all hover:scale-105 hover:opacity-90"
            style={{
              background: product.inStock
                ? "linear-gradient(135deg,#7c3aed,#a855f7)"
                : "#e5e7eb",
              color: product.inStock ? "white" : "#9ca3af",
            }}
            disabled={!product.inStock}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            {product.inStock ? "Add" : "N/A"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN SHOP PAGE
══════════════════════════════════════ */
export default function Shop() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [filters, setFilters] = useState({
    category: "All",
    brand: "All Brands",
    minPrice: 0,
    maxPrice: 100,
    inStock: false,
    onSale: false,
  });
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [badgeAnim, setBadgeAnim] = useState(false);
  const [toast, setToast] = useState("");
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;

  const heroRef = useRef(null);
  const heroVis = useVisible(heroRef);
  const gridRef = useRef(null);
  const gridVis = useVisible(gridRef);

  /* filter + sort */
  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      if (filters.category !== "All" && p.category !== filters.category)
        return false;
      if (filters.brand !== "All Brands" && p.brand !== filters.brand)
        return false;
      if (p.price > filters.maxPrice) return false;
      if (filters.inStock && !p.inStock) return false;
      if (filters.onSale && !p.oldPrice) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !p.name.toLowerCase().includes(q) &&
          !p.brand.toLowerCase().includes(q) &&
          !p.category.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
    if (sort === "price-asc")
      list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc")
      list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [filters, search, sort]);

  const paginated = useMemo(
    () => filtered.slice(0, page * PER_PAGE),
    [filtered, page],
  );
  const hasMore = paginated.length < filtered.length;

  /* cart */
  const addToCart = (product) => {
    setCartItems((prev) => {
      const ex = prev.find((i) => i.id === product.id);
      return ex
        ? prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { ...product, qty: 1 }];
    });
    setBadgeAnim(true);
    setToast(`${product.name} added to cart!`);
    setTimeout(() => setBadgeAnim(false), 400);
    setTimeout(() => setToast(""), 2500);
  };
  const updateQty = (id, qty) => {
    if (qty < 1) removeItem(id);
    else
      setCartItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, qty } : i)),
      );
  };
  const removeItem = (id) =>
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  const toggleWish = (id) =>
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  const totalItems = cartItems.reduce((s, i) => s + i.qty, 0);

  const activeFilterCount = [
    filters.category !== "All",
    filters.brand !== "All Brands",
    filters.maxPrice < 100,
    filters.inStock,
    filters.onSale,
  ].filter(Boolean).length;

  return (
    <>
      <style>{injectStyles()}</style>

      {/* TOAST */}
      {toast && (
        <div
          className="fixed bottom-6 left-1/2 z-[1001] anim-toast pointer-events-none"
          style={{ transform: "translateX(-50%)" }}
        >
          <div
            className="flex items-center gap-2 px-5 py-3 rounded-2xl text-white text-sm font-bold shadow-2xl"
            style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="white"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            {toast}
          </div>
        </div>
      )}

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onQty={updateQty}
        onRemove={removeItem}
      />
      <FilterSidebar
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
      />

      <div className="font-sans text-gray-800 bg-white min-h-screen overflow-x-hidden">
        {/* ── HERO BANNER ── */}
        <section
          className="relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg,#0f0a1e 0%,#1a0533 50%,#0d1b3e 100%)",
            minHeight: 260,
          }}
          ref={heroRef}
        >
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="max-w-6xl mx-auto px-10 py-14 flex items-center justify-between relative z-10">
            <div key={heroVis ? "v" : "h"}>
              <div
                className="anim-fadeLeft inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 uppercase tracking-widest"
                style={{
                  background: "rgba(124,58,237,.25)",
                  border: "1px solid rgba(167,139,250,.4)",
                  color: "#c4b5fd",
                }}
              >
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse inline-block" />
                {filtered.length} Products Available
              </div>
              <h1
                className="anim-fadeLeft d1 font-black text-white leading-tight mb-3"
                style={{ fontSize: "clamp(2rem,4vw,3.2rem)" }}
              >
                Our <span className="grad-text">Full Catalog</span>
              </h1>
              <p className="anim-fadeLeft d2 text-gray-400 text-sm max-w-md leading-relaxed">
                Premium vapes, smoke accessories, THC-A, THC-P, pre-rolls and
                wellness products — all in one place.
              </p>
              <div className="anim-fadeLeft d3 flex items-center gap-2 mt-5 text-xs text-gray-500 font-medium">
                <a href="#" className="hover:text-purple-400 transition-colors">
                  Home
                </a>
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <span style={{ color: "#a78bfa" }} className="font-black">
                  Shop
                </span>
              </div>
            </div>
            {/* category quick pills */}
            <div className="lg:hidden flex flex-col gap-2 anim-fadeRight d2">
              {["Vapes", "THC-A", "Pre-Rolls", "Devices & Pods"].map((c) => (
                <button
                  key={c}
                  onClick={() => setFilters((f) => ({ ...f, category: c }))}
                  className="px-5 py-2.5 rounded-full text-xs font-black text-white text-left transition-all hover:scale-105 hover:opacity-90 shadow-lg"
                  style={{
                    background: "rgba(124,58,237,.35)",
                    border: "1px solid rgba(167,139,250,.4)",
                  }}
                >
                  {c} →
                </button>
              ))}
            </div>
          </div>
          {/* <div
            className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom,transparent,white)",
            }}
          /> */}
        </section>

        {/* ── CATEGORY TABS ── */}
        <div className="sticky top-[68px] z-40 bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-6xl mx-auto px-8">
            <div
              className="flex items-center gap-1 overflow-x-auto py-3"
              style={{ scrollbarWidth: "none" }}
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setFilters((f) => ({ ...f, category: cat }));
                    setPage(1);
                  }}
                  className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-black transition-all"
                  style={{
                    background:
                      filters.category === cat
                        ? "linear-gradient(135deg,#7c3aed,#a855f7)"
                        : "#f9fafb",
                    color: filters.category === cat ? "white" : "#6b7280",
                    border:
                      filters.category === cat ? "none" : "1.5px solid #f3f4f6",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <main className="max-w-6xl mx-auto px-8 py-8">
          {/* Toolbar */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            {/* Search */}
            <div className="relative flex-1" style={{ minWidth: 220 }}>
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
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
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search products, brands..."
                className="w-full pl-11 pr-4 py-3 text-sm rounded-2xl border-2 border-gray-100 bg-gray-50 outline-none transition-all focus:border-purple-400 focus:bg-white"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Filter btn */}
            <button
              onClick={() => setFilterOpen(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold border-2 transition-all hover:border-purple-400 hover:bg-purple-50"
              style={{
                borderColor: activeFilterCount > 0 ? "#7c3aed" : "#f3f4f6",
                color: activeFilterCount > 0 ? "#7c3aed" : "#6b7280",
                background: activeFilterCount > 0 ? "#faf5ff" : "white",
              }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
                />
              </svg>
              Filters
              {activeFilterCount > 0 && (
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white"
                  style={{ background: "#7c3aed" }}
                >
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sort */}
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
                className="appearance-none pl-4 pr-9 py-3 text-sm font-bold rounded-2xl border-2 border-gray-100 bg-gray-50 outline-none cursor-pointer hover:border-purple-300 transition-all text-gray-700"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.val} value={o.val}>
                    {o.label}
                  </option>
                ))}
              </select>
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* View toggle */}
            <div className="flex items-center border-2 border-gray-100 rounded-xl overflow-hidden bg-gray-50">
              {[
                [
                  "grid",
                  "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
                ],
                ["list", "M4 6h16M4 10h16M4 14h16M4 18h16"],
              ].map(([v, d]) => (
                <button
                  key={v}
                  onClick={() => setViewMode(v)}
                  className="w-10 h-10 flex items-center justify-center transition-all"
                  style={{
                    background: viewMode === v ? "white" : "transparent",
                    color: viewMode === v ? "#7c3aed" : "#9ca3af",
                    boxShadow:
                      viewMode === v ? "0 1px 4px rgba(0,0,0,.08)" : "none",
                  }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
                  </svg>
                </button>
              ))}
            </div>

            {/* result count */}
            <p className="text-xs text-gray-400 font-medium ml-auto hidden sm:block">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Active filter chips */}
          {activeFilterCount > 0 && (
            <div className="flex items-center gap-2 mb-5 flex-wrap">
              <span className="text-xs font-bold text-gray-500">Active:</span>
              {filters.category !== "All" && (
                <span
                  className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{ background: "#ede9fe", color: "#7c3aed" }}
                >
                  {filters.category}
                  <button
                    onClick={() =>
                      setFilters((f) => ({ ...f, category: "All" }))
                    }
                  >
                    ✕
                  </button>
                </span>
              )}
              {filters.brand !== "All Brands" && (
                <span
                  className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{ background: "#ede9fe", color: "#7c3aed" }}
                >
                  {filters.brand}
                  <button
                    onClick={() =>
                      setFilters((f) => ({ ...f, brand: "All Brands" }))
                    }
                  >
                    ✕
                  </button>
                </span>
              )}
              {filters.maxPrice < 100 && (
                <span
                  className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{ background: "#ede9fe", color: "#7c3aed" }}
                >
                  Under ${filters.maxPrice}
                  <button
                    onClick={() => setFilters((f) => ({ ...f, maxPrice: 100 }))}
                  >
                    ✕
                  </button>
                </span>
              )}
              {filters.inStock && (
                <span
                  className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{ background: "#ede9fe", color: "#7c3aed" }}
                >
                  In Stock
                  <button
                    onClick={() =>
                      setFilters((f) => ({ ...f, inStock: false }))
                    }
                  >
                    ✕
                  </button>
                </span>
              )}
              {filters.onSale && (
                <span
                  className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{ background: "#ede9fe", color: "#7c3aed" }}
                >
                  On Sale
                  <button
                    onClick={() => setFilters((f) => ({ ...f, onSale: false }))}
                  >
                    ✕
                  </button>
                </span>
              )}
            </div>
          )}

          {/* PRODUCT GRID */}
          <div ref={gridRef}>
            {paginated.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center anim-fadeUp">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-black text-gray-900 mb-2">
                  No Products Found
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  Try adjusting your search or filters to find what you're
                  looking for.
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setFilters({
                      category: "All",
                      brand: "All Brands",
                      minPrice: 0,
                      maxPrice: 100,
                      inStock: false,
                      onSale: false,
                    });
                  }}
                  className="px-7 py-3 rounded-full text-white text-sm font-black hover:opacity-90 hover:scale-105 transition-all shadow-lg"
                  style={{
                    background: "linear-gradient(135deg,#7c3aed,#a855f7)",
                  }}
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid md:grid-cols-2 lg:grid-cols-3 grid-cols-4 gap-4"
                    : "flex flex-col gap-3"
                }
              >
                {paginated.map((p, i) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onAddToCart={addToCart}
                    onWishlist={toggleWish}
                    wishlist={wishlist}
                    animDelay={(i % PER_PAGE) * 0.04}
                    visible={gridVis}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}

            {/* Load More */}
            {hasMore && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => setPage((p) => p + 1)}
                  className="px-10 py-4 rounded-2xl text-white font-black text-sm shadow-xl hover:scale-105 hover:opacity-90 transition-all flex items-center gap-2"
                  style={{
                    background: "linear-gradient(135deg,#7c3aed,#a855f7)",
                  }}
                >
                  Load More Products
                  <span className="text-purple-200 text-xs font-bold">
                    ({filtered.length - paginated.length} remaining)
                  </span>
                </button>
              </div>
            )}
          </div>
        </main>

        {/* FEATURES BAR */}
        <section className="border-y border-gray-100 bg-white mt-8">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 grid-cols-4 divide-x divide-gray-100">
            {[
              {
                icon: "🚚",
                title: "PICKUP ONLY",
                desc: "Order online & pickup offline",
              },
              {
                icon: "🛡️",
                title: "QUALITY GUARANTEE",
                desc: "No compromise in quality",
              },
              {
                icon: "🏷️",
                title: "DAILY OFFERS",
                desc: "Fresh deals every day",
              },
              {
                icon: "🔒",
                title: "100% SECURE PAYMENT",
                desc: "Your data is protected",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="flex items-start gap-3 px-6 py-5 hover:bg-purple-50 transition-colors cursor-pointer"
              >
                <span className="text-2xl">{f.icon}</span>
                <div>
                  <p className="text-xs font-bold tracking-wider text-gray-800">
                    {f.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* NEWSLETTER */}
        <section
          className="py-16 px-8 text-center relative overflow-hidden"
          style={{ background: "#7c3aed" }}
        >
          <div className="max-w-xl mx-auto relative z-10">
            <p className="text-purple-200 text-xs uppercase tracking-widest mb-2 font-semibold">
              Stay in the loop
            </p>
            <h3 className="text-3xl font-black text-white uppercase tracking-wider mb-2">
              Subscribe Us Now
            </h3>
            <p className="text-purple-200 text-sm mb-8">
              Get the latest drops, restocks and exclusive deals.
            </p>
            <div className="flex max-w-md mx-auto rounded-xl overflow-hidden shadow-xl">
              <input
                type="email"
                placeholder="Enter your email..."
                className="flex-1 px-5 py-3.5 text-sm outline-none border-0 bg-white text-gray-800 placeholder-gray-400"
              />
              <button className="bg-gray-900 hover:bg-gray-800 text-white font-bold text-sm px-6 py-3.5 transition-colors whitespace-nowrap">
                SUBSCRIBE
              </button>
            </div>
          </div>
          <div
            className="absolute -top-16 -left-16 w-56 h-56 rounded-full pointer-events-none"
            style={{ background: "rgba(255,255,255,.06)" }}
          />
          <div
            className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: "rgba(0,0,0,.12)" }}
          />
        </section>

        {/* FOOTER */}
        <footer className="bg-gray-900 text-gray-400 pt-14 pb-6 px-8">
          <div className="max-w-6xl mx-auto grid md:grid-cols-1 grid-cols-4 gap-10 pb-10 border-b border-gray-700">
            <div>
              <p className="text-white font-black text-xl mb-3">
                MiniStore<span style={{ color: "#7c3aed" }}>.</span>
              </p>
              <p className="text-sm leading-relaxed text-gray-500 mb-5">
                Your one-stop shop for premium vapes, smoke accessories and
                wellness products.
              </p>
              <div className="flex gap-3">
                {[
                  { l: "f", c: "#1877f2" },
                  { l: "in", c: "#0077b5" },
                  { l: "tw", c: "#1da1f2" },
                  { l: "yt", c: "#ff0000" },
                ].map((s) => (
                  <button
                    key={s.l}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs text-white font-bold hover:scale-110 transform transition-transform"
                    style={{ background: s.c }}
                  >
                    {s.l}
                  </button>
                ))}
              </div>
            </div>
            {[
              {
                title: "Quick Links",
                items: ["Home", "About", "Shop", "Blogs", "Contact"],
              },
              {
                title: "Help & Info",
                items: [
                  "Track Your Order",
                  "Returns Policies",
                  "Shipping & Delivery",
                  "Contact Us",
                  "FAQs",
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
                  {col.title}
                </p>
                <ul className="space-y-2">
                  {col.items.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm text-gray-500 hover:text-purple-400 transition-colors inline-block hover:translate-x-1 transform duration-200"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <p className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
                Contact Us
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>Do you have any questions?</li>
                <li>
                  <a
                    href="mailto:miniinfo@email.com"
                    className="hover:text-purple-400 transition-colors"
                  >
                    miniinfo@email.com
                  </a>
                </li>
                <li className="pt-1">We're always glad to help!</li>
                <li>
                  <a
                    href="tel:+15112220064"
                    className="hover:text-purple-400 transition-colors"
                  >
                    +15 112 222 00 64
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="max-w-6xl mx-auto mt-6 flex md:flex-col flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-600">
              © 2024 MiniStore. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              {["VISA", "MC", "PAYPAL", "AMEX"].map((p) => (
                <div
                  key={p}
                  className="bg-gray-700 hover:bg-gray-600 transition-colors rounded px-3 py-1.5 text-[10px] text-gray-300 uppercase font-bold tracking-wider cursor-pointer"
                >
                  {p}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-600">
              Design by{" "}
              <a href="#" className="text-purple-500 hover:underline">
                Template.sample
              </a>
            </p>
          </div>
        </footer>
        <div className="bg-gray-950 py-3 px-6 text-center">
          <p className="text-xs text-gray-600">
            ⚠️ Products sold are intended for adults 21+ only. Please consume
            responsibly.
          </p>
        </div>
      </div>
    </>
  );
}
