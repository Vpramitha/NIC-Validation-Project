import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import NavBar from "../components/NavBar";
import { getSummary } from "../api/nicService";
import "../styles/dashboard.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

export default function DashboardPage() {
  const [stats, setStats] = useState([]);
  const [recordsPerFile, setRecordsPerFile] = useState([]);
  const [topFiles, setTopFiles] = useState([]);
  const [usageChartData, setUsageChartData] = useState({ labels: [], data: [] });
  const [genderChartData, setGenderChartData] = useState({ labels: [], male: [], female: [] });
  const [ageData, setAgeData] = useState({ labels: [], data: [] });
  const [monthlyData, setMonthlyData] = useState({ labels: [], data: [] });

  const navigate = useNavigate();

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const data = await getSummary();

      // KPI stats
      setStats([
        { title: "Total Records", value: data.totalRecords },
        { title: "Male Users", value: data.maleUsers },
        { title: "Female Users", value: data.femaleUsers },
        { title: "Average Age", value: Math.round(data.averageAge || 0) }
      ]);

      // Tables
      setRecordsPerFile(data.recordsPerFile);
      setTopFiles(data.topFiles);

      // Usage line chart
      const sortedUsage = data.usageLast3Months.sort((a, b) => new Date(a.date) - new Date(b.date));
      setUsageChartData({ labels: sortedUsage.map(i => i.date), data: sortedUsage.map(i => i.total) });

      // Gender per file
      const files = [...new Set(data.genderPerFile.map(g => g.file_name))];
      const maleCounts = files.map(f => (data.genderPerFile.find(g => g.file_name === f && g.gender === "Male")?.count || 0));
      const femaleCounts = files.map(f => (data.genderPerFile.find(g => g.file_name === f && g.gender === "Female")?.count || 0));
      setGenderChartData({ labels: files, male: maleCounts, female: femaleCounts });

      // Age distribution
      setAgeData({
        labels: data.ageGroups.map(a => a.age_group),
        data: data.ageGroups.map(a => a.count)
      });

      // Monthly trend
      setMonthlyData({
        labels: data.monthlyTrend.map(m => m.month),
        data: data.monthlyTrend.map(m => m.total)
      });

    } catch (err) {
      console.error("Error fetching summary:", err);
    }
  };

  const usageLineChart = {
    labels: usageChartData.labels,
    datasets: [{ label: "NICs Processed", data: usageChartData.data, borderColor: "#4CAF50", backgroundColor: "rgba(76,175,80,0.2)", tension: 0.4 }]
  };

  const genderBarChart = {
    labels: genderChartData.labels,
    datasets: [
      { label: "Male", data: genderChartData.male, backgroundColor: "rgba(54,162,235,0.5)" },
      { label: "Female", data: genderChartData.female, backgroundColor: "rgba(255,99,132,0.5)" }
    ]
  };

  const ageBarChart = {
    labels: ageData.labels,
    datasets: [{ label: "Users", data: ageData.data, backgroundColor: "rgba(255,159,64,0.6)" }]
  };

  const monthlyLineChart = {
    labels: monthlyData.labels,
    datasets: [{ label: "Monthly NIC Processing", data: monthlyData.data, borderColor: "#4CAF50", backgroundColor: "rgba(76,175,80,0.2)", tension: 0.4 }]
  };

  return (
    <div className="dashboard-container">
      <NavBar />

      {/* KPI Cards */}
      <div className="stats-container">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <h3>{stat.title}</h3>
            <p>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Records Table */}
      <div className="table-container">
        <h2>Records Per File</h2>
        <table>
          <thead>
            <tr><th>File Name</th><th>Total Records</th></tr>
          </thead>
          <tbody>
            {recordsPerFile.map((file, index) => (
              <tr key={index}><td>{file.file_name}</td><td>{file.count}</td></tr>
            ))}
          </tbody>
        </table>
      </div>



      {/* Charts */}
      <div className="charts-container">
        <div className="chart-card"><h3>NICs Processed (Last 3 Months)</h3><Line data={usageLineChart} /></div>
        <div className="chart-card"><h3>Gender Distribution Per File</h3><Bar data={genderBarChart} /></div>
        <div className="chart-card"><h3>Age Distribution</h3><Bar data={ageBarChart} /></div>
        <div className="chart-card"><h3>Monthly Processing Trend</h3><Line data={monthlyLineChart} /></div>
      </div>
    </div>
  );
}