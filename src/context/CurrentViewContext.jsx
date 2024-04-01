import { createContext, useState } from "react";

export const CurrentViewContext = createContext();

export const CurrentViewProvider = (props) => {
  const getCurrentView = localStorage.getItem("currentView");
  const [currentViewLocation, setCurrentViewLocation] = useState(
    getCurrentView ? getCurrentView : "London"
  );

  return (
    <CurrentViewContext.Provider
      value={[currentViewLocation, setCurrentViewLocation]}
    >
      {props.children}
    </CurrentViewContext.Provider>
  );
};
