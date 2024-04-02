import {
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Stack,
  TextField,
  CardActionArea,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FavouriteIcon from "./FavouriteIcon";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { LocationsContext } from "../context/LocationsContext";
import { TemperatureUnitContext } from "../context/TemperatureUnitContext";
import { CurrentViewContext } from "../context/CurrentViewContext";

function LocationCard({ id, location, favourite }) {
  const [locations, setLocations] = useContext(LocationsContext);
  const [isCelcius, setIsCelcius] = useContext(TemperatureUnitContext);
  const [currentViewLocation, setCurrentViewLocation] =
    useContext(CurrentViewContext);
  const [weather, setWeather] = useState(null);
  const [locationName, setLocation] = useState(location);
  const [favourited, setFavourited] = useState(favourite);
  const [isEditable, setIsEditable] = useState(false);
  const apiKey = "2147a905fedead0898bb37909c7739e4";
  const unit = isCelcius ? "imperial" : "metric";

  const fetchCurrentWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${locationName}&units=${unit}&appid=${process.env.VITE_APP_API_KEY}`
      );
      setWeather({ data: response.data, loading: false, error: false });
    } catch (error) {
      console.error(error);
    }
  };

  const favouriteLocation = () => {
    const filteredLocations = locations.map((item) => {
      if (item.name === location) {
        item.favourite = !item.favourite;
        setFavourited(item.favourite);
      }
      return item;
    });
    const favouriteLocations = filteredLocations.filter(
      (location) => location.favourite
    );
    const sortedLocations = locations.filter((location) => !location.favourite);
    favouriteLocations.forEach((favLocation) => {
      sortedLocations.unshift(favLocation);
    });
    setLocations(sortedLocations);
  };

  const handleLocationChange = (event) => {
    const filteredLocations = locations.map((item) => {
      if (item.name === location) {
        item.name = event.target.value;
      }
      return item;
    });
    setLocations(filteredLocations);
  };

  const deleteLocation = () => {
    const filteredLocations = locations.filter((item) => {
      if (item.name !== location) {
        return item.id;
      }
    });
    setLocations(filteredLocations);
  };

  const handleCardClick = () => {
    const filteredLocations = locations.filter((item) => {
      if (item.name === location) {
        return item.name;
      }
    });
    setCurrentViewLocation(filteredLocations[0].name);
  };

  useEffect(() => {
    fetchCurrentWeather();
  }, [isEditable, isCelcius]);
  return (
    <>
      <Card
        sx={{ m: 2 }}
        onClick={(e) => {
          handleCardClick(e);
        }}
      >
        <CardActionArea>
          <CardContent sx={{ pt: 0, pb: 0 }}>
            <Stack
              alignItems="center"
              justifyContent="space-between"
              direction="row"
              gap={3}
            >
              {isEditable ? (
                <TextField
                  id={id}
                  autoFocus
                  value={locationName}
                  onChange={(event) => {
                    setLocation(event.target.value);
                  }}
                  onBlur={(event) => {
                    setIsEditable(false);
                    handleLocationChange(event);
                  }}
                />
              ) : (
                <Typography variant="h5" component="div">
                  {locationName}
                </Typography>
              )}
              {weather ? (
                <>
                  <Typography variant="h6">
                    {Math.round(weather.data.main.temp)}°{isCelcius ? "F" : "C"}
                  </Typography>
                  <img
                    className="card-weather-icon"
                    src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                    height="70px"
                    alt={weather.data.weather[0].description}
                  />
                </>
              ) : (
                "loading"
              )}
            </Stack>
          </CardContent>
          <CardActions sx={{ pt: 0 }}>
            <IconButton value={id} size="small" onClick={favouriteLocation}>
              <FavouriteIcon filled={favourited} />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => {
                setIsEditable(true);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              id={id}
              size="small"
              onClick={(e) => {
                deleteLocation(e);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </CardActionArea>
      </Card>
    </>
  );
}

export default LocationCard;
