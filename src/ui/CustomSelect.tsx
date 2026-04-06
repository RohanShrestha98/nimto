import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CustomSelect({
  id,
  options,
  defaultValue,
  label,
  isSearchPagination,
  placeholder,
  setIsFilter,
  className,
  labelName,
  disabled,
  required,
  error,
  setSelectedField,
}) {
  return (
    <div>
      {labelName && (
        <p className="text-titleText font-medium text-sm leading-6 tracking-[-0.5%] mb-1">
          {labelName}
          {required && <span className="text-red-600"> *</span>}{" "}
        </p>
      )}
      <Select
        onValueChange={(e) => {
          setSelectedField(e);
          isSearchPagination && setIsFilter(true);
        }}
        disabled={disabled}
      >
        <SelectTrigger
          className={` rounded-[8px] justify-between pr-3 px-3 h-9 w-full border border-inputBorder bg-white  text-sm outline-none focus:outline-none focus:ring-0 focus:ring-transparent  hover:border-gray-300  disabled:cursor-not-allowed disabled:opacity-50 ${className} text-placeholderText`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        {/* <p onClick={() => setSelectedField("")}>
            <RxCross2 size={16} className="mr-2 cursor-pointer" />
          </p> */}
        <SelectContent className="bg-white ">
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {options?.length ? (
              <>
                {options?.map((item) => {
                  return (
                    <SelectItem
                      disabled={item?.label === "No Options"}
                      value={item?.value?.toString()}
                      className="text-red-700 border flex justify-start pl-2 hover:bg-inputBorder"
                    >
                      {item?.label}
                    </SelectItem>
                  );
                })}
              </>
            ) : (
              <SelectItem disabled value={"No Options"}>
                No Options
              </SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
      <p className="text-red-600 text-xs mt-1">{error}</p>
    </div>
  );
}
