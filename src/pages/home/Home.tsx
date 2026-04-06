import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Categories from "@/components/sections/Categories";
import ProductGrid from "@/components/sections/ProductGrid";
import PromoBanner from "@/components/sections/PromoBanner";
import Reviews from "@/components/sections/Reviews";
import Brands from "@/components/sections/Brands";

export default function Home() {
  return (
    <div className="min-h-screen bg-white selection:bg-primary/20 selection:text-primary">
      <Header />
      <main>
        <Hero />
        <Features />
        <Categories />
        <ProductGrid title="BEST SELLING ITEMS" bestSellerOnly={true} />
        <PromoBanner />
        <ProductGrid title="LATEST ARRIVALS" />
        <Reviews />
        <Brands />
      </main>
      <Footer />
    </div>
  );
}
