import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";

function WeatherPage() {
  const { cityName } = useParams();
  const [data, setData] = useState();
  const [loading,setLoading] = useState(false);
  const [iconUrl, setIconUrl] = useState(1);

  const fetchData = async () => {
    try {
      setLoading(true);
      const rawData = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=e2505b7986fbb26d7d2cbde95418d3fb`
      );
      const data = await rawData.json();
      const iconUrl = `http://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`;
      setData(data);
      setIconUrl(iconUrl);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    
  }, []);
  useEffect(() => {
    fetchData();
  }, [cityName]);

  return (
    <>
      <div className=" flex justify-center mt-8">
        <div className="w-96 m-4 weather-card flex flex-col items-center bg-gray-900 shadow-md rounded-lg p-6 mx-auto text-white">
          {data ? (
            <>
              <h1 className="text-4xl  ">{data?.name}</h1>
              <div className="flex justify-center ">
                <p className="text-3xl self-center">
                  {Math.round(data?.main?.temp)}&deg;C
                </p>
                <img
                  src={iconUrl}
                  alt={data?.weather[0].main}
                  className="w-20 h-20 mb-4"
                />
              </div>
              <div className="details flex flex-col gap-2 max-w-6xl">
                <p className="text-2xl">{data?.weather[0]?.main}</p>
                <p className="">{data?.weather[0]?.description}</p>
                <div className="flex gap-4">
                <p>
                  Min: {Math.round(data?.main?.temp_min)}&deg;C
                </p>
                <p>
                  Max:{Math.round(data?.main?.temp_max)}&deg;C  
                </p>
                </div>
                <p>Humidity: {data?.main?.humidity}%</p>
                <p>
                  Sunset:{" "}
                  {new Date(data?.sys?.sunset * 1000).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "numeric",
                      minute: "numeric",
                    }
                  )}{" "}
                  (local time)
                </p>
              </div>
            </>
          ) : <Loader />
        }
        </div>
      </div>  
    </>
  );
}

export default WeatherPage;
