import Loading from "@/assets/AllSvg";
import {
  useAddProductByBarcodeData,
  useCategoryData,
  useProductForUserData,
  useStoreData,
  useStoreTaxData,
} from "@/hooks/useQueryData";
import Button from "@/ui/Button";
import truncateText from "@/utils/truncateText";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoCalendarClearOutline } from "react-icons/io5";
import { useCheckoutProductStore } from "@/store/useCheckoutProductStore";
import { MdOutlineCategory, MdOutlineQrCodeScanner } from "react-icons/md";
import BarcodeScanner from "@/components/BarcodeScanner";
import { useSalesMutation } from "@/hooks/useMutateData";
import toast from "react-hot-toast";
import CheckoutModal from "./CheckoutModal";
import { useAuthStore } from "@/store/useAuthStore";
import EmptyPage from "@/components/EmptyPage";
import shoes1 from "../../assets/store1.jpg";
import shoes2 from "../../assets/shoes2.jpg";
import { useNavigate, useSearchParams } from "react-router-dom";
import CustomSelect from "@/ui/CustomSelect";
import Pagination from "@/components/Pagination";
import InputField from "@/ui/InputField";
import SelectModal from "@/components/SelectModal";
import { LuStore } from "react-icons/lu";
import useDebounce from "@/hooks/useDebounce";
import SearchFilter from "@/components/SearchFilter";
import TitleHeader from "@/components/TitleHeader";
import { GoPlus, GoStarFill } from "react-icons/go";
import AddDiscountModal from "./AddDiscountModal";

