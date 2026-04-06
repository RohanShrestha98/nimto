import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

export default function Reviews() {
  const isLoading = false;

  // Dummy data if API is empty
  const displayReviews = [
    {
      id: 1,
      author: "Emma Watson",
      rating: 5,
      text: "Absolutely love the quality! The delivery was super fast and the packaging was premium. Highly recommended!",
    },
    {
      id: 2,
      author: "James Cameron",
      rating: 5,
      text: "Best tech purchase I've made this year. The customer service team was also very helpful when I had a question.",
    },
    {
      id: 3,
      author: "Sophia Taylor",
      rating: 4,
      text: "Great product, looks exactly like the pictures. The only reason it's 4 stars is because I wish there were more color options.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 uppercase tracking-tight relative inline-block">
            CUSTOMERS REVIEWS
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-primary rounded-full"></span>
          </h2>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-1 grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-64 bg-white rounded-2xl animate-pulse shadow-sm"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-1 grid-cols-3 gap-8">
            {displayReviews.slice(0, 3).map((review, idx) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative hover:shadow-lg transition-shadow duration-300"
              >
                <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10" />

                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < review.rating ? "fill-secondary text-secondary" : "fill-gray-200 text-gray-200"}`}
                    />
                  ))}
                </div>

                <p className="text-gray-600 mb-8 italic leading-relaxed relative z-10">
                  "{review.text}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{review.author}</h4>
                    <p className="text-sm text-gray-500">Verified Buyer</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
