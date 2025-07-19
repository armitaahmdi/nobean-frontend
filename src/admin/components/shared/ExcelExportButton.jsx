import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function ExcelExportButton({ data, columns, fileName = "data.xlsx", sheetName = "Sheet1", label = "دانلود Excel" }) {
    const handleDownload = () => {
        const formattedData = data.map(item => {
            const row = {};
            columns.forEach(col => {
                row[col.label] = item[col.key];
            });
            return row;
        });

        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, fileName);
    };

    return (
        <button
            onClick={handleDownload}
            className="bg-[#217346] hover:bg-[#15803d] text-white px-2 py-1 rounded-md text-sm"
        >
            {label}
        </button>
    );
}
