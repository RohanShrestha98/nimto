import {
  Smartphone,
  Gamepad2,
  Watch,
  Joystick,
  Headphones,
  Laptop,
} from "lucide-react";
import { motion } from "framer-motion";

// Fallback data mapping icons to category names
const iconMap: Record<string, React.ElementType> = {
  Phones: Smartphone,
  PlayStations: Gamepad2,
  "Digital Watches": Watch,
  Joysticks: Joystick,
  EarPods: Headphones,
  Laptops: Laptop,
};

const defaultCategories = [
  { id: 1, name: "Phones", icon: "Phones" },
  { id: 2, name: "PlayStations", icon: "PlayStations" },
  { id: 3, name: "Digital Watches", icon: "Digital Watches" },
  { id: 4, name: "Joysticks", icon: "Joysticks" },
  { id: 5, name: "EarPods", icon: "EarPods" },
  { id: 6, name: "Laptops", icon: "Laptops" },
];

export default function Categories() {
  const isLoading = false;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4 uppercase tracking-tight">
            Shop by Categories
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-6 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-40 bg-gray-100 rounded-2xl animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2  lg:grid-cols-3 grid-cols-6 gap-6">
            {defaultCategories.map((cat, idx) => {
              const Icon = iconMap[cat.name] || Smartphone; // Default icon
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="group cursor-pointer bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-full bg-gray-50 group-hover:bg-primary/10 flex items-center justify-center text-gray-600 group-hover:text-primary transition-colors mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
