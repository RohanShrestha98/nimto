import { useState, useEffect, useRef } from "react";
import fogorImg from "../../assets/images/fogor kit.png";
import geekXLite from "../../assets/images/GeekX.png";
import LimitlessImg from "../../assets/images/Limitless .png";
import Gummies from "../../assets/images/gummies.webp";
import Kratom from "../../assets/images/kratom.webp";
import OH from "../../assets/images/OH.webp";
import Drinks from "../../assets/images/drinks.webp";
import Papers from "../../assets/images/papers.webp";
import Capsules from "../../assets/images/capsules.webp";

const HERO_SLIDES = [
  {
    tag: "New Arrival",
    title: ["The ", "Fogor Kit "],
    desc: "Unleash intense flavor and powerful clouds with the Fogor Kit & Pods, long-lasting performance, and easy-to-use pods",
    btn: "SHOP NOW",
    bg: "from-purple-50 to-purple-100",
    circle: "#ede9fe",
    img: fogorImg,
    accent: "#7c3aed",
  },
  {
    tag: "Best Seller",
    title: ["Geek ", "X Lite 50K"],
    desc: "Offering up to 50K puffs, boost mode for stronger hits, and smooth, flavor-packed clouds in every draw.",
    btn: "SHOP NOW",
    bg: "from-blue-50 to-blue-100",
    circle: "#dbeafe",
    img: geekXLite,
    accent: "#2563eb",
  },
  {
    tag: "Limited Deal",
    title: ["Limitless ", "7OH Power Tabs"],
    desc: "Limitless 7OH Tablets deliver strong, fast-acting performance in a convenient form — perfect for those who want potency and precision in every dose.",
    btn: "Shop Now",
    bg: "from-rose-50 to-rose-100",
    circle: "#ffe4e6",
    img: LimitlessImg,
    accent: "#e11d48",
  },
];

const PRODUCTS = [
  {
    id: 1,
    name: "iPad (9th Gen)",
    price: "$870",
    img: "https://picsum.photos/seed/ipad9/300/240",
  },
  {
    id: 2,
    name: "Drone With Camera",
    price: "$600",
    img: "https://picsum.photos/seed/drone2/300/240",
  },
  {
    id: 3,
    name: "Apple Watch (2nd Gen)",
    price: "$400",
    img: "https://picsum.photos/seed/watch2/300/240",
  },
  {
    id: 4,
    name: "Ultra HD TV",
    price: "$2000",
    img: "https://picsum.photos/seed/ultratv/300/240",
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    price: "$75",
    img: "https://picsum.photos/seed/speaker5/300/240",
  },
];

const SALE_PRODUCTS = [
  {
    id: 1,
    name: "Gaming Headset",
    price: "$120",
    oldPrice: "$200",
    img: "https://picsum.photos/seed/headset1/300/240",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    price: "$89",
    oldPrice: "$149",
    img: "https://picsum.photos/seed/keyboard1/300/240",
  },
  {
    id: 3,
    name: "4K Webcam",
    price: "$65",
    oldPrice: "$110",
    img: "https://picsum.photos/seed/webcam1/300/240",
  },
  {
    id: 4,
    name: "Smart Ring",
    price: "$199",
    oldPrice: "$299",
    img: "https://picsum.photos/seed/smartring/300/240",
  },
  {
    id: 5,
    name: "Noise Cancelling Buds",
    price: "$55",
    oldPrice: "$95",
    img: "https://picsum.photos/seed/ncbuds/300/240",
  },
];

const CATEGORIES = [
  { name: "Vapes", img: fogorImg },
  { name: "Gummies", img: Gummies },
  {
    name: "Kratoms",
    img: Kratom,
  },
  { name: "7 OH", img: OH },
  { name: "Drinks", img: Drinks },
  { name: "Papers", img: Papers },
  { name: "Capsules", img: Capsules },
];

const REVIEWS = [
  {
    text: "I stumbled upon this tech store while searching for a new laptop, and I couldn't be happier! The staff was incredibly knowledgeable. Highly recommended!",
    name: "Emma Chamberlin",
    avatar: "https://picsum.photos/seed/emma1/60/60",
    stars: 5,
  },
  {
    text: "This tech store is my go-to for all things tech! Whether looking for smartphones or accessories, they've always got me covered. Their expertise is unmatched.",
    name: "Thomas John",
    avatar: "https://picsum.photos/seed/thomas2/60/60",
    stars: 5,
  },
  {
    text: "I recently purchased a smartwatch and I'm absolutely thrilled! Not only did they have an extensive selection, their team helped me find the perfect fit.",
    name: "Kevin Bryan",
    avatar: "https://picsum.photos/seed/kevin3/60/60",
    stars: 5,
  },
];

