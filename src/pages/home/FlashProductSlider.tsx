import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import shoes1 from "../../assets/shoes2.jpg";
import { GoStarFill } from "react-icons/go";

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

export default function FlashProductSlider() {
  const sliderRef = React.useRef(null);
  const CARD_WIDTH = 220;
  const GAP = 12;
  const SCROLL_STEP = (CARD_WIDTH + GAP) * 2;

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!sliderRef.current) return;

      const container = sliderRef.current;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      // If reached end → restart
      if (container.scrollLeft + SCROLL_STEP >= maxScrollLeft) {
        container.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        container.scrollBy({
          left: SCROLL_STEP,
          behavior: "smooth",
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative  mx-auto">
      {/* <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 hover:bg-gray-100"
      >
        <ChevronLeft />
      </button> */}

      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide no-scrollbar  py-4"
      >
        {products?.map((item) => (
          <div className="min-w-[220px] w-full relative rounded-[8px] p-2  border border-gray-200 hover:drop-shadow-md bg-white cursor-pointer">
            <img
              src={item?.image}
              className="object-cover w-full rounded-[6px] h-36"
              alt=""
            />
            {item?.discount && (
              <p className="absolute top-[14px] right-4 rounded font-semibold px-[10px] py-[3px] text-xs bg-offerBackground text-white">
                {item?.discount} % OFF
              </p>
            )}

            <p className="text-xs leading-5 text-black mt-2">{item?.name}</p>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <GoStarFill
                  key={i}
                  size={14}
                  className={
                    i < item?.rating ? "text-starText " : "text-gray-300"
                  }
                />
              ))}
            </div>
            <p className="text-sm font-semibold leading-5 mt-2 text-titleText">
              $ {item?.price}
            </p>
            <button className="w-full flex items-center justify-center gap-2 mt-2 border border-primary text-primary  py-2 text-sm font-medium hover:bg-primary hover:text-white rounded-[6px] transition">
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 hover:bg-gray-100"
      >
        <ChevronRight />
      </button> */}
    </div>
  );
}
