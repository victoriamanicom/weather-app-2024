import { createContext, useState } from "react";

export const TemperatureUnitContext = createContext();

export const TemperatureUnitProvider = (props) => {
  const [isCelcius, setIsCelcius] = useState(false);

  return (
    <TemperatureUnitContext.Provider value={[isCelcius, setIsCelcius]}>
      {props.children}
    </TemperatureUnitContext.Provider>
  );
};
