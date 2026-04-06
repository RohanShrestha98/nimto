import { HiOutlineTrash, HiOutlineUsers } from "react-icons/hi2";
import { useEffect, useState } from "react";
import TopButton from "@/components/TopButton";
import { useStoreData, useVendorData } from "@/hooks/useQueryData";
import { FiEdit2 } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LuGlobe, LuHistory, LuPackage, LuWarehouse } from "react-icons/lu";
import { MdOutlineDashboard } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";
import truncateText from "@/utils/truncateText";
import Loading from "@/assets/AllSvg";
import EmptyPage from "@/components/EmptyPage";
import InputField from "@/ui/InputField";
import { AiOutlineCopy } from "react-icons/ai";
import { useAuthStore } from "@/store/useAuthStore";
import toast from "react-hot-toast";
import ToolTipComponent from "@/components/ToolTipComponent";
import { HiOutlinePencilAlt } from "react-icons/hi";
import SearchFilter from "@/components/SearchFilter";
import { GoPlus } from "react-icons/go";
import Button from "@/ui/Button";
import TitleHeader from "@/components/TitleHeader";
import AddVendorModal from "./AddVendorModal";

export default function Vendor() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState(
    searchParams.get("searchText") ?? ""
  );
  const [pageSize, setPageSize] = useState(
    searchParams.get("pageSize") ?? "10"
  );
  const [page, setPage] = useState(searchParams.get("page") ?? 1);
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);
  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);

    return () => clearTimeout(delay);
  }, [searchText]);
  const { data, isLoading, isError } = useVendorData(
    debouncedSearchText,
    pageSize,
    page,
    false
  );

  const vendorDetailOptions = [
    {
      id: 1,
      name: "Product",
      icon: <LuPackage size={16} />,
      className: "border-[#297BD64D] text-primary hover:bg-blue-50  ",
      navigate: "/store-product",
    },
    {
      id: 2,
      name: "Sales",
      icon: <BsGraphUpArrow size={14} />,
      className: "border-[#11AC644D] text-priceText hover:bg-green-50 ",
    },
    {
      id: 3,
      name: "Order History",
      icon: <LuHistory size={16} />,
      className: "border-[#E98B204D] text-staffText hover:bg-yellow-50 ",
      navigate: "/store-staff",
    },
  ];

  const handleCopyRegsiterLink = (storeId, storeName) => {
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/register/?store=${storeId}&storeName=${storeName}&userId=${user?.data?.id}`;

    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy the link.");
      });
  };

  useEffect(() => {
    const searchQuery = {
      searchText: searchText,
      page: page,
      pageSize: pageSize,
    };
    setSearchParams(searchQuery);
  }, [page, pageSize, searchText]);

  return (
    <div className="flex flex-col gap-2">
      <div className=" flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <TitleHeader title={"Vendors"} subTitle={"List of all vendors"} />
          <AddVendorModal asChild>
            <div>
              <Button
                buttonName={"Add Vednor"}
                icon={<GoPlus size={20} />}
                className={"px-6"}
              />
            </div>
          </AddVendorModal>
        </div>
        <SearchFilter
          placeholder="Search Vendor"
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <div className="grid grid-cols-3 xxl:grid-cols-4 lg:grid-cols-2 xsm:grid-cols-1 gap-3">
          {data?.data?.map((item) => {
            return (
              <div className="p-6 rounded-[8px] cursor-pointer bg-white card_drop_shadow">
                <div className="flex justify-between  border-b border-inputBorder pb-2">
                  <div className="flex items-center gap-4">
                    <div className="rounded-[8px] h-10 w-10 flex items-center justify-center  bg-tagBackground  ">
                      <LuWarehouse size={16} />
                    </div>
                    <div className="flex flex-col  ">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm  leading-6 tracking-[-0.5%] ">
                          {item?.name}
                        </p>
                        <p className="bg-activeBackground leading-4 text-activeText text-sm rounded-[8px] px-3 py-[2px]">
                          Open
                        </p>
                      </div>
                      <p className="text-subTitleText leading-5 text-sm line-clamp-1">
                        {truncateText(item?.address, 40)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 mt-1">
                    <ToolTipComponent
                      context={"Edit"}
                      trigger={
                        <HiOutlinePencilAlt size={18} className="text-icon" />
                      }
                    />
                    <ToolTipComponent
                      context={"Delete"}
                      trigger={
                        <HiOutlineTrash size={18} className="text-icon" />
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                  {vendorDetailOptions?.map((option) => {
                    return (
                      <div
                        onClick={() =>
                          navigate(`${option?.navigate}/${item?.id}`)
                        }
                        className={`${option?.className}  cursor-pointer border flex flex-col gap-[2px] py-[9px]  items-center justify-center  rounded-[6px]  bg-white  `}
                      >
                        {option?.icon}
                        {option?.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
