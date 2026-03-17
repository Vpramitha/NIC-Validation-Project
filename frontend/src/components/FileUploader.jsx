import React, { useState, useRef } from "react";
import { uploadFiles } from "../api/nicService";
import "../styles/fileUploader.css";

const FileUploader = ({ setResults }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const dropRef = useRef();

  // Handle files selection
  const handleFiles = (selectedFiles) => {
    setFiles((prev) => [...prev, ...Array.from(selectedFiles)]);
  };

  const handleChange = (e) => {
    handleFiles(e.target.files);
  };

  // Drag & Drop events
  const handleDragOver = (e) => {
    e.preventDefault();
    dropRef.current.classList.add("drag-over");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    dropRef.current.classList.remove("drag-over");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    dropRef.current.classList.remove("drag-over");
    handleFiles(e.dataTransfer.files);
  };

  // Upload files
  const handleUpload = async () => {
    if (!files.length) {
      alert("Please select at least one file!");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      setLoading(true);
      const res = await uploadFiles(formData);
      setLoading(false);

      if (res?.summary) {
        setSummary(res.summary);
        alert("File upload & validation complete!");
      } else {
        console.warn("No results returned from server");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed!");
      setLoading(false);
    }
  };

  // Remove a file
  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  return (
    <div className="uploader-page">
      <div className="uploader-card">
        <h2>NIC Validator</h2>
        <p className="subtitle">Upload CSV files to validate NICs</p>

        {/* Drag & Drop Area */}
        <div
          className="drop-zone"
          ref={dropRef}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p>Drag & Drop files here or click to select</p>
          <input
            type="file"
            multiple
            accept=".csv"
            onChange={handleChange}
            className="file-input"
          />
        </div>

        {/* Selected files list */}
        {files.length > 0 && (
          <ul className="file-list">
            {files.map((file, idx) => (
              <li key={idx}>
                {file.name}{" "}
                <button type="button" onClick={() => removeFile(idx)}>
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}

        <button
          className="upload-btn"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Validating..." : "Validate NICs"}
        </button>

        {/* Summary Table */}
        {summary && (
          <div className="summary-report">
            <h3>Validation Summary</h3>
            <table>
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Total Records</th>
                  <th>Valid NICs</th>
                  <th>Invalid NICs</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(summary).map(([file, data]) => (
                  <tr key={file}>
                    <td>{file}</td>
                    <td>{data.totalRecords}</td>
                    <td>{data.validRecords}</td>
                    <td>{data.invalidRecords}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;