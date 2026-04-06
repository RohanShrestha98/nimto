import React, { useState } from "react";

export default function ProductDescription() {
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("black");

  const colors = [
    { name: "black", class: "bg-black" },
    { name: "white", class: "bg-white border" },
    { name: "green", class: "bg-green-600" },
  ];

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const product = {
      id: 2, // unique product id
      name: "Vivo 10 Pro",
      price: 1500,
      color,
      quantity,
      image: "/images/product-1.jpg", // optional
    };

    const existingIndex = cart.findIndex(
      (item) => item?.id === product?.id && item?.color === product?.color,
    );

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart ✅");
  };

  const copyUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        console.log("URL copied!");
      })
      .catch((error) => {
        console.error("Failed to copy URL:", error);
      });
  };

  return (
    <div className="max-w-xl bg-white">
      <p className="text-sm text-gray-500">Iphone</p>
      <h1 className="text-2xl font-bold text-gray-900">Realme 10 Pro</h1>

      <p className="mt-1 text-sm">
        Availability:{" "}
        <span className="text-green-600 font-semibold">In stock</span>
      </p>

      <hr className="my-2" />

      <div className="flex items-center gap-4">
        <span className="text-3xl font-bold text-primary">Rs 18178</span>
        <span className="text-dangerBackground line-through">Rs 20198</span>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex justify-between">
          <span className="font-medium">Available Colors :</span>
          <div className="flex gap-2">
            {colors?.map((c) => (
              <button
                key={c.name}
                onClick={() => setColor(c.name)}
                className={`w-6 h-6 rounded-full ${c.class} ${
                  color === c.name ? "ring-2 ring-primary" : ""
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">RAM :</span>
          <span>8 GB</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Storage Capacity :</span>
          <span>64 GB</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Brand :</span>
          <span>Iphone</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Free Shipping :</span>
          <span>Yes</span>
        </div>

        <div
          onClick={() => copyUrl()}
          className="text-sm cursor-pointer underline text-gray-700"
        >
          Copy Link
        </div>
      </div>

      <hr className="my-4" />

      {/* Quantity */}
      <div className="flex items-center justify-between">
        <span className="font-medium">Quantity</span>
        <div className="flex items-center border rounded-full px-2">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-1 text-lg"
          >
            −
          </button>
          <span className="w-8 text-center font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-1 text-lg"
          >
            +
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-4">
        <button className="flex-1 bg-primary text-white py-3 rounded-xl font-semibold hover:bg-sky-700 transition">
          Buy Now
        </button>
        <button
          onClick={() => addToCart()}
          className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
