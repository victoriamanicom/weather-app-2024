import { Grid } from "@mui/material";
import { LocationsProvider } from "./context/LocationsContext";
import LocationList from "./components/LocationList";
import Forecast from "./components/Forecast";
import Header from "./components/Header";
import { TemperatureUnitProvider } from "./context/TemperatureUnitContext";
import { CurrentViewProvider } from "./context/CurrentViewContext";

function App() {
  const currentView = "London";
  return (
    <LocationsProvider>
      <TemperatureUnitProvider>
        <CurrentViewProvider>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <Header />
            </Grid>
            <Grid item xs={4}>
              <LocationList />
            </Grid>
            <Grid item xs={8}>
              <Forecast />
            </Grid>
          </Grid>
        </CurrentViewProvider>
      </TemperatureUnitProvider>
    </LocationsProvider>
  );
}

export default App;
