import SectionHeader from "@/components/SectionHeader";
import shoes1 from "../../../assets/shoes2.jpg";
import truncateText from "@/utils/truncateText";

export default function TopCategories() {
  const products = [
    {
      id: 1,
      name: "AeroStride X1 Running Shoes",
      price: "Rs 1,000",
      rating: 2,
      discount: "15",
      image: shoes1,
    },
    {
      id: 2,
      name: "AeroStride X1 Running Shoes",
      price: "Rs 1,000",
      rating: 4,
      discount: "12",
      image: shoes1,
    },
    {
      id: 3,
      name: "AeroStride X1 Running Shoes",
      price: "Rs 1,000",
      rating: 5,
      discount: "10",
      image: shoes1,
    },
    {
      id: 4,
      name: "AeroStride X1 Running Shoes",
      price: "Rs 1,000",
      rating: 3,
      discount: "15",
      image: shoes1,
    },
    {
      id: 5,
      name: "AeroStride X1 Running Shoes",
      price: "Rs 1,000",
      rating: 1,
      discount: "15",
      image: shoes1,
    },
    {
      id: 6,
      name: "AeroStride X1 Running Shoes",
      price: "Rs 1,000",
      rating: 5,
      discount: "15",
      image: shoes1,
    },
    {
      id: 1,
      name: "AeroStride X1 Running Shoes",
      price: "Rs 1,000",
      rating: 5,
      discount: "15",
      image: shoes1,
    },
    {
      id: 2,
      name: "AeroStride X1 Running Shoes",
      price: "Rs 1,000",
      rating: 5,
      discount: "12",
      image: shoes1,
    },
    {
      id: 3,
      name: "AeroStride X1 Running Shoes",
      price: "Rs 1,000",
      rating: 5,
      discount: "10",
      image: shoes1,
    },
    {
      id: 4,
      name: "AeroStride X1 Running Shoes",
      price: "Rs 1,000",
      rating: 5,
      discount: "15",
      image: shoes1,
    },
    {
      id: 5,
      name: "AeroStride X1 Running Shoes",
      price: "Rs 1,000",
      rating: 5,
      discount: "15",
      image: shoes1,
    },
    {
      id: 6,
      name: "AeroStride X1 Running Shoes",
      price: "Rs 1,000",
      rating: 5,
      discount: "15",
      image: shoes1,
    },
  ];

  return (
    <div>
      <SectionHeader title={"Top Categories"} />
      <div className="relative  mx-auto  pb-4">
        <div className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide no-scrollbar  py-4">
          {products?.map((item) => (
            <div className="min-w-[120px] w-full relative rounded-[8px] p-2  hover:drop-shadow-md bg-white cursor-pointer">
              <img
                src={item?.image}
                className="object-fill rounded-full min-h-24 min-w-24 h-24 w-24 border border-blue-500"
                alt=""
              />

              <p className="text-xs leading-5 text-black text-center line-clamp-1 mt-2">
                {truncateText(item?.name)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
