import React, { useEffect } from "react";
import { useState } from "react";
import { redirect, useNavigate,Link } from "react-router-dom";

const Table = ({ data, setData }) => {
  const navigate = useNavigate();
  const [inputFieldValue, setInputFieldValue] = useState("");
  const [historyNames,setHistoryNames] = useState([]);

  useEffect(() => {
    const storedNames = localStorage.getItem('history');
    if (storedNames) {
      setHistoryNames(JSON.parse(storedNames));
      console.log(historyNames)
    }
  }, []);
  
  const addtoLocalStorage = (cityName) => {
    if (historyNames && !historyNames.includes(cityName)) {
      setHistoryNames([...historyNames, cityName]);
      localStorage.setItem('history', JSON.stringify([...historyNames, cityName]));
    }
  };

  const sortedData = (e) => {
    const result = [...data]; // Create a copy to avoid mutation
    result.sort((a, b) => {
      if (a.ascii_name < b.ascii_name) return -1;
      if (a.ascii_name > b.ascii_name) return 1;
      return 0;
    });
    setData(result);
  };


  const handleSearch = () => {
    if (inputFieldValue !== "") {
      const result = data.filter((item) => {
        return item.ascii_name
          .toLowerCase()
          .includes(inputFieldValue.toLowerCase());
      });
      setData(result);
    }
  };

  const fetchWeather = (e) => {
    const cityName = e.target.innerText;
    addtoLocalStorage(cityName);
    navigate(`/weather/${cityName}`);
  };
  return (
    <div>
      <div className="flex justify-center gap-2 rounded bg-slate-950 text-gray-800   ">
        <input
          className="rounded px-2"
          onChange={(e) => setInputFieldValue(e.target.value)}
          type="search"
          name="searching"
          id="search"
          value={inputFieldValue}
          placeholder="Search..."
        />
        <button
          className="bg-slate-800 text-white rounded px-2 text-sm"
          onClick={(e) => handleSearch(e)}
        >
          {" "}
          Search{" "}
        </button>
        <button
          className="bg-slate-800 text-white rounded px-2 text-sm"
          onClick={(e) => sortedData(e)}
        >
          {" "}
          Sort{" "}
        </button>
      </div>
      <div className="flex justify-center suggestions">
        <div className="absolute w-[25vw] max-w-6xl bg-white rounded mt-1  ">
          <ul className="ml-2 ">
            {inputFieldValue &&
              data
                .filter((data) => {
                  const fullName = data.ascii_name.toLowerCase();
                  const searchTerm = inputFieldValue.toLowerCase();
                  return (
                    fullName &&
                    fullName.startsWith(searchTerm) &&
                    fullName !== searchTerm
                  );
                })
                .slice(0, 10)
                .map((item) => {
                  return (
                    <li
                      className="cursor-pointer"
                      key={item.id}
                      onClick={(e) => setInputFieldValue(e.target.innerText)}
                    >
                      {item.ascii_name}
                    </li>
                  );
                })}
          </ul>
        </div>
      </div>
      <div className="bg-slate-900 text-white mt-5">
        <table className="p-2 w-[100vw] max-w-5xl border rounded-lg   ">
          <thead className="bg-slate-950">
            <tr className=" p-2 rounded-lg">
              <th className="w-1/3 m-2 border-white border rounded-md p-2">
                City
              </th>
              <th className="w-1/3 m-2 border-white border rounded-md p-2">
                Country{" "}
              </th>
              <th className="w-1/3 m-2 border-white border rounded-2xl p-2">
                TimeZone
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((city, key) => (
                <tr key={key}>
                  <td className="text-center m-2 border-white border  p-2">
                    {" "}
                    <button
                      className="list-none"
                      onClick={(e) => fetchWeather(e)}
                    >
                    <Link to={`./weather/${city.ascii_name}`}>
                      {city.ascii_name}{" "}
                    </Link>
                    </button>{" "}
                  </td>
                  <td className="text-center m-2 border-white border  p-2">
                    {" "}
                    {city.cou_name_en}
                  </td>
                  <td className="text-center m-2 border-white border  p-2">
                    {" "}
                    {city.timezone}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
