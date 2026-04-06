import InputText from "@/ui/InputText";
import { LuSearch } from "react-icons/lu";

export default function SearchFilter({
  setSearchText,
  searchText,
  classname,
  isFull,
  smallScreenClassName,
  noShadow,
  placeholder = "Search...",
}) {
  return (
    <div
      className={`grid ${
        isFull
          ? `grid-cols-1`
          : ` ${smallScreenClassName ?? "grid-cols-2"} py-1`
      }  `}
    >
      <InputText
        searchText={searchText}
        setSearchText={setSearchText}
        icon={<LuSearch size={18} />}
        className={`bg-white w-full text-sm h-9 ${
          noShadow ? "" : "card_drop_shadow"
        } ${classname}`}
        name="search"
        placeholder={placeholder}
      />
    </div>
  );
}
