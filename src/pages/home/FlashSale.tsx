import EmptyPage from "@/components/EmptyPage";
import truncateText from "@/utils/truncateText";
import moment from "moment";
import { useEffect, useState } from "react";
import FlashProductSlider from "./FlashProductSlider";

export default function FlashSale() {
  const targetTime = new Date().getTime() + 12 * 60 * 60 * 1000;

  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setTimeLeft({
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pt-4 pb-2 ">
      <div className="flex justify-between items-center ">
        <h2 className="text-2xl font-bold text-primary">FLASH SALE</h2>
        <div className="flex items-center space-x-2">
          <p className="text-gray-600">Ending in</p>
          <div className="flex items-center space-x-1">
            <div className="bg-primary text-white w-8 h-8 flex justify-center items-center rounded">
              {timeLeft.hours}
            </div>
            <p>:</p>
            <div className="bg-primary text-white w-8 h-8 flex justify-center items-center rounded">
              {timeLeft.minutes}
            </div>
            <p>:</p>
            <div className="bg-primary text-white w-8 h-8 flex justify-center items-center rounded">
              {timeLeft.seconds}
            </div>
          </div>
        </div>
      </div>
      <FlashProductSlider />
    </div>
  );
}
