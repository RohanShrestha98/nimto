import { useState, useEffect, useRef } from "react";

/* ─── styles matching ShopLite design system ─── */
const injectStyles = () => `
  @keyframes fadeUp    { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeLeft  { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
  @keyframes fadeRight { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
  @keyframes float     { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-14px) rotate(2deg)} }
  @keyframes float2    { 0%,100%{transform:translateY(0) rotate(1deg)} 50%{transform:translateY(-10px) rotate(-1deg)} }
  @keyframes ripple    { 0%{transform:scale(1);opacity:.4} 100%{transform:scale(1.3);opacity:0} }
  @keyframes popIn     { 0%{transform:scale(.5);opacity:0} 60%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
  @keyframes shimmer   { 0%{background-position:-600px 0} 100%{background-position:600px 0} }
  @keyframes countUp   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes gradMove  { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
  @keyframes glowPulse { 0%,100%{box-shadow:0 0 20px rgba(124,58,237,.3)} 50%{box-shadow:0 0 40px rgba(124,58,237,.7)} }
  @keyframes spin      { to{transform:rotate(360deg)} }
  @keyframes marquee   { from{transform:translateX(0)} to{transform:translateX(-50%)} }

  .anim-fadeUp    { animation:fadeUp   .65s ease both }
  .anim-fadeLeft  { animation:fadeLeft  .65s ease both }
  .anim-fadeRight { animation:fadeRight .65s ease both }
  .anim-float     { animation:float    4s ease-in-out infinite }
  .anim-float2    { animation:float2   5s ease-in-out infinite }
  .anim-ripple    { animation:ripple   2.2s ease-out infinite }
  .anim-popIn     { animation:popIn .4s ease both }
  .anim-countUp   { animation:countUp .6s ease both }
  .anim-spin      { animation:spin 1.2s linear infinite }
  .anim-marquee   { animation:marquee 100s linear infinite }

  .d1{animation-delay:.07s} .d2{animation-delay:.14s} .d3{animation-delay:.21s}
  .d4{animation-delay:.28s} .d5{animation-delay:.35s} .d6{animation-delay:.42s}
  .d7{animation-delay:.49s} .d8{animation-delay:.56s}

  .card-lift { transition:transform .28s ease,box-shadow .28s ease }
  .card-lift:hover { transform:translateY(-7px);box-shadow:0 20px 50px rgba(0,0,0,.12) }

  .nav-link { position:relative }
  .nav-link::after { content:'';position:absolute;bottom:-2px;left:0;width:0;height:2px;background:#7c3aed;transition:width .3s ease }
  .nav-link:hover::after { width:100% }

  .grad-text {
    background: linear-gradient(135deg,#7c3aed,#a855f7,#ec4899);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .brand-pill {
    transition: transform .22s ease, box-shadow .22s ease, background .22s ease;
  }
  .brand-pill:hover {
    transform: translateY(-3px) scale(1.04);
    box-shadow: 0 8px 24px rgba(124,58,237,.25);
  }

  .category-card {
    transition: transform .28s ease, box-shadow .28s ease, border-color .28s ease;
  }
  .category-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 24px 52px rgba(0,0,0,.13);
    border-color: #a78bfa;
  }

  .glow-card { animation: glowPulse 3s ease-in-out infinite; }

  .hero-grad {
    background: linear-gradient(135deg,#0f0a1e 0%,#1a0533 40%,#0d1b3e 100%);
  }

  .smoke-bg {
    background-image: radial-gradient(ellipse at 20% 40%, rgba(124,58,237,.15) 0%, transparent 60%),
                      radial-gradient(ellipse at 80% 60%, rgba(168,85,247,.12) 0%, transparent 55%),
                      radial-gradient(ellipse at 50% 90%, rgba(236,72,153,.08) 0%, transparent 50%);
  }

  ::-webkit-scrollbar { width:5px }
  ::-webkit-scrollbar-track { background:#f9fafb }
  ::-webkit-scrollbar-thumb { background:#ddd6fe; border-radius:4px }
`;

