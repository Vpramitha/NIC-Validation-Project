import axios from "axios";

const API_URL = "http://localhost:5000/report/report";

// Function to generate report
export const generateReport = async (reportData, token) => {
  try {
    const response = await axios.post(API_URL, reportData, {
      headers: {
        Authorization: `Bearer ${token}`, // send JWT token
        "Content-Type": "application/json",
      },
      responseType: "blob", // so we can handle files (PDF/Word/Excel/CSV)
    });
    return response.data;
  } catch (error) {
    console.error("Report API Error:", error);
    throw error;
  }
};