import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function History() {
  const [fetchedData, setFetchedData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const storedData = localStorage.getItem("history");
    if (storedData) {
      setFetchedData(JSON.parse(storedData));
    }
  }, []);
  const fetchWeather = (e) => {
    const cityName = e.target.innerText;
    navigate(`/weather/${cityName}`);
  };
  const handleClearHistory = (e)=>{
    localStorage.removeItem('history');
    setFetchedData([]);
  }

  return (
    <>
      <h1 className="flex justify-center text-center text-white text-2xl">
        History
      </h1>
      <div className="flex justify-center">
        <table className=" p-2 w-[100vw] max-w-5xl border rounded-lg  bg-slate-400 ">
          <thead className="bg-slate-100">
            <tr className=" p-2 rounded-lg">
              <th className="w-1/3 m-2 border-white border rounded-md p-2">
                City
                <div className="flex justify-center">
                 <button className="text-gray-600 text-center" disabled={fetchedData?false:true} onClick={(e)=>handleClearHistory(e)} >Clear History</button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {fetchedData &&
              fetchedData.map((city, key) => (
                <tr key={key}>
                  <td className="text-center m-2 border-white border  p-2">
                    {" "}
                    <button
                      className="list-none"
                      onClick={(e) => fetchWeather(e)}
                    >
                      {" "}
                      {city}{" "}
                    </button>{" "}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default History;