function useVisible(ref, threshold = 0.1) {
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
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return vis;
}

/* animated counter */
function Counter({ target, suffix = "", duration = 2000 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const vis = useVisible(ref);
  useEffect(() => {
    if (!vis) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const t = setInterval(() => {
      start += step;
      if (start >= target) {
        setVal(target);
        clearInterval(t);
      } else setVal(start);
    }, 16);
    return () => clearInterval(t);
  }, [vis, target, duration]);
  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ──────────────────────────────────────────
   MAIN ABOUT PAGE
────────────────────────────────────────── */
export default function About() {
  const heroRef = useRef(null);
  const heroVis = useVisible(heroRef);
  const storyRef = useRef(null);
  const storyVis = useVisible(storyRef);
  const statsRef = useRef(null);
  const statsVis = useVisible(statsRef);
  const vapesRef = useRef(null);
  const vapesVis = useVisible(vapesRef);
  const smokeRef = useRef(null);
  const smokeVis = useVisible(smokeRef);
  const whyRef = useRef(null);
  const whyVis = useVisible(whyRef);
  const teamRef = useRef(null);
  const teamVis = useVisible(teamRef);
  const ctaRef = useRef(null);
  const ctaVis = useVisible(ctaRef);

  const VAPE_BRANDS = [
    {
      name: "Fogor",
      color: "#7c3aed",
      emoji: "💨",
      desc: "Bold flavors, smooth hits",
    },
    {
      name: "Viho",
      color: "#2563eb",
      emoji: "🌊",
      desc: "Cool & refreshing vapes",
    },
    {
      name: "Lost Mary",
      color: "#db2777",
      emoji: "🍒",
      desc: "Premium fruity collections",
    },
    {
      name: "Geek Lite",
      color: "#059669",
      emoji: "🎮",
      desc: "Tech-forward design",
    },
    {
      name: "Geek Bar",
      color: "#d97706",
      emoji: "⚡",
      desc: "Long-lasting charge",
    },
    {
      name: "Nexa",
      color: "#7c3aed",
      emoji: "🔮",
      desc: "Next-gen experience",
    },
    {
      name: "Walar",
      color: "#0891b2",
      emoji: "🌊",
      desc: "Oceanic smooth draws",
    },
    {
      name: "& More",
      color: "#6b7280",
      emoji: "✨",
      desc: "100+ brands in store",
    },
  ];

  const SMOKE_CATEGORIES = [
    {
      icon: "💉",
      title: "Booster & Looper Shots",
      color: "#7c3aed",
      bg: "#f5f3ff",
      border: "#ddd6fe",
      items: [
        "Booster Shots",
        "Looper Shots",
        "Various Strengths",
        "Fast-Acting Formulas",
      ],
      desc: "High-quality booster and looper shots designed for the discerning customer. We stock a wide range of strengths and formulations.",
    },
    {
      icon: "🌿",
      title: "7-OH & Hydroxide",
      color: "#059669",
      bg: "#f0fdf4",
      border: "#bbf7d0",
      items: [
        "7OH Hydroxide",
        "Mitragyna Extracts",
        "Capsule Form",
        "Liquid Shots",
      ],
      desc: "Premium 7-OH Hydroxide products sourced for purity and potency. Perfect for wellness-focused customers.",
    },
    {
      icon: "🎋",
      title: "Pre-Rolls",
      color: "#d97706",
      bg: "#fffbeb",
      border: "#fde68a",
      items: ["Classic Pre-Rolls", "Infused Rolls", "King Size", "Mini Rolls"],
      desc: "Expertly rolled pre-rolls ready to enjoy. From classic to infused — we have something for every preference.",
    },
    {
      icon: "💎",
      title: "THC-A Products",
      color: "#7c3aed",
      bg: "#fdf4ff",
      border: "#e9d5ff",
      items: [
        "THC-A Flower",
        "THC-A Diamonds",
        "THC-A Vapes",
        "Concentrate Dabs",
      ],
      desc: "Federally compliant THC-A products in multiple forms — flower, diamonds, vapes and concentrates.",
    },
    {
      icon: "🔬",
      title: "THC-P Products",
      color: "#db2777",
      bg: "#fdf2f8",
      border: "#fbcfe8",
      items: [
        "THC-P Cartridges",
        "THC-P Gummies",
        "THC-P Tinctures",
        "THC-P Vapes",
      ],
      desc: "Cutting-edge THC-P formulations for experienced users looking for potent, quality products.",
    },
    {
      icon: "🌸",
      title: "Flowers",
      color: "#16a34a",
      bg: "#f0fdf4",
      border: "#86efac",
      items: [
        "Hemp Flower",
        "CBD Flower",
        "Exotic Strains",
        "Seasonal Specials",
      ],
      desc: "Hand-selected hemp and CBD flowers from premium cultivators. Fresh batches, rich terpene profiles.",
    },
    {
      icon: "💧",
      title: "Smoke Devices & Pods",
      color: "#0891b2",
      bg: "#f0f9ff",
      border: "#bae6fd",
      items: ["Pod Systems", "Mod Kits", "Replacement Pods", "Starter Kits"],
      desc: "Full range of Smok devices and compatible pod systems. Starter kits to advanced mod setups — all in stock.",
    },
  ];

  const WHY_US = [
    {
      icon: "🏆",
      title: "Premium Quality",
      desc: "Every product on our shelves is vetted for quality, authenticity and compliance. No compromises.",
    },
    {
      icon: "🔐",
      title: "Lab-Tested Products",
      desc: "We only carry brands that provide third-party lab results. Your safety and trust are our top priority.",
    },
    {
      icon: "🤝",
      title: "Expert Staff",
      desc: "Our knowledgeable team is always ready to guide you to the perfect product for your needs.",
    },
    {
      icon: "📦",
      title: "Huge Selection",
      desc: "From vapes to pre-rolls, THC-A to pods — one stop covers it all. 500+ SKUs always in stock.",
    },
    {
      icon: "💰",
      title: "Best Price Match",
      desc: "Find it cheaper elsewhere? We'll match it. Period. We believe great products shouldn't break the bank.",
    },
    {
      icon: "🚀",
      title: "Fast Local Delivery",
      desc: "Order online and receive same-day or next-day delivery within our service area.",
    },
  ];

  const TEAM = [
    {
      name: "Marcus Reid",
      role: "Founder & CEO",
      avatar: "https://picsum.photos/seed/ceo1/120/120",
      quote:
        "We built this store for the community — real products, real people.",
    },
    {
      name: "Ava Thornton",
      role: "Head of Procurement",
      avatar: "https://picsum.photos/seed/proc2/120/120",
      quote: "Every brand we carry earns its spot through quality first.",
    },
    {
      name: "Jordan Khalil",
      role: "Customer Experience",
      avatar: "https://picsum.photos/seed/cx3/120/120",
      quote: "Our goal is every customer leaves knowing exactly what they got.",
    },
    {
      name: "Priya Nair",
      role: "Compliance & Safety",
      avatar: "https://picsum.photos/seed/comply4/120/120",
      quote: "Lab results, legal compliance — non-negotiable from day one.",
    },
  ];

  return (
    <>
      <style>{injectStyles()}</style>
      <div className="font-sans text-gray-800 bg-white min-h-screen overflow-x-hidden">
        {/* ══════════════════════════════
            HERO — dark smoky theme
        ══════════════════════════════ */}
        <section
          className="hero-grad smoke-bg relative overflow-hidden"
          style={{ height: 420 }}
          ref={heroRef}
        >
          {/* grid overlay */}
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div
            className="max-w-6xl mx-auto px-10 py-10 relative z-10 flex items-center justify-between"
            style={{ minHeight: 480 }}
          >
            {/* TEXT */}
            <div className="max-w-2xl" key={heroVis ? "vis" : "hid"}>
              <p
                className="anim-fadeLeft text-xs uppercase tracking-widest font-bold mb-3"
                style={{ color: "#a78bfa" }}
              >
                About Us
              </p>
              <h1
                className="anim-fadeLeft d1 font-black text-gray-900 leading-none mb-8"
                style={{
                  fontSize: "clamp(2.5rem,5vw,3.8rem)",
                  lineHeight: 1.05,
                }}
              >
                {/* <span className="grad-text"> */}
                The <br />
                Vapor Store
                {/* </span> */}
                <br />
              </h1>

              <div className="anim-fadeLeft d3 flex items-center gap-4 flex-wrap">
                <button
                  className="px-8 py-3.5 rounded-full font-black text-sm text-white shadow-xl transition-all hover:scale-105 hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg,#7c3aed,#a855f7)",
                  }}
                >
                  Explore Products
                </button>
              </div>

              {/* breadcrumb */}
              <div className="anim-fadeLeft d4 flex items-center gap-2 mt-8 text-xs text-gray-500 font-medium">
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
                  About Us
                </span>
              </div>
            </div>

            {/* DECO — floating smoke clouds/orbs */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 lg:hidden block pointer-events-none">
              <div className="relative w-72 h-72">
                {/* outer ring */}
                <div
                  className="absolute inset-0 rounded-full anim-ripple"
                  style={{ background: "rgba(124,58,237,.15)" }}
                />
                {/* mid orb */}
                <div
                  className="absolute inset-8 rounded-full anim-float flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg,rgba(124,58,237,.35),rgba(168,85,247,.2))",
                    backdropFilter: "blur(2px)",
                    border: "1px solid rgba(167,139,250,.3)",
                  }}
                >
                  <div className="text-center">
                    <div className="text-6xl mb-2">💨</div>
                    <p className="text-white font-black text-lg">Premium</p>
                    <p className="text-purple-300 text-xs">Vape &amp; Smoke</p>
                  </div>
                </div>
                {/* floating mini orbs */}
                {[
                  { top: "5%", left: "5%", size: 48, emoji: "🌿", delay: "0s" },
                  {
                    top: "10%",
                    right: "5%",
                    size: 44,
                    emoji: "💎",
                    delay: ".6s",
                  },
                  {
                    bottom: "8%",
                    left: "8%",
                    size: 44,
                    emoji: "🔥",
                    delay: "1.2s",
                  },
                  {
                    bottom: "5%",
                    right: "5%",
                    size: 48,
                    emoji: "⚡",
                    delay: ".3s",
                  },
                ].map((o, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full flex items-center justify-center text-xl shadow-lg"
                    style={{
                      width: o.size,
                      height: o.size,
                      top: o.top,
                      left: o.left,
                      right: o.right,
                      bottom: o.bottom,
                      background: "rgba(124,58,237,.3)",
                      border: "1px solid rgba(167,139,250,.4)",
                      animation: `float2 ${3 + i * 0.5}s ease-in-out ${o.delay} infinite`,
                    }}
                  >
                    {o.emoji}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* bottom fade */}
          {/* <div
            className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom,transparent,white)",
            }}
          /> */}
        </section>

        {/* ══════════════════════════════
            MARQUEE — brand names
        ══════════════════════════════ */}
        <div className="py-4 overflow-hidden border-y  border-gray-100 bg-gray-50">
          <div
            className="flex anim-marquee whitespace-nowrap gap-8"
            style={{ width: "max-content" }}
          >
            {[...Array(3)].flatMap(() =>
              [
                "Fogor",
                "Viho",
                "Lost Mary",
                "Geek Lite",
                "Geek Bar",
                "Nexa",
                "Walar",
                "THC-A",
                "THC-P",
                "Pre-Rolls",
                "7-OH",
                "Booster Shots",
                "Smok Devices",
                "Pods",
                "Flowers",
                "Looper Shots",
              ].map((b, i) => (
                <span
                  key={`${b}-${i}`}
                  className="text-sm font-black text-gray-500 uppercase tracking-widest px-6 flex items-center gap-2"
                >
                  <span className="text-purple-300">✦</span> {b}
                </span>
              )),
            )}
          </div>
        </div>

        {/* ══════════════════════════════
            OUR STORY
        ══════════════════════════════ */}
        <section className="max-w-6xl mx-auto px-8 py-20" ref={storyRef}>
          <div className="grid lg:grid-cols-1 grid-cols-2 gap-16 items-center">
            {/* image mosaic */}
            <div
              className="relative"
              style={
                storyVis
                  ? { animation: "fadeLeft .7s ease both" }
                  : { opacity: 0 }
              }
            >
              <div className="grid grid-cols-2 gap-3">
                <img
                  src="https://picsum.photos/seed/store1/300/380"
                  alt="store"
                  className="rounded-2xl w-full h-56 object-cover shadow-xl"
                  style={{ marginTop: 40 }}
                />
                <img
                  src="https://picsum.photos/seed/store2/300/280"
                  alt="products"
                  className="rounded-2xl w-full h-44 object-cover shadow-xl"
                />
                <img
                  src="https://picsum.photos/seed/store3/300/220"
                  alt="team"
                  className="rounded-2xl w-full h-36 object-cover shadow-xl"
                />
                <img
                  src="https://picsum.photos/seed/store4/300/340"
                  alt="vapes"
                  className="rounded-2xl w-full h-52 object-cover shadow-xl"
                  style={{ marginTop: -30 }}
                />
              </div>
              {/* badge overlay */}
              <div
                className="absolute -bottom-6 -right-4 anim-float2 glow-card rounded-2xl px-5 py-4 shadow-2xl"
                style={{
                  background: "linear-gradient(135deg,#7c3aed,#a855f7)",
                }}
              >
                <p className="text-white text-2xl font-black leading-none">
                  500+
                </p>
                <p className="text-purple-200 text-xs font-semibold mt-0.5">
                  Products in Stock
                </p>
              </div>
              <div className="absolute -top-4 -left-4 anim-float rounded-2xl px-4 py-3 shadow-xl bg-white border border-purple-100">
                <p className="text-gray-900 text-lg font-black leading-none">
                  4.9 ⭐
                </p>
                <p className="text-gray-400 text-xs font-medium mt-0.5">
                  2,300+ Reviews
                </p>
              </div>
            </div>

            {/* text */}
            <div
              style={
                storyVis
                  ? { animation: "fadeRight .7s ease both .1s both" }
                  : { opacity: 0 }
              }
            >
              <p
                className="text-xs uppercase tracking-widest font-bold mb-3"
                style={{ color: "#a78bfa" }}
              >
                Our Story
              </p>
              <h2 className="text-4xl font-black text-gray-900 leading-tight mb-5">
                Born From a<br />
                Passion for
                <br />
                <span className="grad-text">Premium Products</span>
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                MiniStore began as a small local shop with a single mission:
                give the community access to the best vapes and smoke
                accessories without the premium-store markup. Since 2020, we've
                grown into a trusted destination carrying over 500+ products
                across all major categories.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                We carry the most popular vape brands —{" "}
                <strong className="text-gray-800">
                  Fogor, Viho, Lost Mary, Geek Lite, Geek Bar, Nexa, Walar
                </strong>{" "}
                and dozens more — alongside an expanding lineup of wellness and
                smoke products including booster shots, looper shots, 7-OH
                hydroxide, pre-rolls, THC-A, THC-P and premium hemp flowers.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-7">
                Every single item on our shelves is hand-selected by our team,
                lab-verified, and priced to be accessible. We believe premium
                shouldn't mean expensive.
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <button
                  className="px-7 py-3 rounded-full font-black text-sm text-white shadow-lg transition-all hover:scale-105 hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg,#7c3aed,#a855f7)",
                  }}
                >
                  Shop Now
                </button>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <img
                        key={i}
                        src={`https://picsum.photos/seed/customer${i}/40/40`}
                        alt="customer"
                        className="w-9 h-9 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-800">
                      2,300+ Happy Customers
                    </p>
                    <p className="text-xs text-gray-400">Rated 4.9 / 5 stars</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════
            STATS
        ══════════════════════════════ */}
        <section className="border-y border-gray-100 bg-white" ref={statsRef}>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 grid-cols-4 divide-x divide-gray-100">
            {[
              { icon: "📦", val: 500, suffix: "+", label: "Products in Stock" },
              { icon: "😊", val: 2300, suffix: "+", label: "Happy Customers" },
              {
                icon: "🏷️",
                val: 50,
                suffix: "+",
                label: "Vape Brands Carried",
              },
              {
                icon: "⭐",
                val: 4.9,
                suffix: "",
                label: "Average Star Rating",
              },
            ].map((s, i) => (
              <div
                key={s.label}
                className="flex items-center gap-4 px-8 py-6 hover:bg-purple-50 transition-colors"
                style={
                  statsVis
                    ? {
                        animation: `fadeUp .5s ease both`,
                        animationDelay: `${i * 0.09}s`,
                      }
                    : { opacity: 0 }
                }
              >
                <span className="text-3xl">{s.icon}</span>
                <div>
                  <p className="font-black text-gray-900 text-2xl leading-none">
                    {statsVis ? (
                      <Counter
                        target={s.val * (s.suffix === "" ? 10 : 1)}
                        suffix={s.suffix}
                        duration={1800}
                      />
                    ) : (
                      "0"
                    )}
                    {s.val === 4.9 ? "" : ""}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 font-medium">
                    {s.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════
            VAPE BRANDS
        ══════════════════════════════ */}
        <section
          className="py-20 px-8"
          style={{ background: "#faf9ff" }}
          ref={vapesRef}
        >
          <div className="max-w-6xl mx-auto">
            <div
              className="text-center mb-14"
              style={
                vapesVis
                  ? { animation: "fadeUp .6s ease both" }
                  : { opacity: 0 }
              }
            >
              <p
                className="text-xs uppercase tracking-widest font-bold mb-3"
                style={{ color: "#a78bfa" }}
              >
                Our Vape Selection
              </p>
              <h2 className="text-4xl font-black text-gray-900 mb-3">
                Top Vape Brands
                <br />
                <span className="grad-text">We Carry</span>
              </h2>
              <p className="text-gray-500 text-sm max-w-lg mx-auto leading-relaxed">
                We stock the most popular and sought-after disposable vape
                brands on the market. Whether you're chasing flavor, battery
                life, or cloud production — we've got you covered.
              </p>
            </div>

            <div className="grid md:grid-cols-2 grid-cols-4 gap-5">
              {VAPE_BRANDS.map((brand, i) => (
                <div
                  key={brand.name}
                  className="brand-pill bg-white rounded-2xl p-6 border border-gray-100 cursor-pointer text-center"
                  style={
                    vapesVis
                      ? {
                          animation: `fadeUp .5s ease both`,
                          animationDelay: `${i * 0.07}s`,
                        }
                      : { opacity: 0 }
                  }
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl shadow-md"
                    style={{
                      background: `${brand.color}18`,
                      border: `2px solid ${brand.color}30`,
                    }}
                  >
                    {brand.emoji}
                  </div>
                  <p className="font-black text-gray-900 text-base mb-1">
                    {brand.name}
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {brand.desc}
                  </p>
                  <div
                    className="mt-3 inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider"
                    style={{
                      background: `${brand.color}15`,
                      color: brand.color,
                    }}
                  >
                    In Stock
                  </div>
                </div>
              ))}
            </div>

            {/* extra note */}
            <div
              className="mt-10 rounded-2xl p-6 text-center"
              style={{
                background: "linear-gradient(135deg,#1e0a3c,#0d1b3e)",
                border: "1px solid rgba(124,58,237,.3)",
              }}
              style={
                vapesVis
                  ? {
                      animation: "fadeUp .6s ease both .5s both",
                      background: "linear-gradient(135deg,#1e0a3c,#0d1b3e)",
                      border: "1px solid rgba(124,58,237,.3)",
                    }
                  : { opacity: 0 }
              }
            >
              <p className="text-white font-black text-lg mb-1">
                …and 40+ More Vape Brands
              </p>
              <p className="text-gray-400 text-sm">
                We continuously add new brands. Ask in-store or browse our full
                catalog online.
              </p>
              <button
                className="mt-4 px-7 py-2.5 rounded-full text-sm font-black text-white transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg,#7c3aed,#a855f7)",
                }}
              >
                View All Vapes →
              </button>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════
            SMOKE & WELLNESS CATEGORIES
        ══════════════════════════════ */}
        <section className="py-20 px-8 bg-white" ref={smokeRef}>
          <div className="max-w-6xl mx-auto">
            <div
              className="text-center mb-14"
              style={
                smokeVis
                  ? { animation: "fadeUp .6s ease both" }
                  : { opacity: 0 }
              }
            >
              <p
                className="text-xs uppercase tracking-widest font-bold mb-3"
                style={{ color: "#a78bfa" }}
              >
                Full Product Range
              </p>
              <h2 className="text-4xl font-black text-gray-900 mb-3">
                Smoke, Wellness &<br />
                <span className="grad-text">Beyond</span>
              </h2>
              <p className="text-gray-500 text-sm max-w-lg mx-auto leading-relaxed">
                Beyond vapes, MiniStore stocks a comprehensive range of smoke
                accessories and wellness products — all lab-tested and
                compliant.
              </p>
            </div>

            <div className="grid md:grid-cols-1 lg:grid-cols-2 grid-cols-3 gap-6">
              {SMOKE_CATEGORIES.map((cat, i) => (
                <div
                  key={cat.title}
                  className="category-card rounded-2xl p-6 border-2 cursor-pointer"
                  style={
                    smokeVis
                      ? {
                          animation: `fadeUp .55s ease both`,
                          animationDelay: `${i * 0.08}s`,
                          background: cat.bg,
                          borderColor: cat.border,
                        }
                      : {
                          opacity: 0,
                          background: cat.bg,
                          borderColor: cat.border,
                        }
                  }
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-sm"
                      style={{
                        background: "white",
                        border: `2px solid ${cat.border}`,
                      }}
                    >
                      {cat.icon}
                    </div>
                    <div>
                      <h3 className="font-black text-gray-900 text-base leading-tight">
                        {cat.title}
                      </h3>
                      <p
                        className="text-xs mt-1 leading-relaxed"
                        style={{ color: "#6b7280" }}
                      >
                        {cat.desc}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                        style={{
                          background: "white",
                          color: cat.color,
                          border: `1.5px solid ${cat.border}`,
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full inline-block"
                      style={{ background: cat.color }}
                    />
                    <span
                      className="text-xs font-bold"
                      style={{ color: cat.color }}
                    >
                      Always in stock
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════
            WHY CHOOSE US
        ══════════════════════════════ */}
        <section
          className="py-20 px-8"
          style={{
            background:
              "linear-gradient(135deg,#0f0a1e 0%,#1a0533 50%,#0d1b3e 100%)",
          }}
          ref={whyRef}
        >
          <div className="max-w-6xl mx-auto">
            <div
              className="text-center mb-14"
              style={
                whyVis ? { animation: "fadeUp .6s ease both" } : { opacity: 0 }
              }
            >
              <p
                className="text-xs uppercase tracking-widest font-bold mb-3"
                style={{ color: "#a78bfa" }}
              >
                Why MiniStore
              </p>
              <h2 className="text-4xl font-black text-white mb-3">
                Why Customers
                <br />
                <span className="grad-text">Choose Us</span>
              </h2>
              <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
                We're not just a store — we're enthusiasts who care deeply about
                every product we put on our shelves.
              </p>
            </div>

            <div className="grid md:grid-cols-1 lg:grid-cols-2 grid-cols-3 gap-5">
              {WHY_US.map((item, i) => (
                <div
                  key={item.title}
                  className="rounded-2xl p-6 card-lift cursor-default"
                  style={
                    whyVis
                      ? {
                          animation: `fadeUp .5s ease both`,
                          animationDelay: `${i * 0.09}s`,
                          background: "rgba(124,58,237,.12)",
                          border: "1px solid rgba(167,139,250,.2)",
                        }
                      : {
                          opacity: 0,
                          background: "rgba(124,58,237,.12)",
                          border: "1px solid rgba(167,139,250,.2)",
                        }
                  }
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-black text-white text-base mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════
            CTA BANNER
        ══════════════════════════════ */}
        <section
          className="py-20 px-8 relative overflow-hidden"
          ref={ctaRef}
          style={{
            background:
              "linear-gradient(135deg,#7c3aed 0%,#a855f7 50%,#ec4899 100%)",
            backgroundSize: "200% 200%",
            animation: "gradMove 6s ease infinite",
          }}
        >
          <div
            className="max-w-3xl mx-auto text-center relative z-10"
            style={
              ctaVis ? { animation: "fadeUp .7s ease both" } : { opacity: 0 }
            }
          >
            <p className="text-purple-200 text-xs uppercase tracking-widest font-bold mb-3">
              Ready to Shop?
            </p>
            <h2 className="md:text-4xl text-5xl font-black text-white mb-5 leading-tight">
              Discover the Best
              <br />
              Vapes &amp; Smoke Products
            </h2>
            <p className="text-purple-100 text-sm leading-relaxed mb-10 max-w-lg mx-auto">
              Browse our full catalog of 500+ products — from top vape brands to
              THC-A flowers, pre-rolls, booster shots and everything in between.
              Order online & pickup offline.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <button className="px-10 py-4 rounded-full font-black text-base text-purple-700 bg-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl">
                Shop All Products
              </button>
              <button className="px-10 py-4 rounded-full font-black text-base text-white border-2 border-white/40 transition-all hover:scale-105 hover:bg-white/10">
                Contact Us
              </button>
            </div>
          </div>
          {/* deco circles */}
          <div
            className="absolute -top-20 -left-20 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: "rgba(255,255,255,.07)" }}
          />
          <div
            className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
            style={{ background: "rgba(0,0,0,.1)" }}
          />
          <div
            className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full pointer-events-none -translate-y-1/2"
            style={{ background: "rgba(255,255,255,.05)" }}
          />
        </section>

        {/* ── NEWSLETTER ── */}
        <section
          className="py-16 px-8 text-center relative overflow-hidden"
          style={{ background: "#1a0533" }}
        >
          <div className="max-w-xl mx-auto relative z-10">
            <p className="text-purple-400 text-xs uppercase tracking-widest mb-2 font-semibold">
              Stay in the loop
            </p>
            <h3 className="text-3xl font-black text-white uppercase tracking-wider mb-2">
              Subscribe Us Now
            </h3>
            <p className="text-gray-400 text-sm mb-8">
              Get first access to new arrivals, restocks and exclusive deals.
            </p>
            <div className="flex max-w-md mx-auto rounded-xl overflow-hidden shadow-xl">
              <input
                type="email"
                placeholder="Enter your email address..."
                className="flex-1 px-5 py-3.5 text-sm outline-none border-0 bg-white text-gray-800 placeholder-gray-400"
              />
              <button
                className="text-white font-bold text-sm px-6 py-3.5 transition-colors whitespace-nowrap"
                style={{ background: "#7c3aed" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#6d28d9")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#7c3aed")
                }
              >
                SUBSCRIBE
              </button>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="bg-gray-900 text-gray-400 pt-14 pb-6 px-8">
          <div className="max-w-6xl mx-auto grid md:grid-cols-1 grid-cols-4 gap-10 pb-10 border-b border-gray-700">
            <div>
              <p className="text-white font-black text-xl mb-3">
                MiniStore<span style={{ color: "#7c3aed" }}>.</span>
              </p>
              <p className="text-sm leading-relaxed text-gray-500 mb-5">
                Your one-stop shop for premium vapes, smoke accessories and
                wellness products. 500+ SKUs always in stock.
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

        {/* age disclaimer */}
        <div className="bg-gray-950 py-3 px-6 text-center">
          <p className="text-xs text-gray-600">
            ⚠️ Products sold are intended for adults 21+ only. Please consume
            responsibly and in accordance with local laws.
          </p>
        </div>
      </div>
    </>
  );
}
