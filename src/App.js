import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minRevenue, setMinRevenue] = useState("");
  const [maxRevenue, setMaxRevenue] = useState("");
  const[minNetIncome, setMinNetIncome]=useState("");
  const[maxNetIncome, setMaxNetIncome]=useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/data") // Backend URL
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleFilter = () => {
    let filtered = data;

    if (startDate) {
      filtered = filtered.filter((item) => item.date >= startDate);
    }
    if (endDate) {
      filtered = filtered.filter((item) => item.date <= endDate);
    }
    if (minRevenue) {
      filtered = filtered.filter((item) => item.revenue >= parseFloat(minRevenue));
    }
    if (maxRevenue) {
      filtered = filtered.filter((item) => item.revenue <= parseFloat(maxRevenue));
    }
    if (minNetIncome){
      filtered=filtered.filter((item)=>item.netIncome>=parseFloat(minNetIncome));
    }
    if (maxNetIncome){
      filtered=filtered.filter((item)=>item.netIncome<=parseFloat(maxNetIncome));
    }



    setFilteredData(filtered);
  };

  const sortData = (key, ascending = true) => {
    const sorted = [...filteredData].sort((a, b) => {
      if (ascending) {
        return a[key] > b[key] ? 1 : -1;
      }
      return a[key] < b[key] ? 1 : -1;
    });
    setFilteredData(sorted);
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Financial Data</h1>

      {/* Filters Section */}
      <div className="mb-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="date"
            className="border rounded p-2"
            placeholder="Start Date"
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="border rounded p-2"
            placeholder="End Date"
            onChange={(e) => setEndDate(e.target.value)}
          />
          <input
            type="number"
            className="border rounded p-2"
            placeholder="Min Revenue"
            onChange={(e) => setMinRevenue(e.target.value)}
          />
          <input
            type="number"
            className="border rounded p-2"
            placeholder="Max Revenue"
            onChange={(e) => setMaxRevenue(e.target.value)}
          />
          
          <input
            type="number"
            className="border rounded p-2"
            placeholder="Min NetIncome"
            onChange={(e) => setMinNetIncome(e.target.value)}
          />
          <input
            type="number"
            className="border rounded p-2"
            placeholder="Max NetIncome"
            onChange={(e) => setMaxNetIncome(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleFilter}
        >
          Apply Filters
        </button>
      </div>

      {/* Sorting Buttons */}
      <div className="mb-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          onClick={() => sortData("date", true)}
        >
          Sort by Date (Asc)
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          onClick={() => sortData("date", false)}
        >
          Sort by Date (Desc)
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          onClick={() => sortData("revenue", true)}
        >
          Sort by Revenue (Asc)
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => sortData("revenue", false)}
        >
          Sort by Revenue (Desc)
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          onClick={() => sortData("netIncome", true)}
        >
          Sort by NetIncome (Asc)
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          onClick={() => sortData("netIncome", false)}
        >
          Sort by NetIncome (Desc)
        </button>
      </div>

      {/* Data Table */}
      <table className="table-auto w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Revenue</th>
            <th className="border border-gray-300 px-4 py-2">Net Income</th>
            <th className="border border-gray-300 px-4 py-2">Gross Profit</th>
            <th className="border border-gray-300 px-4 py-2">EPS</th>
            <th className="border border-gray-300 px-4 py-2">Operating Income</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.date}>
              <td className="border border-gray-300 px-4 py-2">{item.date}</td>
              <td className="border border-gray-300 px-4 py-2">{item.revenue}</td>
              <td className="border border-gray-300 px-4 py-2">{item.netIncome}</td>
              <td className="border border-gray-300 px-4 py-2">{item.grossProfit}</td>
              <td className="border border-gray-300 px-4 py-2">{item.eps}</td>
              <td className="border border-gray-300 px-4 py-2">{item.operatingIncome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
