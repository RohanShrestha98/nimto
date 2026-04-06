import { motion } from "framer-motion";

export default function PromoBanner() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-[#f4f4f5] rounded-3xl overflow-hidden relative min-h-[400px] flex items-center shadow-inner">
          <div className="container md:px-8 px-16 flex md:flex-col flex-row items-center justify-between z-10 relative">
            {/* Text */}
            <div className="max-w-xl md:text-center text-left py-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-block bg-secondary text-secondary-foreground px-4 py-1 rounded-full font-bold text-sm mb-6"
              >
                - 10% OFF
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="md:text-4xl text-6xl font-extrabold text-gray-900 mb-6 leading-tight uppercase"
              >
                NEW YEAR <br />
                <span className="text-primary">SALE</span>
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <button className="btn-pill-secondary" onClick={() => {}}>
                  SHOP NOW
                </button>
              </motion.div>
            </div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative md:w-full w-1/2 md:h-64 h-auto flex justify-center md:mt-8 mt-0"
            >
              <div className="absolute w-64 h-64 bg-secondary/20 rounded-full blur-3xl -z-10" />
              {/* yellow smart watch promo banner */}
              <img
                src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80"
                alt="Promo Product"
                className="w-full max-w-[300px] object-contain drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