const StarRating = ({ count = 5 }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} width="15" height="15" viewBox="0 0 20 20" fill="#facc15">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const ProductCard = ({ product, animDelay = 0, visible = true }) => (
  <div
    className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center card-lift cursor-pointer"
    style={
      visible
        ? {
            animation: `slideInCard .45s ease both`,
            animationDelay: `${animDelay}s`,
          }
        : { opacity: 0 }
    }
  >
    <div className="w-full h-32 rounded-xl overflow-hidden mb-3 bg-gray-50 flex items-center justify-center">
      <img
        src={product.img}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
      />
    </div>
    <p className="text-sm font-semibold text-gray-800 text-center">
      {product.name}
    </p>
    {product.oldPrice && (
      <p className="text-xs text-gray-400 line-through mt-0.5">
        {product.oldPrice}
      </p>
    )}
    <p className="text-sm font-bold mt-1" style={{ color: "#7c3aed" }}>
      {product.price}
    </p>
    <button
      className="mt-3 w-full text-xs font-semibold py-1.5 rounded-lg transition-all duration-200"
      style={{
        border: "1.5px solid #ddd6fe",
        color: "#7c3aed",
        background: "white",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#7c3aed";
        e.currentTarget.style.color = "white";
        e.currentTarget.style.borderColor = "#7c3aed";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "white";
        e.currentTarget.style.color = "#7c3aed";
        e.currentTarget.style.borderColor = "#ddd6fe";
      }}
    >
      Add to Cart
    </button>
  </div>
);

// Simple hook to detect when element enters viewport
function useVisible(ref) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return vis;
}

