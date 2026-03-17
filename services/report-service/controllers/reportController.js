const { generatePDF } = require("../services/NIC/pdfService");
const { generateExcel } = require("../services/NIC/excelService");
const userModel = require("../models/reportModel");
const { Document, Packer, Paragraph, TextRun } = require("docx");
const { Parser } = require("json2csv");

const report = async (req, res) => {
  try {
    const { reportType, format, fromDate, toDate } = req.body;

    let data;

    if (reportType === "NIC report") {
      data = await userModel.findNICsBydate(fromDate, toDate);
    } else {
      return res.status(400).json({ message: "Invalid report type" });
    }

    // PDF
    if (format === "PDF") {
      const pdfBuffer = await generatePDF(data, "NIC Report");

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="NIC_Report.pdf"`
      );
      return res.send(pdfBuffer);
    }

    // Excel
    if (format === "EXCEL") {
      const excelBuffer = generateExcel(data);

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=NIC_Report.xlsx"
      );
      return res.send(excelBuffer);
    }

    // Word
    if (format === "WORD") {
      // Ensure data is an array
const records = Array.isArray(data) ? data : [];

const doc = new Document({
  creator: "NIC System",
  title: "NIC Report",
  description: "Generated NIC Report",
  sections: [
    {
      children: [
        new Paragraph({
          children: [new TextRun({ text: "NIC Report", bold: true, size: 28 })],
        }),
        // Only add data if there are records
        ...records.map(
          (item) =>
            new Paragraph({
              children: [
                new TextRun(
                  `ID: ${item.id || "N/A"},  NIC: ${
                    item.nic || "N/A"} Age: ${item.age || "N/A"},
                  }`
                ),
              ],
            })
        ),
      ],
    },
  ], // ✅ sections must be an array
});

  const buffer = await Packer.toBuffer(doc);

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  );
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=NIC_Report.docx"
  );
  return res.send(buffer);
}
    // CSV
    if (format === "CSV") {
      const parser = new Parser();
      const csv = parser.parse(data);

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=NIC_Report.csv");
      return res.send(csv);
    }

    // Default JSON
    res.json({ reportType, fromDate, toDate, data });
  } catch (error) {
    console.error("Report Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { report };