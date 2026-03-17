import React from "react";

const ResultsTable = ({ results }) => {

  if (!results) return null;

  return (

    <div>

      <h2>Validation Results</h2>

      {Object.keys(results).map((file) => (

        <div key={file}>

          <h3>{file}</h3>

          <table border="1">

            <thead>
              <tr>
                <th>NIC</th>
                <th>Birthday</th>
                <th>Age</th>
                <th>Gender</th>
              </tr>
            </thead>

            <tbody>

              {results[file].map((item, index) => (

                <tr key={index}>
                  <td>{item.nic}</td>
                  <td>{item.birthday}</td>
                  <td>{item.age}</td>
                  <td>{item.gender}</td>
                </tr>

              ))}

            </tbody>

          </table>

          <br/>

        </div>

      ))}

    </div>

  );

};

export default ResultsTable;