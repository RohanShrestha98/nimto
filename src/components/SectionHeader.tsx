import React from "react";

export default function SectionHeader({ title, subTitle = "Shop From" }) {
  return (
    <div className="relative border-b border-gray-200">
      <h2 className="inline-block text-lg font-semibold text-gray-700">
        {subTitle} <span className="text-primary">{title}</span>
      </h2>

      {/* Active underline */}
      <span className="absolute left-0 -bottom-px h-0.5 w-48 bg-primary" />
    </div>
  );
}
