import { useState, useEffect, useRef } from "react";

/* ─── styles matching ShopLite design system ─── */
const injectStyles = () => `
  @keyframes fadeUp    { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeLeft  { from{opacity:0;transform:translateX(-36px)} to{opacity:1;transform:translateX(0)} }
  @keyframes fadeRight { from{opacity:0;transform:translateX(36px)} to{opacity:1;transform:translateX(0)} }
  @keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes ripple    { 0%{transform:scale(1);opacity:.4} 100%{transform:scale(1.28);opacity:0} }
  @keyframes popIn     { 0%{transform:scale(.5);opacity:0} 60%{transform:scale(1.15)} 100%{transform:scale(1);opacity:1} }
  @keyframes spin      { to{transform:rotate(360deg)} }
  @keyframes markerBounce { 0%,100%{transform:translateY(0) scale(1)} 40%{transform:translateY(-12px) scale(1.1)} }

  .anim-fadeUp    { animation:fadeUp   .6s ease both }
  .anim-fadeLeft  { animation:fadeLeft  .6s ease both }
  .anim-fadeRight { animation:fadeRight .6s ease both }
  .anim-float     { animation:float    3.5s ease-in-out infinite }
  .anim-popIn     { animation:popIn .4s ease both }
  .anim-spin      { animation:spin 1s linear infinite }
  .anim-marker    { animation:markerBounce 2s ease-in-out infinite }
  .anim-ripple    { animation:ripple 2s ease-out infinite }

  .d1{animation-delay:.08s} .d2{animation-delay:.16s} .d3{animation-delay:.24s}
  .d4{animation-delay:.32s} .d5{animation-delay:.40s}

  .card-lift { transition:transform .28s ease,box-shadow .28s ease }
  .card-lift:hover { transform:translateY(-5px);box-shadow:0 16px 44px rgba(0,0,0,.10) }

  .nav-link { position:relative }
  .nav-link::after { content:'';position:absolute;bottom:-2px;left:0;width:0;height:2px;background:#7c3aed;transition:width .3s ease }
  .nav-link:hover::after { width:100% }

  .input-field {
    width:100%; padding:14px 16px; border-radius:14px;
    border:2px solid #f3f4f6; background:#fafafa;
    font-size:14px; color:#1f2937; outline:none;
    transition:border-color .25s, background .25s, box-shadow .25s;
    font-family:inherit;
  }
  .input-field:focus {
    border-color:#7c3aed; background:#fff;
    box-shadow:0 0 0 4px rgba(124,58,237,.08);
  }
  .input-field::placeholder { color:#9ca3af }

  .map-ripple {
    position:absolute; top:50%; left:50%;
    transform:translate(-50%,-50%);
    width:72px; height:72px; border-radius:50%;
    background:rgba(124,58,237,.2);
    animation:ripple 2s ease-out infinite;
    pointer-events:none;
  }

  ::-webkit-scrollbar { width:5px }
  ::-webkit-scrollbar-track { background:#f9fafb }
  ::-webkit-scrollbar-thumb { background:#ddd6fe; border-radius:4px }
`;

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

