import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";

export default function FileImport({
  setSelectedFile,
  selectedFile,
  setDuration,
  accept = ".csv, .xlsx/.xls",
  defaultUrl,
  title,
}) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
  };

  return (
    <div className="flex flex-col gap-1 mt-6 mb-4">
      <h1 className="text-[#344054] font-medium text-sm">Attach File</h1>
      <div className="flex items-center rounded-[4px] ">
        <label
          htmlFor={title ?? "Image"}
          className="whitespace-nowrap cursor-pointer text-sm text-primary font-medium bg-white border rounded-l-[6px]  h-10 flex items-center px-3 "
        >
          Choose File
        </label>
        <div className="w-full border-l justify-between border-t border-b  h-10 rounded-r-[6px] flex items-center   px-2 text-sm text-gray-500 bg-white line-clamp-1">
          {selectedFile?.name?.slice(0, 40) ??
            defaultUrl?.slice(0, 40) ??
            `No File Chosen`}
          {selectedFile?.name && !defaultUrl && (
            <RxCross2
              className="text-red-600 cursor-pointer"
              onClick={() => setSelectedFile()}
            />
          )}
        </div>

        <input
          id={title ?? "Image"}
          accept={accept}
          onChange={(e) => {
            setSelectedFile(e.target.files?.[0]);
            handleFileChange(e);
          }}
          className="hidden"
          type="file"
        />
      </div>
    </div>
  );
}
