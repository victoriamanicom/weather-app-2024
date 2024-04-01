import { Box, Stack, Switch, Typography } from "@mui/material";
import { useContext } from "react";
import { TemperatureUnitContext } from "../context/TemperatureUnitContext";

function Header() {
  const [isCelcius, setIsCelcius] = useContext(TemperatureUnitContext);
  return (
    <>
      <Box sx={{ py: 1, px: 2, boxShadow: 1, bgcolor: "#E0C2FF" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">Weather App</Typography>
          <Stack direction="row" alignItems="center">
            <Typography>°C</Typography>
            <Switch
              color="secondary"
              onChange={(e) => {
                setIsCelcius(e.target.checked);
              }}
            />
            <Typography>°F</Typography>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

export default Header;
