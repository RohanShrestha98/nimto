import { motion } from "framer-motion";
import vape from "../../assets/vape.png";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#fbfbfb] min-h-[500px] flex items-center">
      <div className="container mx-auto lg:px-4 lg:py-12 py-0">
        <div className="flex lg:flex-col  items-center gap-12">
          {/* Text Content */}
          <div className="flex-1 lg:text-center text-left z-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-secondary font-bold tracking-widest mb-4 text-sm uppercase"
            >
              SKETCH SHIRTS
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:text-5xl text-7xl font-extrabold text-gray-900 mb-6 leading-tight"
            >
              The Cool <span className="text-primary">Eight</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-500 md:text-lg text-xl mb-10 max-w-xl lg:mx-auto mx-0 leading-relaxed"
            >
              This super sports car is known by everyone and lives up to its
              name. Discover the latest tech gadgets and premium lifestyle
              accessories.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <button
                className="btn-pill-primary"
                onClick={() =>
                  document
                    .getElementById("shop")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                SHOP COLLECTION
              </button>
            </motion.div>
          </div>

          {/* Image Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 relative flex justify-center items-center"
          >
            {/* Background Blob */}
            <div className="absolute md:w-[300px] md:h-[280px] w-[400px] h-[400px] bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse" />

            {/* landing page hero modern headphones */}
            <img
              src={vape}
              alt="Premium Headphones"
              className="w-full h-full max-w-md object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 rotate-12"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
