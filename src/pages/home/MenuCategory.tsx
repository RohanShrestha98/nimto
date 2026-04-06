export default function MenuCategory() {
  return (
    <div className="fixed top-0 left-0 z-50 h-full w-[300px] bg-white shadow-lg shadow-indigo-400/40 p-6 ">
      {/* Logo */}
      <div className="flex items-center mb-6">
        <img src="/img/logo_1.png" alt="logo" className="w-36" />
        <button className="ml-auto text-2xl">✕</button>
      </div>

      <ul className="space-y-2 text-sm text-slate-600">
        {[
          "Laptops & Computers",
          "Mobiles & Tablets",
          "Electronics Accessories",
          "TVs & Appliances",
          "Home & Living",
          "Health & Beauty",
          "Printers & Scanners",
          "Network & Components",
          "Automotive & Motorbike",
        ].map((item, idx) => (
          <li
            key={idx}
            className="flex items-center cursor-pointer py-2 hover:text-indigo-600"
          >
            <p>{item}</p>
            <span className="ml-auto">⌄</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