export default function CheckOut() {
  const { user } = useAuthStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState(
    searchParams.get("searchText") ?? ""
  );
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);
  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);

    return () => clearTimeout(delay);
  }, [searchText]);

  const [pageSize, setPageSize] = useState(
    searchParams.get("pageSize") ?? "10"
  );
  const [page, setPage] = useState(searchParams.get("page") ?? "1");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") ?? ""
  );
  const storeId = searchParams.get("store");
  const storeName = searchParams.get("storeName");

  const [selectedStore, setSelectedStore] = useState(
    storeId && storeName
      ? { id: storeId, name: storeName }
      : user?.data?.store ?? ""
  );

  const [storeSearch, setStoreSearch] = useState("");
  const debouncedStoreSearch = useDebounce(storeSearch);

  const [categorySearch, setCategorySearch] = useState("");
  const debouncedCategorySearch = useDebounce(categorySearch);

  const { data, isLoading, isError } = useProductForUserData(
    user?.data?.store?.id ?? selectedStore?.id,
    10,
    false,
    true,
    debouncedSearchText,
    pageSize,
    page,
    selectedCategory?.id ?? selectedCategory
  );
  const {
    data: categoryData,
    isLoading: categoryIsLoading,
    isError: categoryIsError,
  } = useCategoryData(debouncedCategorySearch);

  const { data: taxData } = useStoreTaxData(selectedStore?.id ?? "");
  console.log("taxData", taxData?.tax);

  const [selectedProduct, setSelectedProduct] = useState([]);
  const [open, setOpen] = useState(false);
  const [openCheckOutModal, setOpenCheckOutModal] = useState(false);
  const [openDiscountModal, setOpenDiscountModal] = useState(false);
  const [scannedBarCode, setScannedBarCode] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const { checkoutProduct, setCheckoutProduct } = useCheckoutProductStore();
  const [debouncedBarCode, setDebouncedBarCode] = useState("");
  const [scannedBarCodeData, setScannedBarCodeData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState();
  const [discounts, setDiscounts] = useState({});
  const [appliedDiscount, setAppliedDiscount] = useState();
  const [discoumtType, setDiscoumtType] = useState();

  console.log("selectedProduct", selectedProduct);

  const statusOptions = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
    { label: "Out of stock", value: "Out of stock" },
    { label: "Clearence", value: "Clearence" },
  ];

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedBarCode(scannedBarCode);
      setScannedBarCode("");
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [scannedBarCode]);

  const {
    data: productDetsilsData,
    isLoading: productDetailsIsLoading,
    isError: productDetailsIsError,
  } = useAddProductByBarcodeData(debouncedBarCode);

  const {
    data: storeData,
    isLoading: storeIsLoading,
    isError: storeIsError,
  } = useStoreData(debouncedStoreSearch);

  useEffect(() => {
    const product = productDetsilsData?.data?.[0];

    if (product) {
      setScannedBarCodeData((prev) => [product, ...prev]);

      setSelectedProduct((prev) => {
        const updated = [product, ...prev];
        setCheckoutProduct(updated);
        setOpen(true);
        return updated;
      });
    }
  }, [productDetsilsData]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (productDetsilsData?.data?.length == 0)
        return toast.error("Product not added in the store");
    }, 500);

    return () => clearInterval(interval);
  }, [productDetsilsData]);

  const handleProductClick = (item) => {
    const updated = [item, ...selectedProduct];
    setSelectedProduct(updated);
    setCheckoutProduct(updated);
  };

  const handleRemoveProduct = (index) => {
    const updated = selectedProduct.filter((_, i) => i !== index);
    const updatedDiscounts = { ...discounts };
    delete updatedDiscounts[index];
    setSelectedProduct(updated);
    setCheckoutProduct(updated);
    setDiscounts(updatedDiscounts);
  };

  const subTotalPrice = selectedProduct.reduce((sum, item, index) => {
    const discount = discounts[index] || 0;
    return sum + ((parseFloat(item.price) || 0) - discount);
  }, 0);

  const taxPrice = (
    (parseFloat(taxData?.tax ?? 0) / 100) *
    subTotalPrice
  ).toFixed(2);
  const totalPrice =
    subTotalPrice + (parseFloat(taxData?.tax ?? 0) / 100) * subTotalPrice;

  useEffect(() => {
    setSelectedProduct([]);
    setCheckoutProduct([]);
  }, []);

  const salesMutation = useSalesMutation();

  const onSubmitHandler = async () => {
    const discountedProducts = checkoutProduct.map((item, index) => ({
      ...item,
      discount: discounts[index] || 0,
    }));

    const postData = {
      sales: discountedProducts,
      quantity: discountedProducts.length,
      store: selectedStore ? JSON.stringify(selectedStore) : user?.data?.store,
      subTotal: subTotalPrice,
      total: totalPrice,
      salesTax: taxData?.tax,
    };
    try {
      await salesMutation.mutateAsync([`post`, "/create", postData]);
      setOpenCheckOutModal(false);
      setError();
      toast.success(`Sales completed`);
      setCheckoutProduct([]);
      setSelectedProduct([]);
      setScannedBarCodeData([]);
      setDiscounts({});
      setLoading(false);
    } catch (err) {
      console.log("err", err);
      setLoading(false);
      setOpenCheckOutModal(false);
      toast.error(err?.response?.data?.total ?? err?.response?.data?.message);
      setError(err?.response?.data?.message);
    }
  };

  const delayedSubmitHandler = () => {
    setOpenCheckOutModal(true);
    setLoading(true);
    setTimeout(() => {
      onSubmitHandler();
    }, 3000);
  };

  const storeProducts = [
    {
      image: shoes1,
      name: "AeroStride X1 Running Shoes",
      inStock: 4,
      price: 1000,
    },
    {
      image: shoes2,
      name: "AeroStride X1 Running Shoes",
      inStock: 3,
      price: 999,
      offer: 10,
    },
    {
      image: shoes1,
      name: "AeroStride X1 Running Shoes",
      inStock: 4,
      price: 1000,
    },
    {
      image: shoes2,
      name: "AeroStride X1 Running Shoes",
      inStock: 3,
      price: 999,
      offer: 10,
    },
    {
      image: shoes1,
      name: "AeroStride X1 Running Shoes",
      inStock: 4,
      price: 1000,
      offer: 15,
    },
    {
      image: shoes2,
      name: "AeroStride X1 Running Shoes",
      inStock: 3,
      price: 999,
    },
    {
      image: shoes1,
      name: "AeroStride X1 Running Shoes",
      inStock: 4,
      price: 1000,
      offer: 15,
    },
    {
      image: shoes2,
      name: "AeroStride X1 Running Shoes",
      inStock: 3,
      price: 999,
      offer: 10,
    },
    {
      image: shoes1,
      name: "AeroStride X1 Running Shoes",
      inStock: 4,
      price: 1000,
      offer: 15,
    },
    {
      image: shoes2,
      name: "AeroStride X1 Running Shoes",
      inStock: 3,
      price: 999,
    },
    {
      image: shoes1,
      name: "AeroStride X1 Running Shoes",
      inStock: 4,
      price: 1000,
    },
    {
      image: shoes2,
      name: "AeroStride X1 Running Shoes",
      inStock: 3,
      price: 999,
    },
    {
      image: shoes1,
      name: "AeroStride X1 Running Shoes",
      inStock: 4,
      price: 1000,
      offer: 15,
    },
    {
      image: shoes2,
      name: "AeroStride X1 Running Shoes",
      inStock: 3,
      price: 999,
      offer: 10,
    },
    {
      image: shoes1,
      name: "AeroStride X1 Running Shoes",
      inStock: 4,
      price: 1000,
      offer: 15,
    },
    {
      image: shoes2,
      name: "AeroStride X1 Running Shoes",
      inStock: 3,
      price: 999,
      offer: 10,
    },
    {
      image: shoes1,
      name: "AeroStride X1 Running Shoes",
      inStock: 4,
      price: 1000,
    },
    {
      image: shoes2,
      name: "AeroStride X1 Running Shoes",
      inStock: 3,
      price: 999,
      offer: 10,
    },
  ];

  const selectModal = [
    {
      data: storeData?.data,
      setSelectedField: setSelectedStore,
      selectedField: selectedStore,
      setSearchText: setStoreSearch,
      title: "Store",
      show: user?.data?.role === "Admin",
      icon: <LuStore />,
      className: "",
    },
    {
      data: categoryData?.data,
      setSelectedField: setSelectedCategory,
      selectedField: selectedCategory,
      setSearchText: setCategorySearch,
      title: "Category",
      icon: <MdOutlineCategory />,
      show: true,
      className: "",
    },
  ];
  console.log("selectedStore", selectedStore);
  useEffect(() => {
    const searchQuery = {
      searchText: searchText,
      page: page,
      pageSize: pageSize,
      category: selectedCategory?.id ?? selectedCategory ?? "",
      store: selectedStore?.id ?? "",
      storeName: selectedStore?.name ?? "",
    };
    setSearchParams(searchQuery);
  }, [page, pageSize, searchText, selectedCategory, selectedStore]);

  return (
    <div className=" flex gap-2">
      <div className="w-[67%] ">
        <TitleHeader
          title={"Checkout"}
          subTitle={"List of all product categories"}
        />

        <div className="pb-4 flex gap-2  mt-3">
          <BarcodeScanner
            asChild
            open={open}
            setOpen={setOpen}
            setScannedBarCode={setScannedBarCode}
          />
          {/* Product List */}
          <div className="w-full">
            <div className="grid grid-cols-2 gap-3 mb-3 mt-3 ">
              <SearchFilter
                noShadow
                isFull
                classname={"card_drop_shadow border border-inputBorder"}
                searchText={searchText}
                setSearchText={setSearchText}
              />
              <div className="grid grid-cols-2 gap-3">
                <CustomSelect
                  options={statusOptions}
                  placeholder={"Select store"}
                  className={"w-full text-sm text-gray-500 card_drop_shadow"}
                  setSelectedField={setSelectedStatus}
                />
                <CustomSelect
                  options={statusOptions}
                  placeholder={"Select vendor"}
                  className={"w-full text-sm text-gray-500 card_drop_shadow"}
                  setSelectedField={setSelectedStatus}
                />
              </div>
            </div>
            <div className="flex flex-col justify-between ">
              <div className="grid grid-cols-5 lg:grid-cols-3 md:grid-cols-2 xxl:grid-cols-5 gap-3">
                {storeProducts?.map((item) => {
                  if (item?.quantity !== 0)
                    return (
                      <div
                        onClick={() => handleProductClick(item)}
                        className=" w-full flex flex-col  text-xs leading-5 relative rounded-[8px] p-2 card_drop_shadow border border-gray-200 hover:drop-shadow-md bg-white cursor-pointer"
                      >
                        <img
                          src={item?.image}
                          className="object-cover w-full rounded-[6px] h-28 xl:h-24"
                          alt=""
                        />
                        {item?.offer && (
                          <p className="absolute top-[14px] right-4 rounded font-semibold px-[10px] py-[3px]  bg-offerBackground text-white">
                            {item?.offer} % OFF
                          </p>
                        )}

                        <p className="mt-2 text-black line-clamp-1">
                          {item?.name}
                        </p>
                        <p className="mt-0 font-semibold text-titleText">
                          $ {item?.price}
                        </p>
                        <p className="mt-0 text-primary">
                          {item?.inStock} in stock
                        </p>
                      </div>
                    );
                })}
              </div>
            </div>
            {isLoading && (
              <div className="pt-40">
                <Loading />
              </div>
            )}
            {isError && (
              <p className="flex items-center justify-center">Error</p>
            )}
            {data?.data?.length == 0 && (
              <div className="w-full flex justify-center  pt-16 pb-20">
                <EmptyPage message={"Oops! No product in this store"} />
              </div>
            )}
            <div className="w-full mb-[-10px] flex justify-end">
              <Pagination
                setPageSize={setPageSize}
                totalPage={data?.pagenation?.totalPages}
                page={page}
                pageSize={pageSize}
                setPage={setPage}
              />
            </div>
          </div>

          {/* Checkout Panel */}
        </div>
      </div>
      <div className="w-[30%] fixed top-16 right-4 border border-inputBorder px-3 py-2 rounded-[8px] h-full bg-white ">
        <div className="flex items-center justify-between text-xs mb-2 ">
          <p className="font-semibold  text-gray-600">SCANNED PRODUCTS</p>
          <AddDiscountModal
            asChild
            setAppliedDiscount={setAppliedDiscount}
            open={openDiscountModal}
            productData={selectedProduct}
            setOpen={setOpenDiscountModal}
            setDiscoumtType={setDiscoumtType}
          >
            <p className="text-primary hover:underline font-semibold flex gap-1 items-center cursor-pointer">
              Add Discount <GoPlus size={18} />
            </p>
          </AddDiscountModal>
        </div>
        <div className="flex flex-col gap-3 bg-white justify-between h-[80vh] no-scrollbar">
          {selectedProduct?.length ? (
            <div className="flex flex-col gap-1 h-full border-b-4 overflow-auto no-scrollbar">
              {selectedProduct?.map((item, index) => (
                <div
                  key={index}
                  className=" hover:bg-gray-100 bg-white relative flex items-center justify-between cursor-pointer w-full gap-1  py-2 border-b px-2 rounded-[8px]"
                >
                  <RxCross2
                    onClick={() => handleRemoveProduct(index)}
                    className="absolute top-0 right-0 p-[2px] cursor-pointer font-bold text-base bg-dangerBackground text-white rounded-[4px] hover:bg-red-700"
                  />
                  <div className="flex items-center gap-3 w-3/5">
                    <img
                      className="h-12 min-w-12 max-w-12 rounded-[8px] object-cover"
                      src={
                        item?.image ??
                        "http://localhost:3001/uploads/laptop3.jpg"
                      }
                      alt=""
                    />
                    <div className="flex flex-col  justify-between py-2">
                      <span className=" font-semibold text-xs text-scannedProductText line-clamp-2">
                        {truncateText(item?.name, 100)}
                      </span>
                      <p className="text-discountText text-xs">
                        ${item?.price}
                      </p>
                    </div>
                  </div>
                  <p className="px-[6px] py-[2px] rounded-[4px] bg-inputBorder font-semibold text-scannedProductText text-xs w-1/10 text-right">
                    1
                  </p>
                  <p className=" text-priceText font-semibold text-sm  w-1/5 text-right">
                    ${item?.price}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center font-semibold text-sm text-gray-500">
              <div className="flex flex-col gap-1 items-center">
                <IoCalendarClearOutline size={20} />
                No item selected
              </div>
            </div>
          )}
          {selectedProduct?.length ? (
            <div className="flex flex-col gap-1 font-semibold text-sm text-gray-700">
              <div className="flex items-center justify-between">
                <p>Sub Total</p>
                <p>${subTotalPrice}</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Discount</p>
                <p>${subTotalPrice}</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Tax ({taxData?.tax}%) </p>
                <p>{!selectedStore ? "Select Store" : "$" + taxPrice}</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Total</p>
                <p className="text-green-600">${totalPrice}</p>
              </div>
            </div>
          ) : (
            <></>
          )}

          <CheckoutModal
            asChild
            loading={loading}
            open={openCheckOutModal}
            setOpen={setOpenCheckOutModal}
          >
            <Button
              buttonName={`CheckOut ($${totalPrice})`}
              className="w-full"
              disabled={totalPrice < "0"}
              handleButtonClick={() => delayedSubmitHandler()}
            />
          </CheckoutModal>
        </div>
      </div>
    </div>
  );
}
