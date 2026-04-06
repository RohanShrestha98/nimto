import { useState } from "react";
import { FaAngleRight } from "react-icons/fa";

const categories = [
  "Laptops & Computers",
  "Mobiles & Tablets",
  "Electronics Accessories",
  "TVs & Appliances",
  "Home & Living",
  "Health & Beauty",
  "Printers & Scanners",
  "Network & Components",
  "Cameras & Accessories",
  "Automotive & Motorbike",
];

const products = {
  "Laptops & Computers": [
    {
      name: "Dell XPS 13",
      price: "$999",
      img: "https://via.placeholder.com/150",
    },
    {
      name: "MacBook Pro 14",
      price: "$1999",
      img: "https://via.placeholder.com/150",
    },
    {
      name: "HP Spectre x360",
      price: "$1299",
      img: "https://via.placeholder.com/150",
    },
  ],
  "Mobiles & Tablets": [
    {
      name: "iPhone 14",
      price: "$899",
      img: "https://via.placeholder.com/150",
    },
    {
      name: "Samsung Galaxy S23",
      price: "$799",
      img: "https://via.placeholder.com/150",
    },
  ],
  "Electronics Accessories": [
    {
      name: "Wireless Mouse",
      price: "$29",
      img: "https://via.placeholder.com/150",
    },
    {
      name: "Bluetooth Headset",
      price: "$59",
      img: "https://via.placeholder.com/150",
    },
  ],
  // Add other categories as needed
};

export default function CategoryWithHoverPreview() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    // Container that tracks hover for both list and preview
    <div
      className="relative flex gap-6 w-full bg-[#f5f5f5]"
      onMouseLeave={() => setHoveredCategory(null)}
    >
      {/* Category List */}
      <div className="w-80 bg-white shadow rounded p-4 z-10">
        <ul>
          <li className="font-bold text-lg border-b border-gray-300 pb-2 mb-2">
            Categories
          </li>
          {categories.map((category, index) => (
            <li
              key={index}
              className={`flex justify-between text-sm items-center py-2 px-2 rounded cursor-pointer hover:bg-gray-100 ${
                hoveredCategory === category ? "bg-purple-50" : ""
              }`}
              onMouseEnter={() => setHoveredCategory(category)}
              // Remove onMouseLeave here
            >
              <p className="text-gray-700">{category}</p>
              <FaAngleRight className="text-gray-400" />
            </li>
          ))}
        </ul>
      </div>

      {/* Hover Preview Panel */}
      {hoveredCategory && products[hoveredCategory] && (
        <div className="absolute top-0 left-80 w-96 bg-white shadow-lg rounded p-4 z-20">
          <h3 className="font-semibold mb-2">{hoveredCategory}</h3>
          <div className="grid grid-cols-2 gap-4">
            {products[hoveredCategory].map((product, index) => (
              <div
                key={index}
                className="p-2 border rounded hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => alert(`Clicked ${product.name}`)} // Example click
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-24 object-cover rounded mb-2"
                />
                <p className="text-xs font-semibold">{product.name}</p>
                <p className="text-red-500 text-xs font-medium">
                  {product.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
