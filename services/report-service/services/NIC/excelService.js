const XLSX = require("xlsx");

const generateExcel = (data) => {
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Add header styling
  const headers = ["ID", "NIC", "Birthday", "Age", "Gender"];
  XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A1" });

  // Auto-width columns
  const colWidths = headers.map((h) => ({ wch: h.length + 5 }));
  worksheet["!cols"] = colWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "NIC Report");

  const buffer = XLSX.write(workbook, {
    type: "buffer",
    bookType: "xlsx",
  });

  return buffer;
};

module.exports = { generateExcel };