import { GoPlus } from "react-icons/go";

export default function MultiSelectImage({ files = [], setFiles, max = 5 }) {
  const handleFileChange = (e, index) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const updated = [...files];
    updated[index] = selected; // replace just this slot
    setFiles(updated);
    e.target.value = "";
  };

  const slots = Array.from({ length: max });

  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {slots.map((_, index) => {
        const image = files[index];

        const inputId = `file-${index}`;

        return (
          <div key={index}>
            <label
              htmlFor={inputId}
              className="cursor-pointer border-dashed flex items-center justify-center border-primary w-full h-[120px] border rounded overflow-hidden"
            >
              {image ? (
                <img
                  className="w-full h-full object-left-top"
                  src={URL.createObjectURL(image)}
                  alt={`selected-${index}`}
                />
              ) : (
                <div className="text-primary flex flex-col gap-1 h-[120px] items-center justify-center rounded-[8px] border-dashed px-[14px] py-[10px] cursor-pointer">
                  <GoPlus size={20} />
                  <p className="text-xs leading-6">UPLOAD IMAGE</p>
                </div>
              )}
            </label>

            <input
              type="file"
              id={inputId}
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFileChange(e, index)}
            />
          </div>
        );
      })}
    </div>
  );
}
