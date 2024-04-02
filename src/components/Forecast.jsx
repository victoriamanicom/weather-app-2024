import { Paper, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { TemperatureUnitContext } from "../context/TemperatureUnitContext";
import { CurrentViewContext } from "../context/CurrentViewContext";

function Forecast() {
  const [isCelcius, setIsCelcius] = useContext(TemperatureUnitContext);
  const [currentViewLocation, setCurrentViewLocation] =
    useContext(CurrentViewContext);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [timezone, setTimezone] = useState("");
  const unit = isCelcius ? "imperial" : "metric";

  const fetchCurrentWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${currentViewLocation}&units=${unit}&appid=${
          import.meta.env.VITE_APP_API_KEY
        }`
      );
      setWeather({ data: response.data, loading: false, error: false });
    } catch (error) {
      console.error(error);
    }
  };
  const fetchForecast = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${currentViewLocation}&appid=${
          import.meta.env.VITE_APP_API_KEY
        }&units=${unit}&cnt=7`
      );
      setForecast(response.data.list);
      setTimezone(response.data.city.timezone);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCurrentWeather();
    fetchForecast();
    localStorage.setItem("currentView", currentViewLocation);
  }, [isCelcius, currentViewLocation]);

  return (
    <>
      <Paper sx={{ p: 5, m: 2 }}>
        <Stack
          alignItems="center"
          justifyContent="space-between"
          direction="row"
          gap={3}
        >
          <div>
            <Typography variant="h1">{currentViewLocation}</Typography>
            <Typography variant="subtitle1" sx={{ ml: 2 }}>
              {weather
                ? new Date(
                    (weather.data.dt + timezone) * 1000
                  ).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "loading..."}
            </Typography>
          </div>
          {weather ? (
            <>
              <img
                className="card-weather-icon"
                src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                height="200px"
                alt={weather.data.weather[0].description}
              />
              <Typography variant="h3" sx={{ mr: 5 }}>
                {Math.round(weather.data.main.temp)}°{isCelcius ? "F" : "C"}
              </Typography>
            </>
          ) : (
            "loading"
          )}
        </Stack>

        <Stack direction="row" spacing={2}>
          {forecast.map((hourlyForecast) => (
            <Paper sx={{ p: 1 }}>
              <Stack alignItems="center">
                <Typography>
                  {new Date(
                    (hourlyForecast.dt + timezone) * 1000
                  ).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
                <img
                  className="card-weather-icon"
                  src={`https://openweathermap.org/img/wn/${hourlyForecast.weather[0].icon}@2x.png`}
                  height="70px"
                  alt={hourlyForecast.weather[0].description}
                />
                <Typography>
                  {Math.round(hourlyForecast.main.temp)}°{isCelcius ? "F" : "C"}
                </Typography>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Paper>
    </>
  );
}

export default Forecast;
