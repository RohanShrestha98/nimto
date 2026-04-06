import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import shoes from "../../assets/shoes2.jpg";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateQuantity = (index, change) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = Math.max(
      1,
      updatedCart[index].quantity + change,
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="bg-[#F8FAFB]">
      <div className="max-w-[1200px] mx-auto px-4 py-8 flex justify-between gap-6">
        {/* Cart List */}
        <div className="w-3/5">
          <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

          {cart?.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white rounded-xl p-4 mb-4 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={shoes}
                  alt={item?.name}
                  className="w-20 h-20 rounded-[8px] object-cover bg-gray-100"
                />
                <div>
                  <h3 className="font-semibold text-primary">{item?.name}</h3>
                  <p className="text-sm text-gray-500">Color: {item?.color}</p>

                  <div className="flex items-center border rounded-lg w-fit mt-2">
                    <button
                      onClick={() => updateQuantity(index, -1)}
                      className="px-3 py-1"
                    >
                      −
                    </button>
                    <span className="px-3">{item?.quantity}</span>
                    <button
                      onClick={() => updateQuantity(index, 1)}
                      className="px-3 py-1"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="text-lg font-semibold text-primary">
                  Rs {item?.price * item?.quantity}
                </p>
                <button
                  onClick={() => removeItem(index)}
                  className="text-gray-400 hover:text-red-500 mt-4"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          <button className="mt-4 px-6 py-2 border rounded-lg font-medium">
            Continue Shopping
          </button>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl p-6 shadow-sm h-fit w-2/5">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

          <div className="flex justify-between mb-2">
            <span>Subtotal: {cart.length}</span>
            <span>Rs {subtotal}</span>
          </div>

          <div className="flex justify-between mb-4">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </div>

          <hr className="mb-4" />

          <div className="flex justify-between font-semibold text-lg mb-4">
            <span>Total</span>
            <span className="text-primary">Rs {subtotal}</span>
          </div>

          <div className="flex gap-2 mb-4">
            <input
              placeholder="Coupon code"
              className="flex-1 border rounded-lg px-3 py-2"
            />
            <button className="px-4 border rounded-lg">Apply</button>
          </div>

          <button className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