export default function ShopLite() {
  const [email, setEmail] = useState("");
  const [slide, setSlide] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const catsRef = useRef(null);
  const catsVis = useVisible(catsRef);
  const best1Ref = useRef(null);
  const best1Vis = useVisible(best1Ref);
  const saleRef = useRef(null);
  const saleVis = useVisible(saleRef);
  const sale2Ref = useRef(null);
  const sale2Vis = useVisible(sale2Ref);
  const featRef = useRef(null);
  const featVis = useVisible(featRef);
  const best3Ref = useRef(null);
  const best3Vis = useVisible(best3Ref);
  const revRef = useRef(null);
  const revVis = useVisible(revRef);

  const goSlide = (idx) => {
    setSlide((idx + HERO_SLIDES.length) % HERO_SLIDES.length);
    setAnimKey((k) => k + 1);
  };

  useEffect(() => {
    const t = setInterval(() => {
      setSlide((s) => (s + 1) % HERO_SLIDES.length);
      setAnimKey((k) => k + 1);
    }, 450000);
    return () => clearInterval(t);
  }, []);

  const cur = HERO_SLIDES[slide];

  return (
    <>
      <div className="font-sans text-gray-800 bg-white min-h-screen overflow-x-hidden">
        {/* ── HERO CAROUSEL ── */}

        <section
          className={`relative bg-gradient-to-r ${cur.bg} overflow-hidden`}
          style={{ minHeight: 420 }}
        >
          <div
            className="max-w-6xl mx-auto flex items-center px-10 py-16 relative z-10"
            style={{ minHeight: 420 }}
          >
            {/* TEXT — re-animates on each slide change via key */}
            <div className="max-w-lg z-10" key={`t${animKey}`}>
              <p className="anim-fadeLeft text-xs uppercase tracking-widest text-gray-400 mb-3 font-semibold">
                {cur.tag}
              </p>
              <h1
                className="anim-fadeLeft d1 font-black text-gray-900 leading-none mb-5"
                style={{ fontSize: "clamp(2.5rem,5vw,3.8rem)" }}
              >
                {cur.title[0]}
                <br />
                {cur.title[1]}
              </h1>
              <p className="anim-fadeLeft d2 text-gray-500 text-sm mb-8 leading-relaxed max-w-sm">
                {cur.desc}
              </p>
              <div className="anim-fadeLeft d3 flex items-center gap-5">
                <button
                  className="text-white text-sm font-bold px-8 py-3 rounded-full transition-all hover:opacity-90 hover:scale-105 shadow-lg"
                  style={{ background: cur.accent }}
                >
                  {cur.btn}
                </button>
                <span className="anim-bounceR text-sm font-semibold text-gray-400 cursor-pointer hover:text-gray-700 transition-colors">
                  Learn More →
                </span>
              </div>
              {/* Dots */}
              <div className="anim-fadeLeft d4 flex gap-2 mt-10">
                {HERO_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goSlide(i)}
                    className="rounded-full transition-all duration-300 focus:outline-none"
                    style={{
                      width: i === slide ? 30 : 10,
                      height: 10,
                      background: i === slide ? cur.accent : "#d1d5db",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* IMAGE */}
            <div
              className="absolute right-10 top-1/2 -translate-y-1/2 md:hidden block"
              key={`i${animKey}`}
            >
              {/* ripple */}
              <div
                className="absolute inset-0 rounded-full anim-ripple pointer-events-none"
                style={{ background: cur.accent, opacity: 0.15 }}
              />
              <div
                className="w-80 h-80 rounded-full flex items-center justify-center"
                style={{ background: cur.circle }}
              >
                <img
                  src={cur.img}
                  alt="hero"
                  className="w-72 h-72 object-cover rounded-full anim-zoomIn anim-float"
                  style={{
                    boxShadow: `0 28px 64px ${cur.accent}44`,
                    animationDelay: "0s, 0.6s",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Arrows */}
          {[
            { dir: -1, pos: "left-4", icon: "M15 19l-7-7 7-7" },
            { dir: 1, pos: "right-4", icon: "M9 5l7 7-7 7" },
          ].map(({ dir, pos, icon }) => (
            <button
              key={pos}
              onClick={() => goSlide(slide + dir)}
              className={`absolute ${pos} top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-xl hover:scale-110 transition-all z-20`}
            >
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={icon}
                />
              </svg>
            </button>
          ))}

          {/* Deco blobs */}
          <div
            className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full opacity-10 pointer-events-none"
            style={{ background: cur.accent }}
          />
          <div
            className="absolute top-8 right-1/3 w-16 h-16 rounded-full opacity-10 pointer-events-none"
            style={{ background: cur.accent }}
          />
        </section>

        {/* ── FEATURES BAR ── */}
        <section className="border-y border-gray-100 bg-white">
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

        {/* ── CATEGORIES ── */}
        <section className="max-w-6xl mx-auto px-8 py-14" ref={catsRef}>
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-700 mb-8">
            Categories
          </h2>
          <div className="grid md:grid-cols-3 grid-cols-7 gap-5">
            {CATEGORIES.map((cat, i) => (
              <div
                key={cat.name}
                className="flex flex-col items-center gap-2 cursor-pointer group"
                style={
                  catsVis
                    ? {
                        animation: `fadeUp .5s ease both`,
                        animationDelay: `${i * 0.07}s`,
                      }
                    : { opacity: 0 }
                }
              >
                <div className="w-20 h-20 border-2 border-gray-100 rounded-2xl overflow-hidden bg-gray-50 group-hover:border-purple-400 group-hover:shadow-md transition-all duration-300">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <p className="text-xs text-gray-600 font-semibold text-center group-hover:text-purple-600 transition-colors">
                  {cat.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── BEST SELLING ── */}
        <section className="max-w-6xl mx-auto px-8 pb-14" ref={best1Ref}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-700">
              Best Selling Items
            </h2>
            <a
              href="#"
              className="text-xs font-semibold hover:underline"
              style={{ color: "#7c3aed" }}
            >
              View All →
            </a>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-5 gap-4">
            {PRODUCTS.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                animDelay={i * 0.08}
                visible={best1Vis}
              />
            ))}
          </div>
        </section>

        {/* ── SALE BANNER ── */}
        <section
          className="bg-gray-900 py-20 px-8 relative overflow-hidden"
          ref={saleRef}
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between relative z-10">
            <div
              style={
                saleVis
                  ? { animation: "fadeLeft .7s ease both" }
                  : { opacity: 0 }
              }
            >
              <p className="text-yellow-400 text-sm tracking-widest mb-2 font-semibold">
                — 10% OFF
              </p>
              <h2 className="text-5xl font-black text-white uppercase tracking-tight leading-tight">
                New Year
                <br />
                Sale
              </h2>
              <p className="text-gray-400 text-sm mt-3 mb-8 max-w-xs">
                Don't miss our biggest sale of the year. Limited stock — grab
                yours now.
              </p>
              <button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black text-sm px-10 py-3.5 rounded-full transition-all hover:scale-105 shadow-lg">
                SHOP NOW
              </button>
            </div>
            <div
              style={
                saleVis
                  ? { animation: "fadeRight .7s ease both .2s both" }
                  : { opacity: 0 }
              }
              className="md:hidden block"
            >
              <img
                src="https://picsum.photos/seed/salebanner/360/300"
                alt="Sale"
                className="h-64
                 rounded-2xl object-cover shadow-2xl anim-float"
              />
            </div>
          </div>
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-5 pointer-events-none -translate-y-1/3 translate-x-1/4"
            style={{ background: "#facc15" }}
          />
          <div
            className="absolute bottom-0 left-1/4 w-48 h-48 rounded-full opacity-10 pointer-events-none"
            style={{ background: "#7c3aed" }}
          />
        </section>

        {/* ── SALE PRODUCTS ── */}
        <section className="max-w-6xl mx-auto px-8 py-14" ref={sale2Ref}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-700">
              🔥 Sale Items
            </h2>
            <a
              href="#"
              className="text-xs font-semibold hover:underline"
              style={{ color: "#7c3aed" }}
            >
              View All →
            </a>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-5 gap-4">
            {SALE_PRODUCTS.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                animDelay={i * 0.08}
                visible={sale2Vis}
              />
            ))}
          </div>
        </section>

        {/* ── FEATURED BANNERS ── */}
        <section className="max-w-6xl mx-auto px-8 pb-14" ref={featRef}>
          <div className="grid md:grid-cols-1 grid-cols-3 gap-5">
            {[
              {
                label: "New Arrivals",
                sub: "Fresh drops weekly",
                img: "https://picsum.photos/seed/arrivals/400/200",
              },
              {
                label: "Best Deals",
                sub: "Up to 60% off",
                img: "https://picsum.photos/seed/deals2/400/200",
              },
              {
                label: "Top Rated",
                sub: "Customer favourites",
                img: "https://picsum.photos/seed/toprated/400/200",
              },
            ].map((b, i) => (
              <div
                key={b.label}
                className="relative rounded-2xl overflow-hidden cursor-pointer card-lift group"
                style={
                  featVis
                    ? {
                        animation: `fadeUp .5s ease both`,
                        animationDelay: `${i * 0.12}s`,
                      }
                    : { opacity: 0 }
                }
              >
                <img
                  src={b.img}
                  alt={b.label}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className="absolute inset-0 flex items-end p-5"
                  style={{
                    background:
                      "linear-gradient(to top,rgba(0,0,0,.55),transparent)",
                  }}
                >
                  <div>
                    <p className="text-white font-black text-lg leading-tight">
                      {b.label}
                    </p>
                    <p className="text-gray-300 text-xs mt-0.5">{b.sub} →</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── RECENTLY VIEWED ── */}
        <section className="max-w-6xl mx-auto px-8 pb-14" ref={best3Ref}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-700">
              Recently Viewed
            </h2>
            <a
              href="#"
              className="text-xs font-semibold hover:underline"
              style={{ color: "#7c3aed" }}
            >
              View All →
            </a>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-5 gap-4">
            {PRODUCTS.map((p, i) => (
              <ProductCard
                key={`rv-${p.id}`}
                product={p}
                animDelay={i * 0.08}
                visible={best3Vis}
              />
            ))}
          </div>
        </section>

        {/* ── REVIEWS ── */}
        <section className="bg-gray-50 py-16 px-8" ref={revRef}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                Testimonials
              </p>
              <h2 className="text-2xl font-black text-gray-900">
                What Our Customers Say
              </h2>
            </div>
            <div className="grid md:grid-cols-1 grid-cols-3 gap-6">
              {REVIEWS.map((r, i) => (
                <div
                  key={r.name}
                  className="bg-white rounded-2xl p-7 shadow-sm card-lift"
                  style={
                    revVis
                      ? {
                          animation: `fadeUp .5s ease both`,
                          animationDelay: `${i * 0.12}s`,
                        }
                      : { opacity: 0 }
                  }
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="#ede9fe"
                    className="mb-4"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-sm text-gray-600 leading-relaxed mb-5 italic">
                    "{r.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={r.avatar}
                      alt={r.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <StarRating count={r.stars} />
                      <p className="text-sm font-bold text-gray-800 mt-0.5">
                        {r.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BRAND LOGOS ── */}
        <section className="border-y border-gray-100 py-8 px-8 bg-white">
          <div className="max-w-6xl mx-auto flex items-center justify-around">
            {["TECHLIGHT", "MiniStore.", "ULTRAS", "SWANKY", "EMILY"].map(
              (b) => (
                <span
                  key={b}
                  className="text-lg font-black text-gray-200 hover:text-purple-500 transition-all duration-300 cursor-pointer tracking-widest hover:scale-105 transform"
                >
                  {b}
                </span>
              ),
            )}
          </div>
        </section>

        {/* ── NEWSLETTER ── */}
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
              Get the latest news, updates and deals directly to your inbox.
            </p>
            <div className="flex max-w-md mx-auto rounded-xl overflow-hidden shadow-xl">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
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

        {/* ── FOOTER ── */}
        <footer className="bg-gray-900 text-gray-400 pt-14 pb-6 px-8">
          <div className="max-w-6xl mx-auto grid md:grid-cols-1 grid-cols-4 gap-10 pb-10 border-b border-gray-700">
            <div>
              <p className="text-white font-black text-xl mb-3">
                MiniStore<span style={{ color: "#7c3aed" }}>.</span>
              </p>
              <p className="text-sm leading-relaxed text-gray-500 mb-5">
                Griffith Extended, CA 34745. Connect with us on your favourite
                platform.
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
      </div>
    </>
  );
}
