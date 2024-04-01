import { createContext, useState } from "react";

export const LocationsContext = createContext();

export const LocationsProvider = (props) => {
  const getLocations = JSON.parse(localStorage.getItem("locations"));
  const [locations, setLocations] = useState(
    getLocations
      ? getLocations
      : [
          { id: "1", name: "London", favourite: true },
          { id: "2", name: "Banff", favourite: true },
          { id: "3", name: "Cancun", favourite: false },
          { id: "4", name: "Berlin", favourite: false },
        ]
  );

  return (
    <LocationsContext.Provider value={[locations, setLocations]}>
      {props.children}
    </LocationsContext.Provider>
  );
};
