import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Loading from "@/assets/AllSvg";
import ModalHeader from "@/components/ModalHeader";
import { convertToSelectOptions } from "@/utils/convertToSelectOptions";
import CustomSelect from "@/ui/CustomSelect";
import InputField from "@/ui/InputField";
import Button from "@/ui/Button";

export default function AddDiscountModal({
  asChild,
  children,
  open,
  setOpen,
  productData,
  setAppliedDiscount,
  setDiscoumtType,
}) {
  // const productOptions = convertToSelectOptions(productData, true);
  const discoumtTypeOptions = [
    {
      label: "Percentage",
      value: "percentage",
    },
    {
      label: "Price",
      value: "price",
    },
  ];
  const productOptions = [
    {
      label: "Product 1",
      value: "product1",
    },
    {
      label: "Product 2",
      value: "product2",
    },
    {
      label: "Product 3",
      value: "product3",
    },
    {
      label: "Product 4",
      value: "product4",
    },
  ];
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent className="rounded-[8px] min-w-[600px] bg-[#FAFAFA]">
        <DialogTitle className="text-[#22244D] font-medium text-base mt-[-8px] ">
          <ModalHeader
            title={"Manage Product Discounts"}
            subTitle={"Add or remove discounts for individual products"}
          />
        </DialogTitle>
        <div className="flex flex-col gap-2 p-3 border border-formBorder rounded-[8px] ">
          <p className="font-semibold  text-gray-600">ADD NEW DISCOUNT</p>
          <div className="grid grid-cols-2 gap-4 mt-3">
            <CustomSelect
              options={productOptions}
              placeholder={"Select product"}
              labelName={"Select product"}
              className={"w-full text-sm h-10 text-gray-500 card_drop_shadow"}
              setSelectedField={setAppliedDiscount}
            />
            <CustomSelect
              options={discoumtTypeOptions}
              labelName={"Discount Type"}
              placeholder={"Select discount type"}
              className={"w-full text-sm h-10 text-gray-500 card_drop_shadow"}
              setSelectedField={setDiscoumtType}
            />
          </div>
          <InputField
            placeholder={"eg. $10 or 10%"}
            className={`w-full text-sm text-gray-500 border border-inputBorder `}
            label={"Discount value"}
            type={"number"}
          />
          <Button
            className={"w-full mt-5"}
            handleButtonClick={() => {}}
            buttonName={`Apply Discount`}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
