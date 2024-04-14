import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import Table from "./Components/Table";

function App() {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      let data = await fetch(
        `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100&offset=${offset}&lang=en`
      );
      let jsonData = await data.json();
      let dataArray = jsonData.results;
      setData((prev)=> [...prev,...dataArray]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
      setLoading(true);
      setOffset((prev) => prev+100);
      fetchData();
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [offset]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="flex justify-center min-w-96">
        <Table data={data}  setData={setData}/>
      </div>
    </div>
  );
}

export default App;