/* ──────────────────────────────────────────
   STATIC SVG MAP
────────────────────────────────────────── */
function StoreMap() {
  const [tooltip, setTooltip] = useState(false);

  return (
    <div className="relative w-full" style={{ height: 400 }}>
      {/* base gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(145deg,#f5f3ff 0%,#ede9fe 50%,#e0e7ff 100%)",
        }}
      />

      {/* SVG road grid */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 700 400"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* block fills */}
        {[50, 130, 210, 290, 350].map((y, yi) =>
          [50, 140, 230, 320, 410, 500, 590].map((x, xi) => (
            <rect
              key={`b${yi}-${xi}`}
              x={x}
              y={y}
              width="82"
              height="72"
              rx="6"
              fill="white"
              opacity="0.55"
            />
          )),
        )}
        {/* horizontal roads */}
        {[50, 130, 210, 290, 350].map((y) => (
          <rect
            key={`hr${y}`}
            x="0"
            y={y + 72}
            width="700"
            height="16"
            fill="#c4b5fd"
            opacity="0.45"
            rx="2"
          />
        ))}
        {/* vertical roads */}
        {[50, 140, 230, 320, 410, 500, 590].map((x) => (
          <rect
            key={`vr${x}`}
            x={x + 82}
            y="0"
            width="14"
            height="400"
            fill="#c4b5fd"
            opacity="0.45"
            rx="2"
          />
        ))}
        {/* main highlighted avenues */}
        <rect
          x="0"
          y="196"
          width="700"
          height="22"
          fill="#a78bfa"
          opacity="0.35"
          rx="3"
        />
        <rect
          x="339"
          y="0"
          width="22"
          height="400"
          fill="#a78bfa"
          opacity="0.35"
          rx="3"
        />

        {/* park */}
        <rect
          x="52"
          y="52"
          width="82"
          height="72"
          rx="8"
          fill="#bbf7d0"
          opacity="0.85"
        />
        <text
          x="93"
          y="92"
          textAnchor="middle"
          fontSize="10"
          fill="#15803d"
          fontWeight="800"
        >
          🌿 PARK
        </text>

        {/* lake */}
        <ellipse
          cx="560"
          cy="330"
          rx="90"
          ry="45"
          fill="#bfdbfe"
          opacity="0.75"
        />
        <text
          x="560"
          y="334"
          textAnchor="middle"
          fontSize="10"
          fill="#1d4ed8"
          fontWeight="700"
        >
          LAKE VIEW
        </text>

        {/* street labels */}
        <text
          x="180"
          y="192"
          textAnchor="middle"
          fontSize="9"
          fill="#7c3aed"
          fontWeight="700"
        >
          Tech Avenue
        </text>
        <text
          x="430"
          y="192"
          textAnchor="middle"
          fontSize="9"
          fill="#7c3aed"
          fontWeight="700"
        >
          Main Blvd
        </text>
        <text
          x="338"
          y="100"
          textAnchor="middle"
          fontSize="9"
          fill="#7c3aed"
          fontWeight="700"
          transform="rotate(-90,338,100)"
        >
          Market St
        </text>
        <text
          x="338"
          y="310"
          textAnchor="middle"
          fontSize="9"
          fill="#7c3aed"
          fontWeight="700"
          transform="rotate(-90,338,310)"
        >
          5th Ave
        </text>
        <text x="93" y="147" textAnchor="middle" fontSize="8" fill="#6b7280">
          Oak St
        </text>
        <text x="175" y="147" textAnchor="middle" fontSize="8" fill="#6b7280">
          Elm Ave
        </text>
        <text x="430" y="147" textAnchor="middle" fontSize="8" fill="#6b7280">
          Park Rd
        </text>
        <text x="515" y="147" textAnchor="middle" fontSize="8" fill="#6b7280">
          Harbor Dr
        </text>
      </svg>

      {/* Nearby POI pins */}
      {[
        { x: "18%", y: "72%", icon: "☕", label: "Coffee" },
        { x: "72%", y: "20%", icon: "🛍️", label: "Mall" },
        { x: "80%", y: "55%", icon: "🏨", label: "Hotel" },
        { x: "12%", y: "42%", icon: "🏦", label: "Bank" },
        { x: "60%", y: "75%", icon: "🍕", label: "Dining" },
      ].map((m) => (
        <div
          key={m.label}
          className="absolute flex flex-col items-center"
          style={{ left: m.x, top: m.y, transform: "translate(-50%,-50%)" }}
        >
          <div className="w-8 h-8 rounded-xl bg-white shadow-md flex items-center justify-center text-base border border-gray-100 hover:scale-110 transition-transform cursor-pointer">
            {m.icon}
          </div>
          <span className="text-[9px] font-bold text-gray-500 mt-0.5 bg-white/90 px-1.5 py-0.5 rounded-md shadow-sm">
            {m.label}
          </span>
        </div>
      ))}

      {/* MAIN store pin — center */}
      <div
        className="absolute"
        style={{ left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}
      >
        <div className="map-ripple" />
        <div
          className="relative z-10 flex flex-col items-center cursor-pointer"
          style={{ animation: "markerBounce 2.2s ease-in-out infinite" }}
          onMouseEnter={() => setTooltip(true)}
          onMouseLeave={() => setTooltip(false)}
        >
          {tooltip && (
            <div
              className="anim-popIn absolute z-20 flex flex-col items-start gap-0.5 bg-gray-900 text-white rounded-2xl px-4 py-3 shadow-2xl whitespace-nowrap"
              style={{
                bottom: "calc(100% + 12px)",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <p className="font-black text-sm">MiniStore.</p>
              <p className="text-gray-300 text-xs">
                123 Tech Avenue, Suite 400
              </p>
              <p className="text-gray-300 text-xs">San Francisco, CA 94105</p>
              <div className="flex items-center gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    width="10"
                    height="10"
                    viewBox="0 0 20 20"
                    fill="#facc15"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-yellow-400 text-[10px] font-bold ml-1">
                  4.9 (2.3k)
                </span>
              </div>
              {/* arrow */}
              <div
                className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full w-0 h-0"
                style={{
                  borderLeft: "7px solid transparent",
                  borderRight: "7px solid transparent",
                  borderTop: "7px solid #111827",
                }}
              />
            </div>
          )}
          {/* pin circle */}
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl border-4 border-white"
            style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }}
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="white"
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
          {/* needle */}
          <div
            className="w-3 h-3 -mt-1 rotate-45 shadow"
            style={{ background: "#7c3aed", borderRadius: "0 0 4px 0" }}
          />
        </div>
      </div>

      {/* Top-left label */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2.5 shadow-lg border border-purple-100">
        <div className="flex items-center gap-2">
          <span className="text-base">📍</span>
          <div>
            <p className="text-xs font-black text-gray-900">
              San Francisco, CA
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5">123 Tech Avenue</p>
          </div>
        </div>
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-1 shadow-lg">
        {["+", "−"].map((btn) => (
          <button
            key={btn}
            className="w-9 h-9 bg-white rounded-xl text-gray-600 font-black text-lg hover:bg-purple-50 transition-colors border border-gray-100 flex items-center justify-center"
          >
            {btn}
          </button>
        ))}
      </div>
      <div className="absolute bottom-4 left-4 w-9 h-9 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center">
        <span className="text-base">🧭</span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────
   CONTACT FORM
────────────────────────────────────────── */
function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handle = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1900);
  };
  const reset = () => {
    setSent(false);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  if (sent)
    return (
      <div className="flex flex-col items-center justify-center py-14 text-center anim-popIn">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-5 shadow-xl"
          style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }}
        >
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="white"
            viewBox="0 0 24 24"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-gray-900 mb-2">
          Message Sent! 🎉
        </h3>
        <p className="text-gray-500 text-sm max-w-xs mb-8 leading-relaxed">
          Thanks for reaching out! Our team will get back to you within 24
          hours.
        </p>
        <button
          onClick={reset}
          className="px-8 py-3 rounded-full text-white text-sm font-black transition-all hover:opacity-90 hover:scale-105 shadow-lg"
          style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }}
        >
          Send Another Message
        </button>
      </div>
    );

  const Field = ({ label, icon, children }) => (
    <div>
      <label className="block text-xs font-black text-gray-600 mb-1.5 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          {icon}
        </span>
        {children}
      </div>
    </div>
  );

  return (
    <form onSubmit={handle} className="space-y-5">
      <div className="grid md:grid-cols-1 grid-cols-2 gap-4">
        <Field label="Full Name *">
          <input
            className="input-field pl-11"
            placeholder="John Doe"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            required
          />
        </Field>
        <Field label="Email Address *">
          <input
            type="email"
            className="input-field pl-11"
            placeholder="john@example.com"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            required
          />
        </Field>
      </div>

      <div className="grid md:grid-cols-1 grid-cols-2 gap-4">
        <Field label="Phone Number">
          <input
            type="tel"
            className="input-field pl-11"
            placeholder="+1 (555) 000-0000"
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
          />
        </Field>
        <div>
          <label className="block text-xs font-black text-gray-600 mb-1.5 uppercase tracking-wider">
            Subject *
          </label>
          <div className="relative">
            <select
              className="input-field pl-11 appearance-none cursor-pointer"
              value={form.subject}
              onChange={(e) =>
                setForm((p) => ({ ...p, subject: e.target.value }))
              }
              required
            >
              <option value="" disabled>
                Select a topic...
              </option>
              <option>Order Inquiry</option>
              <option>Product Support</option>
              <option>Returns &amp; Refunds</option>
              <option>Partnership</option>
              <option>General Feedback</option>
              <option>Other</option>
            </select>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-black text-gray-600 mb-1.5 uppercase tracking-wider">
          Your Message *
        </label>
        <div className="relative">
          <textarea
            className="input-field pl-11"
            rows={5}
            placeholder="Tell us what's on your mind... We're here to help!"
            value={form.message}
            onChange={(e) =>
              setForm((p) => ({ ...p, message: e.target.value }))
            }
            required
            style={{ paddingTop: 14, resize: "none" }}
          />
          <span className="absolute bottom-3 right-4 text-xs text-gray-300 font-medium">
            {form.message.length}/500
          </span>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-2xl text-white font-black text-sm tracking-wide transition-all hover:opacity-90 hover:scale-[1.01] shadow-lg flex items-center justify-center gap-2 disabled:opacity-60"
        style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }}
      >
        {loading ? (
          <>
            <svg
              className="w-4 h-4 anim-spin"
              fill="none"
              stroke="white"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Sending...
          </>
        ) : (
          <>
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
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
            Send Message
          </>
        )}
      </button>
      <p className="text-center text-xs text-gray-400">
        🔒 Your information is safe. We never share your data.
      </p>
    </form>
  );
}

