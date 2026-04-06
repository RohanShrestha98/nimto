import { useState } from "react";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
export default function InputText({
  type = "text",
  placeholder = "",
  className = "",
  defaultValue = "",
  required = false,
  icon,
  disabled,
  onChange = () => {},
  label = "",
  register = () => {},
  isSearchPagination,
  setIsFilter,
  name = "",
  error,
  searchText,
  setSearchText = () => {},
}) {
  const [passwordType, setPasswordType] = useState("password");
  return (
    <div>
      {label && (
        <p className="text-[#344054] leading-5 font-medium text-sm mb-1">
          {label} {required && <span className="text-red-600">*</span>}{" "}
        </p>
      )}
      <div
        className={`flex items-center rounded-[8px] justify-between pr-3 px-3 h-10 w-full border  bg-white  text-sm ring-offset-background outline-none focus-visible:ring-2 focus-visible:ring-ring hover:border-gray-300 focus-visible:ring-offset-2 py-1 disabled:cursor-not-allowed disabled:opacity-50
                   ${className}`}
      >
        <div className="text-icon">{icon}</div>
        <input
          placeholder={placeholder}
          disabled={disabled}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            isSearchPagination && setIsFilter(true);
          }}
          defaultValue={defaultValue}
          {...register(name)}
          type={type === "password" ? passwordType : type}
          className={` h-full w-full pl-1 pr-2 placeholder-discountText py-2 outline-none  focus-visible:border-gray-700`}
        />
        {type === "password" && (
          <div className="text-icon cursor-pointer">
            {passwordType === "password" ? (
              <BsEye onClick={() => setPasswordType("text")} />
            ) : (
              <BsEyeSlash onClick={() => setPasswordType("password")} />
            )}
          </div>
        )}
      </div>
      <p className="text-red-600 text-xs">{error}</p>
    </div>
  );
}
