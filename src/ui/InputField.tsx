export default function InputField({
  type = "text",
  disabled,
  placeholder = "",
  className,
  defaultValue = "",
  required = false,
  label = "",
  register = () => {},
  isSearchPagination,
  setIsFilter,
  name = "",
  error,
  setSearchText = () => {},
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <p className="text-titleText font-medium text-sm leading-6 tracking-[-0.5%]">
          {label} {required && <span className="text-red-600">*</span>}{" "}
        </p>
      )}
      <input
        onChange={(e) => {
          setSearchText(e.target.value);
          isSearchPagination && setIsFilter(true);
        }}
        disabled={disabled}
        value={isSearchPagination && defaultValue}
        defaultValue={defaultValue}
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className={`rounded-[8px] px-3 h-10 w-full border border-formBorder  text-sm focus-visible:ring-2 focus-visible:ring-ring hover:border-gray-400 focus-visible:ring-offset-2 outline-none focus:outline-none focus:ring-0 focus:ring-transparent  disabled:cursor-not-allowed disabled:opacity-50   placeholder-placeholderText   drop-shadow-sm focus-visible:border-gray-700
                   ${className} `}
      />
      <p className="text-red-600 text-xs">{error}</p>
    </div>
  );
}