/* ──────────────────────────────────────────
   MAIN CONTACT PAGE
────────────────────────────────────────── */
export default function Contact() {
  const heroRef = useRef(null);
  const heroVis = useVisible(heroRef);
  const statsRef = useRef(null);
  const statsVis = useVisible(statsRef);
  const formRef = useRef(null);
  const formVis = useVisible(formRef);
  const mapRef = useRef(null);
  const mapVis = useVisible(mapRef);
  const faqRef = useRef(null);
  const faqVis = useVisible(faqRef);
  const [openFaq, setOpenFaq] = useState(null);

  const FAQS = [
    {
      q: "How long does it take to get a response?",
      a: "We typically respond within 24 hours on business days. For urgent matters, please call our support line directly.",
    },
    {
      q: "Can I track my order status?",
      a: "Yes! Once your order is placed you'll receive a tracking number via email within 2 hours of dispatch.",
    },
    {
      q: "What is your return policy?",
      a: "We offer a 30-day hassle-free return policy. Items must be in original condition with all packaging intact.",
    },
    {
      q: "Do you offer international shipping?",
      a: "We currently ship to 45+ countries worldwide. Rates and delivery times vary by destination.",
    },
    {
      q: "How can I change or cancel my order?",
      a: "You can modify or cancel orders within 2 hours of placing them by contacting our support team.",
    },
  ];

  return (
    <>
      <style>{injectStyles()}</style>
      <div className="font-sans text-gray-800 bg-white min-h-screen overflow-x-hidden">
        {/* ── HERO BANNER ── */}
        <section
          className="relative overflow-hidden bg-gradient-to-r from-purple-50 to-purple-100"
          style={{ minHeight: 300 }}
          ref={heroRef}
        >
          <div className="max-w-6xl mx-auto px-10 py-16 flex items-center justify-between relative z-10">
            <div key={heroVis ? "v" : "h"}>
              <p
                className="anim-fadeLeft text-xs uppercase tracking-widest font-bold mb-3"
                style={{ color: "#a78bfa" }}
              >
                Get In Touch
              </p>
              <h1
                className="anim-fadeLeft d1 font-black text-gray-900 leading-none mb-4"
                style={{ fontSize: "clamp(2.4rem,5vw,3.8rem)" }}
              >
                Contact
                <br />
                <span style={{ color: "#7c3aed" }}>Us</span>
              </h1>
              <p className="anim-fadeLeft d2 text-gray-500 text-sm leading-relaxed max-w-sm">
                Have a question, a partnership idea, or just want to say hello?
                We'd love to hear from you.
              </p>
              <div className="anim-fadeLeft d3 flex items-center gap-2 mt-5 text-xs text-gray-400 font-medium">
                <a href="#" className="hover:text-purple-600 transition-colors">
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
                <span style={{ color: "#7c3aed" }} className="font-black">
                  Contact
                </span>
              </div>
            </div>
            {/* deco */}
            <div className="absolute right-12 top-1/2 -translate-y-1/2 md:hidden block">
              <div
                className="w-56 h-56 rounded-full anim-float flex items-center justify-center"
                style={{ background: "#ede9fe" }}
              >
                <div
                  className="w-40 h-40 rounded-full flex items-center justify-center"
                  style={{ background: "#ddd6fe" }}
                >
                  <svg
                    className="w-20 h-20"
                    fill="none"
                    stroke="#7c3aed"
                    viewBox="0 0 24 24"
                    strokeWidth={1.2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div
            className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-15 pointer-events-none"
            style={{ background: "#7c3aed" }}
          />
          <div
            className="absolute top-6 right-1/3 w-12 h-12 rounded-full opacity-10 pointer-events-none"
            style={{ background: "#7c3aed" }}
          />
        </section>

        {/* ── STATS BAR ── */}
        <section className="border-y border-gray-100 bg-white" ref={statsRef}>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 grid-cols-4 divide-x divide-gray-100">
            {[
              { icon: "⚡", val: "< 2 hrs", label: "Avg. Response Time" },
              { icon: "😊", val: "98%", label: "Customer Satisfaction" },
              { icon: "🌍", val: "45+", label: "Countries Served" },
              { icon: "📞", val: "24/7", label: "Support Available" },
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
                  <p className="font-black text-gray-900 text-xl leading-none">
                    {s.val}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 font-medium">
                    {s.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FORM + INFO ── */}
        <section className="max-w-6xl mx-auto px-8 py-16" ref={formRef}>
          <div className="grid md:grid-cols-1 grid-cols-2 gap-10 ">
            {/* INFO COLUMN */}
            <div
              className="md:col-span-3 lg:col-span-2 space-y-5"
              style={
                formVis
                  ? { animation: "fadeLeft .7s ease both" }
                  : { opacity: 0 }
              }
            >
              <div>
                <p
                  className="text-xs uppercase tracking-widest font-bold mb-2"
                  style={{ color: "#a78bfa" }}
                >
                  Reach Out
                </p>
                <h2 className="text-3xl font-black text-gray-900 leading-tight">
                  Let's Start a<br />
                  Conversation
                </h2>
                <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                  Whether you need help with an order, have a product question,
                  or want to explore a partnership — we're just a message away.
                </p>
              </div>

              {[
                {
                  icon: (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="white"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  ),
                  title: "Our Location",
                  lines: [
                    "123 Tech Avenue, Suite 400",
                    "San Francisco, CA 94105, USA",
                  ],
                  bg: "#7c3aed",
                },
                {
                  icon: (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="white"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  ),
                  title: "Phone Number",
                  lines: ["+1 (800) 233-4455", "+1 (800) 233-4456 (Support)"],
                  bg: "#2563eb",
                },
                {
                  icon: (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="white"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  ),
                  title: "Email Address",
                  lines: ["hello@ministore.com", "support@ministore.com"],
                  bg: "#059669",
                },
                {
                  icon: (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="white"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ),
                  title: "Business Hours",
                  lines: [
                    "Mon – Fri: 9:00 AM – 6:00 PM",
                    "Sat: 10:00 AM – 4:00 PM",
                  ],
                  bg: "#d97706",
                },
              ].map((c, i) => (
                <div
                  key={c.title}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-white border border-gray-100 hover:border-purple-100 card-lift transition-all"
                  style={
                    formVis
                      ? {
                          animation: `fadeUp .5s ease both`,
                          animationDelay: `${0.1 + i * 0.08}s`,
                        }
                      : { opacity: 0 }
                  }
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md"
                    style={{ background: c.bg }}
                  >
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-700 uppercase tracking-wider">
                      {c.title}
                    </p>
                    {c.lines.map((l) => (
                      <p key={l} className="text-sm text-gray-500 mt-0.5">
                        {l}
                      </p>
                    ))}
                  </div>
                </div>
              ))}

              {/* social */}
              <div className="pt-1">
                <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3">
                  Follow Us
                </p>
                <div className="flex gap-3">
                  {[
                    { l: "f", c: "#1877f2" },
                    { l: "in", c: "#0077b5" },
                    { l: "tw", c: "#1da1f2" },
                    { l: "ig", c: "#e1306c" },
                  ].map((s) => (
                    <button
                      key={s.l}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-xs text-white font-black hover:scale-110 transform transition-transform shadow-md"
                      style={{ background: s.c }}
                    >
                      {s.l}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* FORM COLUMN */}
            <div
              className="lg:col-span-3 bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
              style={
                formVis
                  ? { animation: "fadeRight .7s ease both .1s both" }
                  : { opacity: 0 }
              }
            >
              <div className="mb-7">
                <h3 className="text-xl font-black text-gray-900">
                  Send Us a Message
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  Fill out the form below and we'll be in touch soon.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>

        {/* ── MAP SECTION ── */}
        <section className="bg-gray-50 py-16 px-8" ref={mapRef}>
          <div className="max-w-6xl mx-auto">
            <div
              className="text-center mb-10"
              style={
                mapVis ? { animation: "fadeUp .6s ease both" } : { opacity: 0 }
              }
            >
              <p
                className="text-xs uppercase tracking-widest font-bold mb-2"
                style={{ color: "#a78bfa" }}
              >
                Find Us
              </p>
              <h2 className="text-3xl font-black text-gray-900">
                Visit Our Store
              </h2>
              <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
                Drop by anytime — our team is always happy to see you in person.
              </p>
            </div>
            <div
              className="rounded-3xl overflow-hidden shadow-2xl border border-purple-100"
              style={
                mapVis
                  ? { animation: "fadeUp .7s ease both .15s both" }
                  : { opacity: 0 }
              }
            >
              <StoreMap />
              {/* info strip */}
              <div className="grid md:grid-cols-1 grid-cols-3 md:divide-y divide-y-0 md:divide-x-0  divide-x divide-gray-100 bg-white">
                {[
                  {
                    icon: "📍",
                    label: "Address",
                    val: "123 Tech Avenue, San Francisco, CA 94105",
                  },
                  {
                    icon: "🚇",
                    label: "Nearest Transit",
                    val: "Powell St. Station — 3 min walk",
                  },
                  {
                    icon: "🅿️",
                    label: "Parking",
                    val: "City Garage on Mission St — $5/hr",
                  },
                ].map((info) => (
                  <div
                    key={info.label}
                    className="flex items-center gap-4 px-6 py-5 hover:bg-purple-50 transition-colors"
                  >
                    <span className="text-2xl">{info.icon}</span>
                    <div>
                      <p className="text-xs font-black text-gray-700 uppercase tracking-wider">
                        {info.label}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                        {info.val}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="max-w-6xl mx-auto px-8 py-16" ref={faqRef}>
          <div
            className="text-center mb-10"
            style={
              faqVis ? { animation: "fadeUp .6s ease both" } : { opacity: 0 }
            }
          >
            <p
              className="text-xs uppercase tracking-widest font-bold mb-2"
              style={{ color: "#a78bfa" }}
            >
              FAQ
            </p>
            <h2 className="text-3xl font-black text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-100 overflow-hidden card-lift"
                style={
                  faqVis
                    ? {
                        animation: `fadeUp .5s ease both`,
                        animationDelay: `${i * 0.08}s`,
                      }
                    : { opacity: 0 }
                }
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-purple-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-sm font-bold text-gray-800 pr-4">
                    {faq.q}
                  </span>
                  <span
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      background: openFaq === i ? "#7c3aed" : "#f3f4f6",
                      transform:
                        openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke={openFaq === i ? "white" : "#6b7280"}
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 pt-2 bg-purple-50 anim-fadeUp">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
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
