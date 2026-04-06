import { Truck, Award, Tag, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Truck, title: "PICKUP ONLY", desc: "Order online & pickup offline" },
  { icon: Award, title: "QUALITY GUARANTEE", desc: "Premium materials" },
  { icon: Tag, title: "DAILY OFFERS", desc: "Save up to 25% off" },
  { icon: ShieldCheck, title: "100% SECURE", desc: "Safe payment process" },
];

export default function Features() {
  return (
    <section className="py-12 border-b border-gray-100 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 grid-cols-4 gap-8 sm:divide-y divide-y-0 sm:divide-x divide-gray-100">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center text-center px-4 sm:py-6 py-0"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
              <p className="text-gray-500 text-sm font-medium">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
