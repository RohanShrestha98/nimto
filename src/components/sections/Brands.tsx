export default function Brands() {
  const brands = [
    { name: "TECHLIGHT", font: "font-sans" },
    { name: "MiniStore", font: "font-serif italic" },
    { name: "ULTRAS", font: "font-mono font-black tracking-widest" },
    { name: "SWANKY", font: "font-sans font-light tracking-wide" },
    { name: "EMILY", font: "font-sans font-bold" },
  ];

  return (
    <section className="py-12 bg-white border-t border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center md:gap-8 lg:gap-16 gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {brands.map((brand, idx) => (
            <div
              key={idx}
              className={`md:text-2xl text-3xl text-gray-400 hover:text-primary transition-colors cursor-pointer ${brand.font}`}
            >
              {brand.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
