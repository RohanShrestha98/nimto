import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-zinc-50 border-t border-gray-200">
      {/* Newsletter Section */}
      <div className="bg-zinc-900 py-16">
        <div className="container mx-auto px-4 flex md:flex-col flex-row items-center justify-between gap-8">
          <div className="text-white max-w-md md:text-center text-left">
            <h3 className="text-2xl font-bold mb-2">SUBSCRIBE US NOW</h3>
            <p className="text-zinc-400 text-sm">
              Get latest news, updates and deals directly mailed to your inbox.
            </p>
          </div>
          <div className="w-full max-w-md flex relative">
            <input
              type="email"
              placeholder="Your email address here"
              className="w-full px-6 py-4 rounded-full bg-zinc-800 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary border border-zinc-700"
            />
            <button
              className="absolute right-2 top-2 bottom-2 px-6 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2"
              onClick={() => {}}
            >
              SUBSCRIBE <Send className="w-4 h-4  block" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-1 lg:grid-cols-2 grid-cols-4 gap-12">
          {/* Col 1 */}
          <div>
            <Link
              to="/"
              className="text-2xl font-extrabold tracking-wider text-primary block mb-6"
            >
              SHOPLITE<span className="text-secondary">.</span>
            </Link>
            <p className="text-gray-500 mb-6 leading-relaxed">
              We are a dedicated team providing the best quality products and
              shopping experience to our customers globally.
            </p>
            <div className="flex items-center gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-gray-900">
              QUICK LINKS
            </h4>
            <ul className="space-y-3">
              {["HOME", "ABOUT", "SHOP", "BLOGS", "CONTACT"].map((link) => (
                <li key={link}>
                  <Link
                    to={`/#${link.toLowerCase()}`}
                    className="text-gray-500 hover:text-primary transition-colors font-medium"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-gray-900">
              HELP & INFO
            </h4>
            <ul className="space-y-3">
              {[
                "TRACK YOUR ORDER",
                "RETURNS POLICIES",
                "SHIPPING + DELIVERY",
                "CONTACT US",
                "FAQS",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-primary transition-colors font-medium"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-gray-900">CONTACT US</h4>
            <ul className="space-y-4 text-gray-500">
              <li>
                <span className="block font-medium text-gray-900">Email:</span>
                support@shoplite.com
              </li>
              <li>
                <span className="block font-medium text-gray-900">Phone:</span>
                +1 (800) 123 4567
              </li>
              <li>
                <span className="block font-medium text-gray-900">
                  Address:
                </span>
                123 E-commerce Avenue,
                <br />
                Tech District, NY 10001
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 flex md:flex-col flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm font-medium">
            © {new Date().getFullYear()} Shoplite. All rights reserved.
          </p>
          <div className="flex gap-3">
            {/* Payment Icons Placeholders */}
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-10 h-6 bg-gray-200 rounded text-[10px] flex items-center justify-center font-bold text-gray-400"
              >
                PAY
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
