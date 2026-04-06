import React, { useState } from "react";
import shoes1 from "../../assets/shoes1.png";
import shoes2 from "../../assets/shoes2.jpg";
import shoes3 from "../../assets/Slider1.png";

const images = [shoes1, shoes2, shoes3];

export default function ProductImagePreviewer() {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div>
      <div className="relative bg-[#F6F7FE]  p-2 border">
        <img
          src={activeImage}
          alt="Product"
          className="w-full h-[350px] object-cover rounded-[6px]"
        />
      </div>

      <div className="flex gap-4 mt-4">
        {images.map((img, index) => (
          <div
            key={index}
            onMouseEnter={() => setActiveImage(img)}
            onClick={() => setActiveImage(img)}
            className={`border cursor-pointer p-1 transition-all  duration-200 \
              ${activeImage === img ? "border-blue-500 ring-1 ring-blue-200" : "border-gray-200 hover:border-blue-400"}`}
          >
            <img
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className="w-20 h-20 object-cover p-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
