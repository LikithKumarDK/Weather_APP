import React, { useEffect, useState } from 'react';
import axios from "axios";
import './App.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [temperature, setTemperature] = useState("");
  const [city, setCity] = useState("bangalore");
  const [desc, setDesc] = useState("");
  const [name, setName] = useState("");
  const [humidity, setHumidity] = useState("");
  const [visibility, setVisibility] = useState("");
  const [windspeed, setWineSpeed] = useState("");
  const [wicon, setWicon] = useState("");

  useEffect(() => {
    window.process = {
      ...window.process,
    };
    getWeatherData();    
  }, [])

  const getWeatherData = () => {
    const { REACT_APP_API_URL } = process && process?.env;
    if (REACT_APP_API_URL) {
      setIsLoading(true);
      axios({
        method: "GET",
        url: `${REACT_APP_API_URL}/getWeatherInfo/city?city=${city}`
      })
        .then((response) => {
          setTemperature(Math.round(response.data.main.temp - 273.15));
          setDesc(response.data.weather[0].description);
          setName(response.data.name);
          setHumidity(response.data.main.humidity);
          setVisibility(response.data.visibility / 1000);
          setWineSpeed(response.data.wind.speed);
          setWicon(response.data.weather[0].icon);
          console.log(response);
          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
        })
        .catch((error) => {
          setIsLoading(false);
          setError(true);
        });
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div>
          <h1>Weather APP</h1>
        </div>
        <form id="content" autoComplete="off">
          <input
            type="text"
            name="input"
            className="Search-box"
            onChange={(e) => setCity(e.target.value)}
          />
          <span></span>
        </form>
        <button
          className="search_btn"
          onClick={() => {
            getWeatherData(city);
          }}
        >
          Search
        </button>
        <div id="card" className="weather">
          {isLoading ? (
            <div className='loading_view'>
              <div className="loading" />
            </div>
          ) : (
            !error ? (
              <>
                <div className="details">
                  <div className="temp">
                    {temperature}
                    <span>&deg;</span>
                  </div>
                  <div className="right">
                    <div id="summary">{desc}</div>
                    <div style={{ fontWeight: "bold", marginTop: "4px" }}>{name}</div>
                  </div>
                </div>
                <img className="weather_img" alt="image1" src={`${wicon}.svg`} />
                <div className="infos">
                  <img
                    alt="humidity1"
                    className="humidity_img"
                    style={{ width: "5", height: "5" }}
                    src="humidity.svg"
                  ></img>
                  <div className="humidity">Humidity {humidity}%</div>
                  <img
                    alt="visibility1"
                    className="visibility_img"
                    style={{ width: "5", height: "5" }}
                    src="visibility.svg"
                  ></img>
                  <div className="visibility">Visibility {visibility} km</div>
                  <img
                    alt="wind_speed1"
                    className="wind_img"
                    style={{ width: "5", height: "5" }}
                    src="wind.svg"
                  ></img>
                  <div className="wind_speed">Wind Speed {windspeed} km</div>
                </div>
              </>
            ) : (
              <div className='notfound'>
                Not Found !!!
              </div>
            )
          )}
        </div>
      </div>
    </div >
  );
}

export default App;
