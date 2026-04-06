import React, { useState } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { ReactTable } from "./Table";
import { RxCross2 } from "react-icons/rx";

const REQUIRED_HEADERS = [
  "name",
  "email",
  "number",
  "address",
  "city",
  "state",
  "zip",
  "country",
];

const FileUploadTable = ({
  setDuration,
  accept = ".csv,.xlsx,.xls",
  defaultUrl,
  title,
}) => {
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (e) => {
    setError("");
    const file = e.target.files[0];
    if (!file) return;

    // ✅ STORE FILE NAME
    setFileName(file.name);

    const ext = file.name.split(".").pop().toLowerCase();

    if (ext === "csv") {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: ({ data, meta }) => {
          validateAndBuild(data, meta.fields);
        },
      });
    }

    if (ext === "xlsx" || ext === "xls") {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const wb = XLSX.read(evt.target.result, { type: "binary" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(ws, { defval: "" });
        const headers = Object.keys(json[0] || {});
        validateAndBuild(json, headers);
      };
      reader.readAsBinaryString(file);
    }
  };

  const validateAndBuild = (data, headers) => {
    if (!headers || headers.length === 0) {
      setError("File has no headers");
      resetTable();
      return;
    }

    const normalized = headers.map((h) => h.trim().toLowerCase());

    if (normalized.length !== REQUIRED_HEADERS.length) {
      setError(
        `Invalid column count. Expected ${REQUIRED_HEADERS.length} columns`
      );
      resetTable();
      return;
    }

    const missing = REQUIRED_HEADERS.filter((h) => !normalized.includes(h));
    const extra = normalized.filter((h) => !REQUIRED_HEADERS.includes(h));

    if (missing.length > 0) {
      setError(`Missing columns: ${missing.join(", ")}`);
      resetTable();
      return;
    }

    if (extra.length > 0) {
      setError(`Unexpected columns: ${extra.join(", ")}`);
      resetTable();
      return;
    }

    buildTable(data, normalized);
  };

  const buildTable = (data, headers) => {
    const cols = [
      {
        id: "sn",
        header: "S/N",
        cell: ({ row }) => row.index + 1,
        size: 40,
        enableSorting: false,
      },
      ...headers.map((key) => ({
        accessorKey: key,
        header: key.toUpperCase(),
        cell: ({ getValue, row, column }) => (
          <input
            className="w-full bg-gray-50 border rounded-[4px] border-gray-300 px-1 py-1 hover:border-gray-600 outline-none text-xs"
            value={getValue() ?? ""}
            onChange={(e) =>
              handleCellUpdate(row.index, column.id, e.target.value)
            }
          />
        ),
      })),
    ];

    setColumns(cols);

    const normalizedData = data.map((row) =>
      Object.keys(row).reduce((acc, key) => {
        acc[key.trim().toLowerCase()] = row[key];
        return acc;
      }, {})
    );

    setTableData(normalizedData);
  };

  const handleCellUpdate = (rowIndex, columnId, value) => {
    setTableData((prev) =>
      prev.map((row, index) =>
        index === rowIndex ? { ...row, [columnId]: value } : row
      )
    );
  };

  const resetTable = () => {
    setTableData([]);
    setColumns([]);
  };
  const handleSave = () => {
    console.log("FINAL VALID DATA:", tableData);
  };

  return (
    <div>
      {/* FILE UPLOAD UI */}
      <div className="flex flex-col gap-1 mt-6 mb-4">
        <h1 className="text-[#344054] font-medium text-sm">
          {title || "Attach File"}
        </h1>

        <div className="flex items-center rounded-[4px]">
          <label
            htmlFor="File"
            className="cursor-pointer text-sm text-primary font-medium bg-white border rounded-l-[6px] h-10 w-32 flex items-center px-3"
          >
            Choose File
          </label>

          <div className="w-full border border-l-none h-10 rounded-r-[6px] flex items-center justify-between px-2 text-sm text-gray-500 bg-white">
            {fileName?.slice(0, 40) ||
              defaultUrl?.slice(0, 40) ||
              "No File Chosen"}

            {fileName && !defaultUrl && (
              <RxCross2
                className="text-red-600 cursor-pointer"
                onClick={() => {
                  setFileName("");
                  setError("");
                  resetTable();
                }}
              />
            )}
          </div>

          <input
            id="File"
            type="file"
            accept={accept}
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="text-red-600 text-sm font-medium mb-3">{error}</div>
      )}

      {/* TABLE */}
      {!error && tableData.length > 0 && (
        <ReactTable
          columns={columns}
          data={tableData}
          emptyMessage="Upload CSV or Excel"
        />
      )}

      {/* SAVE */}
      {!error && tableData.length > 0 && (
        <button
          onClick={handleSave}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save Data
        </button>
      )}
    </div>
  );
};

export default FileUploadTable;
