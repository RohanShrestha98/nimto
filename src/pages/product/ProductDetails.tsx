import React from "react";
import ProductImagePreviewer from "./ProductImagePreviewer";
import ProductDescription from "./ProductDescription";

export default function ProductDetails() {
  return (
    <div className="max-w-[1200px] mx-auto mb-10 flex justify-between gap-6  my-4">
      <div className="w-[35%]">
        <ProductImagePreviewer />
      </div>
      <div className="w-[40%]">
        <ProductDescription />
      </div>
      <div className="w-[25%] border  bg-gray-200"></div>
    </div>
  );
}
