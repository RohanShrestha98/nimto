import { useState, useEffect } from "react";

const IMG = {
  hero1:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85",
  hero2:
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=900&q=85",
  hero3:
    "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=900&q=85",
  tour1:
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=700&q=85",
  tour2:
    "https://images.unsplash.com/photo-1522083165195-3424ed129620?w=700&q=85",
  tour3:
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700&q=85",
  d1: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=200&q=80",
  d2: "https://images.unsplash.com/photo-1541336032412-2048a678540d?w=200&q=80",
  d3: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=200&q=80",
  d4: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=200&q=80",
  d5: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=200&q=80",
  d6: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=200&q=80",
  d7: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=200&q=80",
  d8: "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?w=200&q=80",
  h1: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=85",
  h2: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=700&q=85",
  h3: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=700&q=85",
  h4: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=700&q=85",
  n1: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=700&q=85",
  n2: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&q=85",
  n3: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=700&q=85",
  n4: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=700&q=85",
  n5: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=700&q=85",
  n6: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=700&q=85",
  nw1: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=700&q=85",
  nw2: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=700&q=85",
  nw3: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=700&q=85",
  p1: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=700&q=85",
  p2: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=700&q=85",
  hw1: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=700&q=85",
  hw2: "https://images.unsplash.com/photo-1522199710521-72d69614c702?w=700&q=85",
  hw3: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=700&q=85",
  hw4: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=700&q=85",
  av1: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80",
  av2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80",
  av3: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80",
};

