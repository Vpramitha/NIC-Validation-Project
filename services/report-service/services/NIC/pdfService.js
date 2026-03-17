const PDFDocument = require("pdfkit");

/**
 * Generates a professional PDF buffer from NIC records
 * @param {Array} data - Array of NIC records
 * @param {String} title - Report title
 * @returns {Promise<Buffer>} - PDF file as Buffer
 */
const generatePDF = (data, title = "NIC Report") => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 40, size: "A4" });
      const chunks = [];

      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));

      // Title
      doc.fontSize(18).fillColor("#333").text(title, { align: "center", underline: true });
      doc.moveDown(1);

      // Table setup
      const headers = ["#", "NIC", "Birthday", "Age", "Gender"];
      const columnWidths = [30, 150, 100, 50, 60]; // width per column
      const startX = 50;
      let y = doc.y;

      // Header row
      doc.fontSize(10).fillColor("#000").font("Helvetica-Bold");
      let x = startX;
      headers.forEach((header, i) => {
        doc.text(header, x, y, { width: columnWidths[i], align: "left" });
        x += columnWidths[i];
      });

      y += 20; // move y below headers
      doc.moveTo(startX, y - 5).lineTo(550, y - 5).stroke();

      // Data rows
      doc.font("Helvetica").fontSize(9);
      data.forEach((item, index) => {
        // Page break handling
        if (y > 750) {
          doc.addPage();
          y = 50; // reset y
        }

        const bgColor = index % 2 === 0 ? "#f3f3f3" : "#ffffff";
        doc.rect(startX, y - 2, 500, 18).fill(bgColor).fillColor("#000");

        const birthday = item.birthday ? new Date(item.birthday).toISOString().split("T")[0] : "-";
        const row = [index + 1, item.nic || "-", birthday, item.age || "-", item.gender || "-"];

        x = startX;
        row.forEach((text, i) => {
          doc.text(text.toString(), x, y, { width: columnWidths[i], align: "left" });
          x += columnWidths[i];
        });

        y += 20; // move to next row
      });

      // Footer
      doc.moveDown(2);
      doc.fontSize(8).fillColor("#555").text(
        `Generated on: ${new Date().toLocaleString()}`,
        { align: "right" }
      );

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { generatePDF };