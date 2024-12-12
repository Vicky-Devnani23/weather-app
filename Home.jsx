import React, { useEffect, useState } from "react";
import Eye from "./eye.png";
import Pressure from "./air.png";
import TypingAnimation from "./Type";
import Cloud from "./cloud.png";
import Temp from "./thermometer.png";
const Home = () => {
  const [City, setCity] = useState(null || "surat");
  const [name, setName] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!City) return; // Agar City blank hai to API call na karein
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=45787dfe45ac9c3d6aa21ba9ff5045fe`
        );
        if (!response.ok) throw new Error("Failed to fetch weather data");
        const weatherData = await response.json();
        setData(weatherData);
        setError(null); // Error clear karein agar pehle kuch aayi ho
      } catch (err) {
        setError(err.message);
      }
    };
    fetchWeather();
  }, [City]);

  const handleSearch = () => {
    if (!name.trim()) {
      setError("Please enter a valid city name");
      return;
    }
    setError(null);
    setCity(name.trim());
  };

  const formatTemperature = (temp) => (temp - 273.15).toFixed(0);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center Bg">
      <TypingAnimation />
      <div className="w-screen flex justify-center items-center my-5">
        <div className="max-w-[480px] w-full px-4">
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border h-12 shadow p-4 rounded-full dark:text-gray-800 dark:border-gray-700 dark:bg-gray-200"
              placeholder="search"
            />
            <button onClick={handleSearch}>
              <svg
                className="text-gray-400 h-5 w-5 absolute top-3.5 right-3 fill-current dark:text-gray-800"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                x="0px"
                y="0px"
                viewBox="0 0 56.966 56.966"
                style={{ enableBackground: "new 0 0 56.966 56.966" }}
                xmlSpace="preserve"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="h-fit w-10/12 bg-white/10 backdrop-blur-[2px] shadow-lg rounded-md p-1">
        {error && (
          <div className="text-red-500 text-center">
            <p>Error: {error}</p>
          </div>
        )}
        {!data ? (
          <div className="text-center text-gray-500">
            Loading weather data...
          </div>
        ) : (
          <section className="flex h-96">
            {/* Left Section */}
            <section className="h-full w-1/2 flex flex-col justify-around p-4">
              <div className="flex items-center space-x-4">
                <svg
                  fill="#000000"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M256,32C167.67,32,96,96.51,96,176c0,128,160,304,160,304S416,304,416,176C416,96.51,344.33,32,256,32Zm0,224a64,64,0,1,1,64-64A64.07,64.07,0,0,1,256,256Z" />
                </svg>
                <div>
                  <p className="text-xl font-semibold text-gray-700">
                    {data.name}
                  </p>
                  <p className="text-md text-black">{data.sys.country}</p>
                </div>
              </div>
              <div className=" w-full flex justify-center text-7xl font-bold text-gray-900/80">
                {formatTemperature(data.main.temp)}°C
              </div>
              <div className="  w-full flex justify-center text-slate-100 text-lg">
                {data.weather[0].description.toUpperCase()}
              </div>
            </section>

            {/* Right Section */}
            <section className="h-full w-1/2 p-4 grid grid-cols-2 gap-1 text-white rounded-r-md">
              <div className="flex flex-col text-[13px] h-24 bg-slate-900/20 justify-center items-center">
                <a className="flex justify-center">
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.7639 7C16.3132 6.38625 17.1115 6 18 6C19.6569 6 21 7.34315 21 9C21 10.6569 19.6569 12 18 12H3M8.50926 4.66667C8.87548 4.2575 9.40767 4 10 4C11.1046 4 12 4.89543 12 6C12 7.10457 11.1046 8 10 8H3M11.5093 19.3333C11.8755 19.7425 12.4077 20 13 20C14.1046 20 15 19.1046 15 18C15 16.8954 14.1046 16 13 16H3"
                      stroke="#ffff"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                Wind:{" "}
                <b className="text-xl">
                  {" "}
                  {((data.wind.speed * 3600) / 1000).toFixed(0)} Km/h
                </b>
              </div>

              <div className="flex flex-col text-[13px] h-24 bg-slate-900/20 justify-center items-center">
                <a className="flex justify-center">
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 21.5C16.1012 21.5 19.5 18.4372 19.5 14.5714C19.5 12.1555 18.2672 9.71249 16.8732 7.70906C15.4698 5.69214 13.8515 4.04821 12.9778 3.21778C12.4263 2.69364 11.5737 2.69364 11.0222 3.21779C10.1485 4.04821 8.53016 5.69214 7.1268 7.70906C5.73282 9.71249 4.5 12.1555 4.5 14.5714C4.5 18.4372 7.8988 21.5 12 21.5Z"
                      stroke="#ffff"
                    />
                    <path
                      d="M12 18C11.4747 18 10.9546 17.8965 10.4693 17.6955C9.98396 17.4945 9.54301 17.1999 9.17157 16.8284C8.80014 16.457 8.5055 16.016 8.30448 15.5307C8.10346 15.0454 8 14.5253 8 14"
                      stroke="#ffff"
                      strokeLinecap="round"
                    />
                  </svg>
                </a>
                Humidity: <b className="text-xl"> {data.main.humidity}%</b>
              </div>

              <div className="flex flex-col text-[13px] h-24 bg-slate-900/20 justify-center items-center">
                <a className="flex justify-center">
                  <img src={Pressure} alt="Pressure Icon" className="h-8 w-8" />
                </a>
                Air Pressure:{" "}
                <b className="text-xl">{data.main.pressure} hPa</b>
              </div>

              <div className="flex flex-col text-[13px] h-24 bg-slate-900/20 justify-center items-center">
                <a className="flex justify-center">
                  <img src={Eye} alt="Eye Icon" className="h-6 w-6" />
                </a>
                Visibility:{" "}
                <b className="text-xl"> {data.visibility / 1000} km</b>
              </div>

              {/* masnd,m */}
              <div className="flex flex-col text-[13px] h-24 bg-slate-900/20 justify-center items-center">
                <a className="flex justify-center">
                  <img src={Temp} alt="Pressure Icon" className="h-6 w-6" />
                </a>
                Feels Like:{" "}
                <b className="text-xl">
                  {formatTemperature(data.main.feels_like) - 1.0}°C
                </b>
              </div>

              <div className="flex flex-col text-[13px] h-24 bg-slate-900/20 justify-center items-center">
                <a className="flex justify-center">
                  <img src={Cloud} alt="Eye Icon" className="h-6 w-6" />
                </a>
                Cloudiness: <b className="text-xl"> {data.clouds.all} %</b>
              </div>
            </section>
          </section>
        )}
      </div>
    </div>
  );
};

export default Home;
