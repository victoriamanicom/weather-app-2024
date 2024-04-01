import LocationCard from "./LocationCard";
import { useContext, useEffect, useState } from "react";
import { LocationsContext } from "../context/LocationsContext";

function LocationList() {
  const [locations, setLocations] = useContext(LocationsContext);

  useEffect(() => {
    localStorage.setItem("locations", JSON.stringify(locations));
  }, [locations]);

  return (
    <>
      {locations.map((location) => (
        <LocationCard
          key={location.id}
          id={location.id}
          location={location.name}
          favourite={location.favourite}
        />
      ))}
    </>
  );
}

export default LocationList;
