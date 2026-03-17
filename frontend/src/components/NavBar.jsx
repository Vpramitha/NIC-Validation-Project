import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function NavBar() {
    const navigate = useNavigate(); // ✅ define navigate here
  return (
   <header className="dashboard-header">
        <h1 onClick={()=>navigate("/dashboard")}>NIC Validating Application</h1>
        <div>
          <button onClick={() => navigate("/file-uploader")} className="btn primary">File Upload</button>
          <button onClick={() => navigate("/reports")} className='btn warning'>Reports</button>
          <button onClick={() => { localStorage.removeItem("token"); navigate("/login"); }} className="btn logout">Logout</button>
        </div>
      </header>
  );
}