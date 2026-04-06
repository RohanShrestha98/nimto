import SearchFilter from "@/components/SearchFilter";
import { ReactTable } from "../../components/Table";
import { useEffect, useMemo, useState } from "react";
import TopButton from "@/components/TopButton";
import { useStoreData, useUserData } from "@/hooks/useQueryData";
import { FiEdit2 } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import DeleteModal from "@/components/DeleteModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import AddUserModal from "./AddUserModal";
import InputField from "@/ui/InputField";
import truncateText from "@/utils/truncateText";
import { useAuthStore } from "@/store/useAuthStore";
import SelectModal from "@/components/SelectModal";
import { LuClock4, LuStore } from "react-icons/lu";
import TitleHeader from "@/components/TitleHeader";
import Button from "@/ui/Button";
import { GoPlus } from "react-icons/go";
import CustomSelect from "@/ui/CustomSelect";
import ToolTipComponent from "@/components/ToolTipComponent";
import { HiOutlineTrash } from "react-icons/hi2";
import { IoGiftOutline } from "react-icons/io5";
import { HiOutlinePencilAlt } from "react-icons/hi";

export default function Order() {
  const { user } = useAuthStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState(
    searchParams.get("searchText") ?? ""
  );
  const [pageSize, setPageSize] = useState(
    searchParams.get("pageSize") ?? "10"
  );
  const [page, setPage] = useState(searchParams.get("page") ?? 1);
  const storeId = searchParams.get("store");
  const storeName = searchParams.get("storeName");

  const [selectedStore, setSelectedStore] = useState(
    storeId && storeName
      ? { id: storeId, name: storeName }
      : user?.data?.store ?? ""
  );

  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);
  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);

    return () => clearTimeout(delay);
  }, [searchText]);

  const { data, isLoading, isError } = useUserData(
    selectedStore?.id ?? "",
    debouncedSearchText,
    pageSize,
    page
  );

  const [selectedStatus, setSelectedStatus] = useState("Active");

  const statusOptions = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
    { label: "Out of stock", value: "Out of stock" },
    { label: "Clearence", value: "Clearence" },
  ];

  const {
    data: storeData,
    isLoading: storeIsLoading,
    isError: storeIsError,
  } = useStoreData();

  const columns = useMemo(
    () => [
      {
        accessorFn: (row, index) => index + 1,
        id: "id",
        header: () => <span>S.N.</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.firstName,
        id: "firstName",
        cell: (info) => {
          return (
            <div className="flex items-center gap-1 py-1">
              {" "}
              <p className="flex items-center gap-1">
                {info?.row?.original?.firstName === ""
                  ? "-"
                  : info?.row?.original?.firstName + " "}
                {info?.row?.original?.lastName}
              </p>
            </div>
          );
        },
        // info.getValue(),
        header: () => <span>Name</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.email,
        id: "email",
        cell: (info) => {
          return (
            <p className="">
              {info?.row?.original?.email === ""
                ? "-"
                : truncateText(info?.row?.original?.email)}
            </p>
          );
        },
        header: () => <span>Email</span>,
        footer: (props) => props.column.id,
      },

      {
        accessorFn: (row) => row?.phone,
        id: "phone",
        cell: (info) => {
          return (
            <p>
              {info?.row?.original?.phoneNumber === ""
                ? "-"
                : info?.row?.original?.phoneNumber}
            </p>
          );
        },
        header: () => <span>Phone Number</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.store?.name,
        id: "store",
        cell: (info) => {
          return <p className="">{info?.row?.original?.store?.name}</p>;
        },
        header: () => <span>Store</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.role ?? "Staff",
        id: "role",
        header: () => <span>Role</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.payPerHour,
        id: "pay",
        cell: (info) => {
          return (
            <p className="w-20 text-center">
              ${info?.row?.original?.payPerHour}
            </p>
          );
        },
        header: () => <span className="text-center w-20 ml-8">Pay</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.isVerified,
        id: "isVerified",
        cell: (info) => {
          return (
            <p
              className={`inline-block text-xs px-4  text-center cursor-default rounded-full py-[3px] font-medium  ${
                info?.row?.original?.isVerified
                  ? " bg-activeBackground text-activeText"
                  : "bg-clearenceBackground text-warningText"
              }
                  `}
            >
              {info?.row?.original?.isVerified ? "VERIFIED" : "NOT VERIFIED"}
            </p>
          );
        },
        // info.getValue(),
        header: () => <span className="ml-4">Verified</span>,
        footer: (props) => props.column.id,
      },

      {
        accessorFn: (row) => row,
        id: "action",
        cell: (info) => {
          const data = info?.cell?.row?.original;
          return (
            <div className="flex gap-5 text-base justify-center">
              <ToolTipComponent
                context={"Edit"}
                trigger={
                  <HiOutlinePencilAlt
                    onClick={() =>
                      navigate(`/edit-product/${data?.id}`, {
                        state: data,
                      })
                    }
                    size={18}
                    className="text-icon"
                  />
                }
              />
              <ToolTipComponent
                context={"Delete"}
                trigger={
                  <DeleteModal
                    asChild
                    desc="Are you sure you want to delete this Product?"
                    title="Delete Product"
                    id={info?.row?.original?.id}
                  >
                    <HiOutlineTrash size={18} className="text-icon" />
                  </DeleteModal>
                }
              />
            </div>
          );
        },
        header: () => <span className="flex justify-center">Actions</span>,
        footer: (props) => props.column.id,
      },
    ],
    []
  );
  useEffect(() => {
    const searchQuery = {
      searchText: searchText,
      page: page,
      pageSize: pageSize,
      store: selectedStore?.id ?? selectedStore ?? "",
      storeName: selectedStore?.name ?? "",
    };
    setSearchParams(searchQuery);
  }, [page, pageSize, searchText, selectedStore]);

  return (
    <div className=" flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <TitleHeader title={"Order"} subTitle={"List of all orders"} />
      </div>
      <div className="p-4 bg-white rounded-[8px] card_drop_shadow ">
        <div className="grid grid-cols-3 gap-3 mb-3 ">
          <div className="col-span-2 ">
            <SearchFilter
              noShadow
              isFull
              searchText={searchText}
              setSearchText={setSearchText}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <CustomSelect
              options={statusOptions}
              placeholder={"Select store"}
              className={"w-full text-sm text-gray-500"}
              setSelectedField={setSelectedStatus}
            />
            <CustomSelect
              options={statusOptions}
              placeholder={"Select role"}
              className={"w-full text-sm text-gray-500"}
              setSelectedField={setSelectedStatus}
            />
          </div>
        </div>

        <div className=" bg-white">
          <ReactTable
            isLoading={isLoading}
            isError={isError}
            columns={columns}
            data={data?.data ?? []}
            currentPage={1}
            totalPage={1}
            emptyMessage="Oops! No Product available right now."
          />
          <SearchFilter
            totalPage={data?.pagenation?.totalPages}
            setPage={setPage}
            disabled
            setSearchText={setSearchText}
            page={page}
            searchText={searchText}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </div>
      </div>
    </div>
  );
}