function useBreakpoint() {
  const [bp, setBp] = useState("desktop");
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setBp(w < 640 ? "mobile" : w < 1024 ? "tablet" : "desktop");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return bp;
}

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".sr");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("sr-v");
        }),
      { threshold: 0.08 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

const Css = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,700;12..96,800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{font-family:'DM Sans',sans-serif;background:#f7f5f0;color:#1c1917;-webkit-font-smoothing:antialiased}
    .hd{font-family:'Bricolage Grotesque',sans-serif}
    .sr{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease}
    .sr-v{opacity:1;transform:translateY(0)}
    .d1{transition-delay:.1s}.d2{transition-delay:.18s}.d3{transition-delay:.26s}.d4{transition-delay:.34s}
    @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-11px)}}
    @keyframes pls{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
    @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
    @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    .fly{animation:floatY 4.5s ease-in-out infinite}
    .pls{animation:pls 2.2s ease-in-out infinite}
    .fu{animation:fadeUp .7s ease both}
    .fi{animation:fadeIn .8s ease both}
    .lift{transition:transform .28s ease,box-shadow .28s ease;cursor:pointer}
    .lift:hover{transform:translateY(-6px);box-shadow:0 18px 48px rgba(0,0,0,.11)}
    .iz{overflow:hidden}
    .iz img{transition:transform .5s ease;display:block;width:100%;height:100%;object-fit:cover}
    .iz:hover img{transform:scale(1.07)}
    .nl{position:relative;transition:color .2s;text-decoration:none}
    .nl::after{content:'';position:absolute;bottom:-3px;left:0;width:0;height:2px;background:#f59e0b;border-radius:2px;transition:width .3s}
    .nl:hover::after{width:100%}
    .bp{transition:transform .2s ease}
    .bp:hover{transform:scale(1.035)}
    .bp:active{transform:scale(0.97)}
    input,select{font-family:'DM Sans',sans-serif;outline:none}
    input:focus{border-color:#f59e0b!important;box-shadow:0 0 0 3px rgba(245,158,11,.18)!important}
    ::-webkit-scrollbar{width:5px}
    ::-webkit-scrollbar-thumb{background:#d1d5db;border-radius:4px}
    .hs{display:flex;gap:8px;overflow-x:auto;padding-bottom:2px;scrollbar-width:none;-ms-overflow-style:none}
    .hs::-webkit-scrollbar{display:none}
    .ticker-w{overflow:hidden;background:#f59e0b;padding:9px 0}
    .ticker-t{display:flex;width:max-content;animation:ticker 30s linear infinite}
    .ticker-i{white-space:nowrap;padding:0 44px;font-size:13px;font-weight:600;color:#1c1917}
    .mob-menu{position:fixed;inset:0;background:rgba(15,23,42,.97);z-index:1200;display:flex;flex-direction:column;padding:28px 24px;overflow-y:auto}
    @media(max-width:639px){
      .g3{display:grid;grid-template-columns:1fr;gap:18px}
      .g4{display:grid;grid-template-columns:1fr 1fr;gap:14px}
      .g2{display:grid;grid-template-columns:1fr;gap:18px}
    }
    @media(min-width:640px) and (max-width:1023px){
      .g3{display:grid;grid-template-columns:1fr 1fr;gap:20px}
      .g4{display:grid;grid-template-columns:1fr 1fr;gap:18px}
      .g2{display:grid;grid-template-columns:1fr 1fr;gap:20px}
    }
    @media(min-width:1024px){
      .g3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
      .g4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
      .g2{display:grid;grid-template-columns:1fr 1fr;gap:24px}
    }
  `}</style>
);

function Logo({ light = false, size = 22 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <svg width={size + 14} height={size + 14} viewBox="0 0 44 44" fill="none">
        <defs>
          <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        <rect width="44" height="44" rx="13" fill="url(#lg1)" />
        <circle
          cx="22"
          cy="22"
          r="11.5"
          fill="none"
          stroke="white"
          strokeWidth="1.2"
          strokeOpacity=".4"
        />
        <line
          x1="22"
          y1="10"
          x2="22"
          y2="34"
          stroke="white"
          strokeWidth=".9"
          strokeOpacity=".22"
        />
        <line
          x1="10"
          y1="22"
          x2="34"
          y2="22"
          stroke="white"
          strokeWidth=".9"
          strokeOpacity=".22"
        />
        <path d="M17 13.5 L28 22 L17 30.5 L21.5 22 Z" fill="white" />
        <circle cx="22" cy="22" r="2.8" fill="#f59e0b" />
      </svg>
      <span
        className="hd"
        style={{
          fontWeight: 800,
          fontSize: size,
          letterSpacing: "-.6px",
          color: light ? "white" : "#1c1917",
        }}
      >
        nim<span style={{ color: "#f59e0b" }}>to</span>
      </span>
    </div>
  );
}

function Stars({ n = 5, sz = 12 }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          width={sz}
          height={sz}
          viewBox="0 0 20 20"
          fill={i < n ? "#f59e0b" : "#e5e7eb"}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function Ticker() {
  const items = [
    "✈ Bali from $299",
    "🏨 5-Star Hotels 40% off",
    "🗺 500+ Destinations",
    "⭐ 12,000+ Travelers",
    "🎫 Instant Booking",
    "🌊 Beach Escapes from $199",
  ];
  const all = [...items, ...items];
  return (
    <div className="ticker-w">
      <div className="ticker-t">
        {all.map((t, i) => (
          <span key={i} className="ticker-i">
            {t} &nbsp;·
          </span>
        ))}
      </div>
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const bp = useBreakpoint();
  const isMob = bp === "mobile";
  const isTab = bp === "tablet";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Tours", "Destinations", "Hotels", "Flights", "Activities"];

  return (
    <>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 900,
          background: scrolled
            ? "rgba(247,245,240,.97)"
            : "rgba(247,245,240,.99)",
          backdropFilter: "blur(16px)",
          boxShadow: scrolled
            ? "0 2px 24px rgba(0,0,0,.08)"
            : "0 1px 0 #ede9dc",
          transition: "box-shadow .3s",
        }}
      >
        <div
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            padding: `0 ${isMob ? "18px" : "24px"}`,
            height: isMob ? 60 : 68,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Logo size={isMob ? 20 : 22} />

          {!isMob && !isTab && (
            <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
              {links.map((l) => (
                <a
                  key={l}
                  href="#"
                  className="nl"
                  style={{ fontSize: 14, fontWeight: 500, color: "#44403c" }}
                >
                  {l}
                </a>
              ))}
            </div>
          )}

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {!isMob && (
              <button
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#44403c",
                }}
              >
                Sign In
              </button>
            )}
            <button
              className="bp"
              style={{
                background: "linear-gradient(135deg,#f59e0b,#ef4444)",
                border: "none",
                cursor: "pointer",
                color: "white",
                fontSize: 13,
                fontWeight: 700,
                padding: isMob ? "8px 16px" : "10px 22px",
                borderRadius: 50,
                boxShadow: "0 4px 16px rgba(245,158,11,.32)",
              }}
            >
              {isMob ? "Start" : "Get Started"}
            </button>
            {(isMob || isTab) && (
              <button
                onClick={() => setOpen(true)}
                style={{
                  background: "none",
                  border: "1.5px solid #e7e2d9",
                  borderRadius: 10,
                  padding: "7px 10px",
                  cursor: "pointer",
                  fontSize: 18,
                  lineHeight: 1,
                }}
              >
                ☰
              </button>
            )}
          </div>
        </div>
      </nav>

      {open && (
        <div className="mob-menu">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 36,
            }}
          >
            <Logo light size={22} />
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: 28,
                cursor: "pointer",
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          </div>
          {links.map((l) => (
            <a
              key={l}
              href="#"
              onClick={() => setOpen(false)}
              className="hd"
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: "white",
                textDecoration: "none",
                padding: "16px 0",
                borderBottom: "1px solid rgba(255,255,255,.09)",
              }}
            >
              {l}
            </a>
          ))}
          <button
            onClick={() => setOpen(false)}
            style={{
              marginTop: 28,
              background: "linear-gradient(135deg,#f59e0b,#ef4444)",
              border: "none",
              cursor: "pointer",
              color: "white",
              fontSize: 15,
              fontWeight: 700,
              padding: "14px",
              borderRadius: 14,
            }}
          >
            Sign In / Register
          </button>
        </div>
      )}
    </>
  );
}

function Hero() {
  const [tab, setTab] = useState("Tours");
  const [idx, setIdx] = useState(0);
  const bp = useBreakpoint();
  const isMob = bp === "mobile";
  const isTab = bp === "tablet";
  const tabs = ["Tours", "Hotels", "Tickets", "Activities"];
  const imgs = [IMG.hero1, IMG.hero2, IMG.hero3];

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % 3), 4200);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        background:
          "linear-gradient(150deg,#fff9ed 0%,#fef3c7 45%,#e0f2fe 100%)",
        overflow: "hidden",
      }}
    >
      {[
        { w: 90, h: 90, t: "8%", l: "3%", bg: "#fde68a", d: "0s" },
        { w: 55, h: 55, t: "65%", l: "1.5%", bg: "#bfdbfe", d: "1.2s" },
        { w: 65, h: 65, t: "18%", r: "6%", bg: "#fca5a5", d: "2.1s" },
        { w: 42, h: 42, t: "78%", r: "4%", bg: "#a7f3d0", d: ".6s" },
      ].map((p, i) => (
        <div
          key={i}
          className="fly"
          style={{
            position: "absolute",
            width: p.w,
            height: p.h,
            top: p.t,
            left: p.l,
            right: p.r,
            borderRadius: "50%",
            background: p.bg,
            opacity: 0.28,
            animationDelay: p.d,
            pointerEvents: "none",
          }}
        />
      ))}

      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: isMob
            ? "40px 18px 32px"
            : isTab
              ? "52px 28px 40px"
              : "64px 24px 48px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMob
              ? "1fr"
              : isTab
                ? "1fr 1fr"
                : "1.1fr 1fr",
            gap: isMob ? 32 : 56,
            alignItems: "center",
          }}
        >
          {/* Left */}
          <div>
            <div
              className="fu"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(245,158,11,.13)",
                border: "1px solid rgba(245,158,11,.3)",
                color: "#b45309",
                fontSize: 12,
                fontWeight: 700,
                padding: "6px 14px",
                borderRadius: 50,
                marginBottom: 18,
              }}
            >
              <span
                className="pls"
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#f59e0b",
                  display: "inline-block",
                }}
              />
              ✈ Discover the Nepal with Nimto
            </div>

            <h1
              className="hd fu"
              style={{
                fontSize: isMob ? 38 : isTab ? 50 : 62,
                fontWeight: 800,
                lineHeight: 1.06,
                color: "#1c1917",
                marginBottom: 18,
                letterSpacing: "-1px",
                animationDelay: ".1s",
              }}
            >
              Book Your <br />
              Next Journey
              <br />
              with
              <span
                style={{
                  background: "linear-gradient(135deg,#f59e0b,#ef4444)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {" "}
                Nimto
              </span>
            </h1>

            <p
              className="fu"
              style={{
                color: "#78716c",
                fontSize: isMob ? 14 : 15,
                lineHeight: 1.8,
                marginBottom: 26,
                maxWidth: 420,
                animationDelay: ".2s",
              }}
            >
              Crafting Exceptional Journeys — Your Global Escape Planner.
              Seamless Travel, Extraordinary Adventures.
            </p>

            <div
              className="fu"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                animationDelay: ".3s",
              }}
            >
              <div style={{ display: "flex" }}>
                {[IMG.av1, IMG.av2, IMG.av3].map((av, i) => (
                  <img
                    key={i}
                    src={av}
                    alt=""
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      border: "2.5px solid white",
                      marginLeft: i > 0 ? -9 : 0,
                      objectFit: "cover",
                    }}
                  />
                ))}
              </div>
              <div>
                <Stars n={5} sz={13} />
                <p style={{ fontSize: 12, color: "#78716c", marginTop: 2 }}>
                  <b style={{ color: "#1c1917" }}>4.9</b> · 12,000+ Happy
                  Travelers
                </p>
              </div>
            </div>
          </div>

          {/* Right collage — hidden on mobile */}
          {!isMob && (
            <div
              className="fi"
              style={{ position: "relative", height: isTab ? 300 : 380 }}
            >
              <div
                className="fly"
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: isTab ? 185 : 220,
                  height: isTab ? 215 : 262,
                  borderRadius: 22,
                  overflow: "hidden",
                  boxShadow: "0 22px 60px rgba(0,0,0,.14)",
                }}
              >
                <img
                  src={imgs[idx]}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "opacity 1.2s",
                  }}
                />
              </div>
              <div
                className="fly"
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: isTab ? 118 : 144,
                  width: isTab ? 150 : 174,
                  height: isTab ? 172 : 200,
                  borderRadius: 18,
                  overflow: "hidden",
                  boxShadow: "0 16px 44px rgba(0,0,0,.12)",
                  animationDelay: ".6s",
                }}
              >
                <img
                  src={IMG.hero2}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div
                className="fly"
                style={{
                  position: "absolute",
                  top: 48,
                  right: isTab ? 226 : 250,
                  width: isTab ? 136 : 154,
                  height: isTab ? 154 : 174,
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 12px 32px rgba(0,0,0,.1)",
                  animationDelay: "1.1s",
                }}
              >
                <img
                  src={IMG.hero3}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div
                className="pls"
                style={{
                  position: "absolute",
                  top: 14,
                  left: 8,
                  background: "white",
                  borderRadius: 14,
                  padding: "9px 13px",
                  boxShadow: "0 8px 24px rgba(0,0,0,.1)",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#1c1917",
                }}
              >
                🏆 #1 Travel Platform
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 28,
                  left: 0,
                  background: "white",
                  borderRadius: 14,
                  padding: "10px 14px",
                  boxShadow: "0 8px 24px rgba(0,0,0,.1)",
                  fontSize: 11,
                  maxWidth: 155,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bricolage Grotesque',sans-serif",
                    fontWeight: 700,
                    color: "#1c1917",
                    marginBottom: 2,
                  }}
                >
                  ✈️ Next flight
                </div>
                <div style={{ color: "#78716c", fontSize: 11 }}>
                  Paris → Bali · 12h 30m
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search bar */}
        <div
          className="fu"
          style={{
            background: "white",
            borderRadius: 20,
            boxShadow: "0 8px 40px rgba(0,0,0,.09)",
            padding: isMob ? "16px" : "20px 24px",
            marginTop: isMob ? 28 : 44,
            animationDelay: ".4s",
          }}
        >
          <div className="hs" style={{ marginBottom: 16 }}>
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  padding: "7px 18px",
                  borderRadius: 50,
                  border: "none",
                  cursor: "pointer",
                  flexShrink: 0,
                  background:
                    tab === t
                      ? "linear-gradient(135deg,#f59e0b,#ef4444)"
                      : "transparent",
                  color: tab === t ? "white" : "#78716c",
                  transition: "all .25s",
                  boxShadow:
                    tab === t ? "0 4px 12px rgba(245,158,11,.3)" : "none",
                }}
              >
                {t}
              </button>
            ))}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMob
                ? "1fr"
                : isTab
                  ? "1fr 1fr"
                  : "1fr 1fr 1fr 1fr auto",
              gap: 12,
            }}
          >
            {[
              ["📍 Location", "New York, NY"],
              ["📅 Check In", "23 Jan 2025"],
              ["📅 Check Out", "24 Jan 2025"],
              ["👥 Guests", "2 Adults"],
            ].map(([lbl, ph]) => (
              <div key={lbl}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#a8a29e",
                    marginBottom: 5,
                  }}
                >
                  {lbl}
                </div>
                <input
                  placeholder={ph}
                  style={{
                    width: "100%",
                    border: "1.5px solid #f0ede8",
                    borderRadius: 10,
                    padding: "10px 13px",
                    fontSize: 13,
                    color: "#1c1917",
                    background: "#fafaf8",
                    transition: "border-color .2s",
                  }}
                />
              </div>
            ))}
            <button
              className="bp"
              style={{
                alignSelf: "flex-end",
                background: "linear-gradient(135deg,#f59e0b,#ef4444)",
                border: "none",
                cursor: "pointer",
                color: "white",
                fontSize: 14,
                fontWeight: 700,
                padding: "12px 28px",
                borderRadius: 12,
                boxShadow: "0 6px 20px rgba(245,158,11,.35)",
                whiteSpace: "nowrap",
              }}
            >
              🔍 Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SecHead({ title, sub, nav = false }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: 32,
        gap: 14,
      }}
    >
      <div>
        <h2
          className="sr hd"
          style={{
            fontSize: 26,
            fontWeight: 800,
            color: "#1c1917",
            letterSpacing: "-.4px",
          }}
        >
          {title}
        </h2>
        {sub && (
          <p
            className="sr"
            style={{ fontSize: 13, color: "#a8a29e", marginTop: 5 }}
          >
            {sub}
          </p>
        )}
      </div>
      {nav && (
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          {["←", "→"].map((a) => (
            <button
              key={a}
              className="bp"
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "1.5px solid #e7e2d9",
                background: "white",
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              {a}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function TourCard({ img, title, duration, guests, price, del = 0 }) {
  return (
    <div
      className="lift sr iz"
      style={{
        background: "white",
        borderRadius: 20,
        overflow: "hidden",
        border: "1px solid #f0ede8",
        transitionDelay: `${del}s`,
      }}
    >
      <div style={{ height: 185, position: "relative", overflow: "hidden" }}>
        <img
          src={img}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform .5s ease",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.07)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        />
        <button
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            width: 33,
            height: 33,
            borderRadius: "50%",
            background: "rgba(255,255,255,.92)",
            border: "none",
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          ♡
        </button>
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: 12,
            background: "rgba(0,0,0,.42)",
            backdropFilter: "blur(4px)",
            color: "white",
            fontSize: 11,
            fontWeight: 700,
            padding: "4px 10px",
            borderRadius: 20,
          }}
        >
          ⭐ 5.0
        </div>
      </div>
      <div style={{ padding: 16 }}>
        <h3
          className="hd"
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "#1c1917",
            marginBottom: 8,
            lineHeight: 1.4,
          }}
        >
          {title}
        </h3>
        <div style={{ display: "flex", gap: 14, marginBottom: 12 }}>
          <span style={{ fontSize: 11, color: "#a8a29e" }}>⏱ {duration}</span>
          <span style={{ fontSize: 11, color: "#a8a29e" }}>👤 {guests}</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #f7f5f0",
            paddingTop: 10,
          }}
        >
          <div>
            <span style={{ fontSize: 11, color: "#a8a29e" }}>From </span>
            <span
              className="hd"
              style={{ fontSize: 18, fontWeight: 800, color: "#1c1917" }}
            >
              {price}
            </span>
          </div>
          <button
            className="bp"
            style={{
              background: "linear-gradient(135deg,#f59e0b,#ef4444)",
              border: "none",
              cursor: "pointer",
              color: "white",
              fontSize: 11,
              fontWeight: 700,
              padding: "7px 14px",
              borderRadius: 50,
              boxShadow: "0 3px 10px rgba(245,158,11,.3)",
            }}
          >
            Book Now →
          </button>
        </div>
      </div>
    </div>
  );
}

const TOURS = [
  {
    img: IMG.tour1,
    title: "California Sunset/Twilight Boat Cruise",
    duration: "3 days/2 nights",
    guests: "4 guests",
    price: "$48.25",
  },
  {
    img: IMG.tour2,
    title: "NYC Food Tastings and Culture Tour",
    duration: "3 days/2 nights",
    guests: "4 guests",
    price: "$17.32",
  },
  {
    img: IMG.tour3,
    title: "Grand Canyon Horseshoe Bend 3 Days",
    duration: "3 days/2 nights",
    guests: "4 guests",
    price: "$19.63",
  },
];

function ToursSection() {
  const bp = useBreakpoint();
  const isMob = bp === "mobile";
  return (
    <section
      style={{
        maxWidth: 1240,
        margin: "0 auto",
        padding: isMob ? "52px 18px" : "72px 24px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 32,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <h2
            className="sr hd"
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: "#1c1917",
              letterSpacing: "-.4px",
            }}
          >
            Our Featured Tours
          </h2>
          <p
            className="sr"
            style={{ fontSize: 13, color: "#a8a29e", marginTop: 5 }}
          >
            Favorite destinations based on customer reviews
          </p>
        </div>
        <div className="hs">
          {["Category ↓", "Country ↓", "Theme Trip ↓", "Price Range ↓"].map(
            (f) => (
              <button
                key={f}
                style={{
                  fontSize: 12,
                  border: "1.5px solid #e7e2d9",
                  padding: "6px 13px",
                  borderRadius: 50,
                  background: "white",
                  cursor: "pointer",
                  color: "#6b7280",
                  fontWeight: 600,
                  flexShrink: 0,
                }}
              >
                {f}
              </button>
            ),
          )}
        </div>
      </div>
      <div className="g3">
        {TOURS.map((t, i) => (
          <TourCard key={i} {...t} del={i * 0.12} />
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 36 }}>
        <button
          className="bp"
          style={{
            border: "1.5px solid #e7e2d9",
            background: "white",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 700,
            color: "#44403c",
            padding: "12px 32px",
            borderRadius: 50,
          }}
        >
          View All Tours →
        </button>
      </div>
    </section>
  );
}

const DESTS = [
  { name: "Amsterdam", count: "245 Tours", img: IMG.d1 },
  { name: "Barcelona", count: "182 Tours", img: IMG.d2 },
  { name: "Budapest", count: "134 Tours", img: IMG.d3 },
  { name: "London", count: "310 Tours", img: IMG.d4 },
  { name: "Santorini", count: "98 Tours", img: IMG.d5 },
  { name: "Odessa", count: "67 Tours", img: IMG.d6 },
  { name: "Bali", count: "221 Tours", img: IMG.d7 },
  { name: "Paris", count: "287 Tours", img: IMG.d8 },
];

function DestsSection() {
  const bp = useBreakpoint();
  const isMob = bp === "mobile";
  return (
    <section
      style={{
        maxWidth: 1240,
        margin: "0 auto",
        padding: isMob ? "0 18px 52px" : "0 24px 72px",
      }}
    >
      <SecHead
        title="Top Searched Destinations"
        sub="Favorite destinations based on customer reviews"
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMob ? "1fr 1fr" : "repeat(4,1fr)",
          gap: 12,
        }}
      >
        {DESTS.map((d, i) => (
          <div
            key={i}
            className="lift sr"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 11,
              background: "white",
              border: "1px solid #f0ede8",
              borderRadius: 16,
              padding: 12,
              transitionDelay: `${i * 0.06}s`,
            }}
          >
            <img
              src={d.img}
              alt={d.name}
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                objectFit: "cover",
                flexShrink: 0,
              }}
            />
            <div>
              <div
                className="hd"
                style={{ fontSize: 13, fontWeight: 700, color: "#1c1917" }}
              >
                {d.name}
              </div>
              <div style={{ fontSize: 11, color: "#a8a29e" }}>{d.count}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PromoSection() {
  const bp = useBreakpoint();
  const isMob = bp === "mobile";
  return (
    <section
      style={{
        maxWidth: 1240,
        margin: "0 auto",
        padding: isMob ? "0 18px 52px" : "0 24px 72px",
      }}
    >
      <div className="g2">
        <div
          className="sr lift"
          style={{
            borderRadius: 24,
            overflow: "hidden",
            position: "relative",
            minHeight: 200,
          }}
        >
          <img
            src={IMG.p1}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg,rgba(245,158,11,.88),rgba(239,68,68,.78))",
            }}
          />
          <div
            style={{
              position: "relative",
              padding: isMob ? "28px 22px" : "36px 32px",
            }}
          >
            <h3
              className="hd"
              style={{
                fontSize: isMob ? 24 : 30,
                fontWeight: 800,
                color: "white",
                lineHeight: 1.2,
                marginBottom: 18,
              }}
            >
              Waking up
              <br />
              in a far
              <br />
              away place
            </h3>
            <button
              className="bp"
              style={{
                background: "white",
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 800,
                color: "#f59e0b",
                padding: "10px 22px",
                borderRadius: 50,
                boxShadow: "0 4px 12px rgba(0,0,0,.15)",
              }}
            >
              Book Now ✈
            </button>
          </div>
        </div>
        <div
          className="sr lift d1"
          style={{
            borderRadius: 24,
            overflow: "hidden",
            position: "relative",
            minHeight: 200,
          }}
        >
          <img
            src={IMG.p2}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg,rgba(99,102,241,.88),rgba(168,85,247,.78))",
            }}
          />
          <div
            style={{
              position: "relative",
              padding: isMob ? "28px 22px" : "36px 32px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,.8)",
                  fontWeight: 600,
                  marginBottom: 6,
                }}
              >
                Big promotion
              </p>
              <h3
                className="hd"
                style={{
                  fontSize: isMob ? 24 : 30,
                  fontWeight: 800,
                  color: "white",
                  lineHeight: 1.2,
                  marginBottom: 6,
                }}
              >
                at the end of
                <br />
                the year
              </h3>
              <p
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,.7)",
                  marginBottom: 18,
                }}
              >
                Limited time offer
              </p>
              <button
                className="bp"
                style={{
                  background: "#f59e0b",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 800,
                  color: "white",
                  padding: "10px 22px",
                  borderRadius: 50,
                  boxShadow: "0 4px 12px rgba(245,158,11,.4)",
                }}
              >
                Book Now →
              </button>
            </div>
            <div
              className="pls"
              style={{
                background: "rgba(239,68,68,.92)",
                color: "white",
                width: 60,
                height: 60,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Bricolage Grotesque',sans-serif",
                fontSize: 17,
                fontWeight: 800,
                boxShadow: "0 8px 24px rgba(239,68,68,.4)",
                flexShrink: 0,
              }}
            >
              40%
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const HOTELS = [
  {
    img: IMG.h1,
    title: "California Sunset/Twilight Boat Cruise",
    loc: "Barceloneta Region",
    price: "$48.25",
  },
  {
    img: IMG.h2,
    title: "NYC Food Tastings and Culture Tour",
    loc: "Barceloneta Region",
    price: "$17.32",
  },
  {
    img: IMG.h3,
    title: "Grand Canyon Horseshoe Bend 3 Days",
    loc: "Barceloneta Region",
    price: "$19.63",
  },
  {
    img: IMG.h4,
    title: "California Sunset Twilight Cruise",
    loc: "Barceloneta Region",
    price: "$68.25",
  },
];

function HotelsSection() {
  const bp = useBreakpoint();
  const isMob = bp === "mobile";
  return (
    <section
      style={{
        background: "linear-gradient(180deg,#fff8f0 0%,#fef3c7 100%)",
        padding: isMob ? "52px 0" : "72px 0",
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: isMob ? "0 18px" : "0 24px",
        }}
      >
        <SecHead
          title="Top Rated Hotels"
          sub="Favorite hotels judged by customer votes at the destination"
          nav
        />
        <div className="g4">
          {HOTELS.map((h, i) => (
            <div
              key={i}
              className="lift sr"
              style={{
                background: "white",
                borderRadius: 20,
                overflow: "hidden",
                border: "1px solid #f0ede8",
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              <div
                style={{
                  height: 155,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <img
                  src={h.img}
                  alt={h.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform .5s",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.transform = "scale(1.07)")
                  }
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                />
                <button
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,.9)",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 14,
                  }}
                >
                  ♡
                </button>
              </div>
              <div style={{ padding: 14 }}>
                <Stars n={5} sz={11} />
                <h3
                  className="hd"
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#1c1917",
                    margin: "6px 0 4px",
                    lineHeight: 1.3,
                  }}
                >
                  {h.title}
                </h3>
                <p style={{ fontSize: 11, color: "#a8a29e", marginBottom: 10 }}>
                  📍 {h.loc}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <span style={{ fontSize: 10, color: "#a8a29e" }}>
                      From{" "}
                    </span>
                    <span
                      className="hd"
                      style={{
                        fontSize: 16,
                        fontWeight: 800,
                        color: "#1c1917",
                      }}
                    >
                      {h.price}
                    </span>
                  </div>
                  <button
                    className="bp"
                    style={{
                      border: "1.5px solid #f59e0b",
                      background: "white",
                      cursor: "pointer",
                      color: "#f59e0b",
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "5px 10px",
                      borderRadius: 50,
                    }}
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  {
    icon: "📍",
    title: "Find Your Destination",
    desc: "Discover the perfect place that fits your travel dreams and budget.",
    bg: "#fff8f0",
    bd: "#fed7aa",
  },
  {
    icon: "🎫",
    title: "Reserve a Ticket",
    desc: "Easily reserve your spot with our secure and simple booking system.",
    bg: "#eff6ff",
    bd: "#bfdbfe",
  },
  {
    icon: "💳",
    title: "Pay and Go",
    desc: "Make your payment and get ready for an extraordinary adventure.",
    bg: "#f0fdf4",
    bd: "#bbf7d0",
  },
];

function HowSection() {
  const bp = useBreakpoint();
  const isMob = bp === "mobile";
  return (
    <section
      style={{
        maxWidth: 1240,
        margin: "0 auto",
        padding: isMob ? "52px 18px" : "80px 24px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMob ? "1fr" : "1fr 1fr",
          gap: isMob ? 40 : 80,
          alignItems: "center",
        }}
      >
        {!isMob && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
              height: 340,
            }}
          >
            {[IMG.hw1, IMG.hw2, IMG.hw3, IMG.hw4].map((src, i) => (
              <div
                key={i}
                className="lift sr"
                style={{
                  borderRadius: 20,
                  overflow: "hidden",
                  marginTop: i % 2 === 1 ? 22 : 0,
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <img
                  src={src}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform .5s",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.transform = "scale(1.07)")
                  }
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                />
              </div>
            ))}
          </div>
        )}
        <div>
          <h2
            className="sr hd"
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: "#1c1917",
              marginBottom: 6,
              letterSpacing: "-.4px",
            }}
          >
            How It Work?
          </h2>
          <p
            className="sr"
            style={{ fontSize: 13, color: "#a8a29e", marginBottom: 28 }}
          >
            Completely tailor your route, specific searches
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {STEPS.map((s, i) => (
              <div
                key={i}
                className="lift sr"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  padding: 18,
                  borderRadius: 16,
                  background: s.bg,
                  border: `1.5px solid ${s.bd}`,
                  transitionDelay: `${i * 0.15}s`,
                }}
              >
                <div style={{ fontSize: 26, lineHeight: 1 }}>{s.icon}</div>
                <div style={{ flex: 1 }}>
                  <h4
                    className="hd"
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#1c1917",
                      marginBottom: 4,
                    }}
                  >
                    {s.title}
                  </h4>
                  <p
                    style={{ fontSize: 12, color: "#78716c", lineHeight: 1.6 }}
                  >
                    {s.desc}
                  </p>
                </div>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 12,
                    color: "#a8a29e",
                    whiteSpace: "nowrap",
                    marginTop: 2,
                  }}
                >
                  Learn More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const NB = [
  {
    img: IMG.n1,
    title: "California Sunset/Twilight Boat Cruise",
    loc: "Barceloneta Region",
    price: "$48.25",
    r: 4.8,
    rev: 58,
  },
  {
    img: IMG.n2,
    title: "NYC Food Tastings and Cultural Tour",
    loc: "Barceloneta Region",
    price: "$17.32",
    r: 4.8,
    rev: 58,
  },
  {
    img: IMG.n3,
    title: "Grand Canyon Horseshoe Bend Tour",
    loc: "Barceloneta Region",
    price: "$19.63",
    r: 4.8,
    rev: 58,
  },
  {
    img: IMG.n4,
    title: "California Sunset/Twilight Boat Cruise",
    loc: "Barceloneta Region",
    price: "$48.25",
    r: 4.8,
    rev: 58,
  },
  {
    img: IMG.n5,
    title: "NYC Food Tastings and Cultural Tour",
    loc: "Barceloneta Region",
    price: "$17.32",
    r: 4.8,
    rev: 58,
  },
  {
    img: IMG.n6,
    title: "Grand Canyon Horseshoe Bend Tour",
    loc: "Barceloneta Region",
    price: "$19.63",
    r: 4.8,
    rev: 58,
  },
];
const FLTRS = [
  "All",
  "Luxury",
  "Standard",
  "Villa",
  "Cottage",
  "Guesthouse",
  "Grand Room",
];

function NearbySection() {
  const [active, setActive] = useState("All");
  const bp = useBreakpoint();
  const isMob = bp === "mobile";
  return (
    <section
      style={{
        maxWidth: 1240,
        margin: "0 auto",
        padding: isMob ? "0 18px 52px" : "0 24px 80px",
      }}
    >
      <SecHead
        title="Popular Nearby"
        sub="Favorite destinations based on your current account"
      />
      <div className="hs" style={{ marginBottom: 22 }}>
        {FLTRS.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className="bp"
            style={{
              fontSize: 12,
              fontWeight: 700,
              padding: "8px 18px",
              borderRadius: 50,
              border: "1.5px solid",
              borderColor: active === f ? "transparent" : "#e7e2d9",
              background:
                active === f
                  ? "linear-gradient(135deg,#f59e0b,#ef4444)"
                  : "white",
              color: active === f ? "white" : "#6b7280",
              cursor: "pointer",
              flexShrink: 0,
              transition: "all .25s",
            }}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="g3">
        {NB.map((t, i) => (
          <div
            key={i}
            className="lift sr"
            style={{
              background: "white",
              borderRadius: 20,
              overflow: "hidden",
              border: "1px solid #f0ede8",
              transitionDelay: `${i * 0.09}s`,
            }}
          >
            <div
              style={{ height: 150, position: "relative", overflow: "hidden" }}
            >
              <img
                src={t.img}
                alt={t.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform .5s",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.07)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              />
              <button
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,.9)",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                ♡
              </button>
            </div>
            <div style={{ padding: 14 }}>
              <p style={{ fontSize: 11, color: "#a8a29e", marginBottom: 4 }}>
                📍 {t.loc}
              </p>
              <h3
                className="hd"
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#1c1917",
                  marginBottom: 10,
                  lineHeight: 1.4,
                }}
              >
                {t.title}
              </h3>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 6,
                }}
              >
                <span
                  style={{ fontSize: 12, fontWeight: 600, color: "#44403c" }}
                >
                  ⭐ {t.r}{" "}
                  <span style={{ color: "#a8a29e", fontWeight: 400 }}>
                    ({t.rev})
                  </span>
                </span>
                <span
                  className="hd"
                  style={{ fontSize: 14, fontWeight: 800, color: "#1c1917" }}
                >
                  {t.price}
                </span>
                <button
                  className="bp"
                  style={{
                    border: "1.5px solid #f59e0b",
                    background: "white",
                    cursor: "pointer",
                    color: "#f59e0b",
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "5px 10px",
                    borderRadius: 50,
                  }}
                >
                  Book
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const REVS = [
  {
    name: "Sara Mohamed",
    role: "Customer",
    img: IMG.av1,
    text: "Nimto made our honeymoon absolutely perfect. The booking was seamless and every recommendation was spot-on. Highly recommend!",
  },
  {
    name: "Marco Silva",
    role: "Frequent Traveler",
    img: IMG.av2,
    text: "The best travel booking platform I've ever used. Clean interface, great prices, and customer support that's always there.",
  },
  {
    name: "Aisha Johnson",
    role: "Adventure Seeker",
    img: IMG.av3,
    text: "I've booked 6 trips through Nimto and every single one has been exceptional. The tour guides they connect you with are world-class.",
  },
];

function ReviewsSection() {
  const bp = useBreakpoint();
  const isMob = bp === "mobile";
  return (
    <section
      style={{
        background: "linear-gradient(135deg,#fafaf8 0%,#f0fdf4 100%)",
        padding: isMob ? "52px 0" : "72px 0",
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: isMob ? "0 18px" : "0 24px",
        }}
      >
        <SecHead
          title="They Love Nimto"
          sub="What our clients are saying about us"
          nav
        />
        <div className="g3">
          {REVS.map((rv, i) => (
            <div
              key={i}
              className="lift sr"
              style={{
                background: "white",
                borderRadius: 20,
                padding: 24,
                border: "1px solid #f0ede8",
                transitionDelay: `${i * 0.12}s`,
              }}
            >
              <Stars n={5} sz={13} />
              <p
                style={{
                  fontSize: 13,
                  color: "#78716c",
                  lineHeight: 1.8,
                  margin: "14px 0 20px",
                }}
              >
                "{rv.text}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <img
                  src={rv.img}
                  alt={rv.name}
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #fde68a",
                  }}
                />
                <div>
                  <p
                    className="hd"
                    style={{ fontSize: 13, fontWeight: 700, color: "#1c1917" }}
                  >
                    {rv.name}
                  </p>
                  <p style={{ fontSize: 11, color: "#a8a29e" }}>{rv.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const NEWS = [
  {
    img: IMG.nw1,
    title: "Ultimate Travel Planning Guide: 12 Tips for a Seamless Journey",
    cat: "Adventure",
    date: "10 January",
  },
  {
    img: IMG.nw2,
    title: "Top 10 Travel Hacks for Budget-Conscious Adventurers",
    cat: "Travel Tips",
    date: "10 January",
  },
  {
    img: IMG.nw3,
    title: "Discovering Hidden Gems: 10 Off-the-Beaten-Path Travel Tips",
    cat: "Tips & Tricks",
    date: "10 January",
  },
];

function NewsSection() {
  const bp = useBreakpoint();
  const isMob = bp === "mobile";
  return (
    <section
      style={{
        maxWidth: 1240,
        margin: "0 auto",
        padding: isMob ? "52px 18px" : "72px 24px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 32,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <h2
            className="sr hd"
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: "#1c1917",
              letterSpacing: "-.4px",
            }}
          >
            News, Tips & Guides
          </h2>
          <p
            className="sr"
            style={{ fontSize: 13, color: "#a8a29e", marginTop: 5 }}
          >
            The best writings of our team as guides and tips
          </p>
        </div>
        <button
          className="bp"
          style={{
            border: "1.5px solid #e7e2d9",
            background: "white",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 700,
            color: "#44403c",
            padding: "10px 24px",
            borderRadius: 50,
          }}
        >
          View More →
        </button>
      </div>
      <div className="g3">
        {NEWS.map((n, i) => (
          <div
            key={i}
            className="lift sr"
            style={{
              background: "white",
              borderRadius: 20,
              overflow: "hidden",
              border: "1px solid #f0ede8",
              cursor: "pointer",
              transitionDelay: `${i * 0.12}s`,
            }}
          >
            <div style={{ height: 172, overflow: "hidden" }}>
              <img
                src={n.img}
                alt={n.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform .5s",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.07)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              />
            </div>
            <div style={{ padding: 18 }}>
              <span
                style={{
                  background: "#fef3c7",
                  color: "#d97706",
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "3px 10px",
                  borderRadius: 50,
                }}
              >
                {n.cat}
              </span>
              <h3
                className="hd"
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#1c1917",
                  margin: "10px 0 12px",
                  lineHeight: 1.4,
                }}
              >
                {n.title}
              </h3>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: 11,
                  color: "#a8a29e",
                }}
              >
                <span>✍ Nimto Editorial</span>
                <span>📅 {n.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  const bp = useBreakpoint();
  const isMob = bp === "mobile";
  const isTab = bp === "tablet";
  const COLS = [
    {
      title: "Services",
      links: [
        "Tour Guide",
        "Travel Packages",
        "Hotel Booking",
        "Flight Booking",
        "Activities",
      ],
    },
    {
      title: "Need Help?",
      links: ["FAQ", "Contact Us", "Privacy Policy", "Terms of Use", "Support"],
    },
    {
      title: "Company",
      links: ["About Us", "Careers", "Press", "Partners", "Blog"],
    },
  ];
  return (
    <footer style={{ background: "#0f172a", color: "white" }}>
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: isMob ? "52px 18px 28px" : "64px 24px 32px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMob
              ? "1fr"
              : isTab
                ? "1fr 1fr"
                : "2fr 1fr 1fr 1fr",
            gap: isMob ? 32 : 48,
            marginBottom: 44,
          }}
        >
          <div>
            <div
              style={{
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <svg width="34" height="34" viewBox="0 0 44 44" fill="none">
                <defs>
                  <linearGradient id="lg2" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                </defs>
                <rect width="44" height="44" rx="13" fill="url(#lg2)" />
                <circle
                  cx="22"
                  cy="22"
                  r="11.5"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.2"
                  strokeOpacity=".4"
                />
                <path d="M17 13.5 L28 22 L17 30.5 L21.5 22 Z" fill="white" />
                <circle cx="22" cy="22" r="2.8" fill="#f59e0b" />
              </svg>
              <span className="hd" style={{ fontWeight: 800, fontSize: 22 }}>
                nim<span style={{ color: "#f59e0b" }}>to</span>
              </span>
            </div>
            <p
              style={{
                fontSize: 13,
                color: "#94a3b8",
                lineHeight: 1.8,
                marginBottom: 24,
                maxWidth: 280,
              }}
            >
              Crafting Exceptional Journeys, Your Global Escape Planner. Unleash
              Your Wanderlust.
            </p>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "white",
                marginBottom: 10,
              }}
            >
              Subscribe For Newsletter
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                placeholder="Your email address"
                style={{
                  flex: 1,
                  background: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: 10,
                  padding: "10px 14px",
                  fontSize: 12,
                  color: "white",
                }}
              />
              <button
                className="bp"
                style={{
                  background: "linear-gradient(135deg,#f59e0b,#ef4444)",
                  border: "none",
                  cursor: "pointer",
                  color: "white",
                  fontSize: 12,
                  fontWeight: 700,
                  padding: "10px 18px",
                  borderRadius: 10,
                }}
              >
                Go →
              </button>
            </div>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <h4
                className="hd"
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "white",
                  marginBottom: 18,
                }}
              >
                {col.title}
              </h4>
              <ul style={{ listStyle: "none" }}>
                {col.links.map((link) => (
                  <li key={link} style={{ marginBottom: 11 }}>
                    <a
                      href="#"
                      style={{
                        fontSize: 13,
                        color: "#94a3b8",
                        textDecoration: "none",
                        transition: "color .2s",
                      }}
                      onMouseEnter={(e) => (e.target.style.color = "#f59e0b")}
                      onMouseLeave={(e) => (e.target.style.color = "#94a3b8")}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          style={{
            borderTop: "1px solid #1e293b",
            paddingTop: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 14,
          }}
        >
          <p style={{ fontSize: 12, color: "#64748b" }}>
            © 2025 Nimto. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["VISA", "MC", "PayPal", "Stripe"].map((p) => (
              <span
                key={p}
                style={{
                  background: "#1e293b",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#94a3b8",
                  padding: "4px 10px",
                  borderRadius: 6,
                }}
              >
                {p}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {["f", "𝕏", "in", "yt"].map((s) => (
              <a
                key={s}
                href="#"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "#1e293b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#94a3b8",
                  textDecoration: "none",
                  transition: "background .2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#f59e0b")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#1e293b")
                }
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Nimto() {
  useScrollReveal();
  return (
    <>
      <Css />
      <Navbar />
      <Ticker />
      <Hero />
      <ToursSection />
      <DestsSection />
      <PromoSection />
      <HotelsSection />
      <HowSection />
      <NearbySection />
      <ReviewsSection />
      <NewsSection />
      <Footer />
    </>
  );
}
