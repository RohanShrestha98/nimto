import { motion } from "framer-motion";
import { ShoppingCart, Heart } from "lucide-react";

interface ProductGridProps {
  title: string;
  bestSellerOnly?: boolean;
}

// Fallback images based on product names just to make it look good if API doesn't have real URLs
const getFallbackImage = (name: string, id: number) => {
  const images = [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80", // Red shoes
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80", // Watch
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80", // Watch 2
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80", // Headphones
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80", // Headphones 2
  ];
  return images[id % images.length];
};

export default function ProductGrid({
  title,
  bestSellerOnly,
}: ProductGridProps) {
  const isLoading = false;

  // Generate some dummy data if API is empty for the sake of the beautiful UI requested
  const displayProducts = Array.from({ length: 5 }).map((_, i) => ({
    id: i + 1,
    name: `Premium Product ${i + 1}`,
    price: Math.floor(Math.random() * 50000) + 10000, // random price in cents
    imageUrl: "",
    categoryId: 1,
    isBestSeller: true,
  }));

  return (
    <section className="py-0 bg-white" id="shop">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 uppercase tracking-tight relative">
            {title}
            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full"></span>
          </h2>
          <button
            className="text-primary font-bold hover:text-primary/80 transition-colors"
            onClick={() => {}}
          >
            VIEW ALL
          </button>
        </div>

        {isLoading ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-cols-5 gap-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-80 bg-gray-100 rounded-2xl animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-cols-5 gap-6">
            {displayProducts.slice(0, 5).map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col bg-white border border-gray-100 rounded-[8px] overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300"
              >
                {/* Image Area */}
                <div className="relative aspect-square bg-[#f8f9fa] p-6 flex items-center justify-center overflow-hidden">
                  <img
                    src={
                      product.imageUrl ||
                      getFallbackImage(product.name, product.id)
                    }
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Hover Actions */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <button className="w-10 h-10 rounded-full bg-white text-gray-900 shadow-md flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white text-gray-900 shadow-md flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5 text-center flex-1 flex flex-col justify-between bg-white">
                  <h3 className="text-gray-600 font-semibold text-sm mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-primary font-bold text-lg">
                    ${(product.price / 100).toFixed(2)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
