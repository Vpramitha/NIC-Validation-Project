import React, { useState } from "react";
import FileUploader from "../components/FileUploader";
import ResultsTable from "../components/ResultsTable";
import NavBar from "../components/NavBar";

const NICValidatorPage = () => {

  const [results, setResults] = useState(null);

  return (

    <div style={{ padding: "30px" }}>
      <NavBar/>

      <h1>NIC Validation Service</h1>

      <FileUploader setResults={setResults} />

      <ResultsTable results={results} />

    </div>

  );

};

export default NICValidatorPage;