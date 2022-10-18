import React from "react";

const History = ({ data }) => {
  return (
    <div className="history">
      {/* <div className="history-list">
        {data.map((item, index) => (
          <li>
            {item.operation}: {item.result}
          </li>
        ))}
      </div> */}
      <table className="table-resp">
        <caption>
          <b>Table</b>: Previous Operations &amp; Their Results
        </caption>
        <thead>
          <tr>
            <th>Operation</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.operation}</td>
              <td>{item.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
