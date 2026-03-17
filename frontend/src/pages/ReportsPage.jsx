import React, { useState } from "react";
import "../styles/reports.css";
import NavBar from "../components/NavBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { generateReport } from "../api/report_service";
import { getDateRange } from "../utils/dateUtils";

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("nicReport");
  const [format, setFormat] = useState("PDF");
  const [duration, setDuration] = useState("last7days");
  const [customRange, setCustomRange] = useState([null, null]); // start/end
  const [startDate, endDate] = customRange;

  const reportTabs = [
    { id: "nicReport", name: "NIC Report", needsDuration: true },
  ];

  const handleGenerateReport = async () => {
  const { fromDate, toDate } = getDateRange(duration, customRange);

  if (!fromDate || !toDate) {
    alert("Please select valid date range.");
    return;
  }

  const reportData = {
    reportType: "NIC report", // exact string backend expects
    format: format.toUpperCase(),
    fromDate,
    toDate,
  };

  console.log("Report Request Body:", reportData);

  try {
    const token = localStorage.getItem("token");
    const fileBlob = await generateReport(reportData, token);

    const url = window.URL.createObjectURL(new Blob([fileBlob]));
    const link = document.createElement("a");

    let ext = format.toLowerCase();
    if (ext === "word") ext = "docx";
    if (ext === "excel") ext = "xlsx";

    link.href = url;
    link.setAttribute("download", `Report.${ext}`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Error generating report:", error);
    alert("Failed to generate report. See console for details.");
  }
};

  return (
    <div className="reports-container">
      <NavBar />
      <h1>Reports Generator</h1>

      {/* Tabs */}
      <div className="tabs">
        {reportTabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        <h2>{reportTabs.find((t) => t.id === activeTab).name}</h2>

        {/* Duration selector if needed */}
        {reportTabs.find((t) => t.id === activeTab).needsDuration && (
          <div className="form-group">
            <label>Time Duration:</label>
            <select value={duration} onChange={(e) => setDuration(e.target.value)}>
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="thisMonth">This Month</option>
              <option value="custom">Custom Range</option>
            </select>

            {duration === "custom" && (
              <DatePicker
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => setCustomRange(update)}
                isClearable={true}
                placeholderText="Select a date range"
                className="custom-date-picker"
              />
            )}
          </div>
        )}

        {/* Format selector */}
        <div className="form-group">
          <label>Report Format:</label>
          <select value={format} onChange={(e) => setFormat(e.target.value)}>
            <option value="PDF">PDF</option>
            <option value="CSV">CSV</option>
            <option value="WORD">Word</option>
            <option value="EXCEL">Excel</option>
          </select>
        </div>

        <button className="generate-btn" onClick={handleGenerateReport}>
          Generate Report
        </button>
      </div>
    </div>
  );
}