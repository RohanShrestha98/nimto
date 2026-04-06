import { Phone, Mail, MapPin, Truck, User } from "lucide-react";

export default function TopHeader() {
  return (
    <section className=" bg-slate-900 text-white text-xs">
      <div className="max-w-[1200px] mx-auto flex items-center py-2 gap-6">
        <a className="flex items-center gap-2 hover:opacity-70">
          <Phone size={12} /> +9779860652502
        </a>
        <a className="flex items-center gap-2 hover:opacity-70">
          <Mail size={12} /> support@khudra.com.np
        </a>

        <div className="ml-auto flex items-center gap-4">
          <a className="flex items-center gap-1 border-r pr-3 hover:opacity-70">
            $ Sell on Khudra
          </a>
          <a className="flex items-center gap-1 border-r pr-3 hover:opacity-70">
            <MapPin size={12} /> Contact Us
          </a>
          <a className="flex items-center gap-1 border-r pr-3 hover:opacity-70">
            <Truck size={12} />
            Track Order
          </a>
          <a className="flex items-center gap-1 hover:opacity-70">
            <User size={12} /> Register / Sign in
          </a>
        </div>
      </div>
    </section>
  );
}
