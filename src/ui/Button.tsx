import { Button as ShadcnButton } from "@/components/ui/button";

export default function Button({
  buttonName,
  loading,
  className,
  handleButtonClick,
  icon,
  danger = false,
  type,
  noFill,
  disabled = false,
}) {
  return (
    <div>
      <ShadcnButton
        onClick={handleButtonClick}
        type={type}
        disabled={loading || disabled}
        className={`gap-1 ${
          danger
            ? "border border-red-600  text-red-600 hover:bg-red-600 hover:text-white"
            : noFill
            ? "border border-buttonBorder bg-white  text-discountText hover:bg-gray-500 hover:text-white"
            : "bg-primary text-white  hover:opacity-75 border border-primary "
        } flex items-center  h-10 px-5  rounded-[8px] font-medium text-sm leading-4 tracking-[-0.5%]  ${className}`}
      >
        {icon}
        {buttonName}
      </ShadcnButton>
    </div>
  );
}
