import React from "react";
import {
  Stack,
  Typography,
  List,
  Box,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useFlightContext } from "../context/FlightContext";
import { useNavigate } from "react-router-dom";
const Flights = () => {
  const { flights, setSelectedFlight, noFlight } = useFlightContext();
  const navigate = useNavigate()
  return (
    <Stack spacing={1}>
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <Typography variant="h4">Flights</Typography>
        <List
          component="nav"
          sx={{ position: "relative", overflow: "auto", maxHeight: 300 }}
        >
          {flights.length > 0 &&
            flights.map((flight) => {
              return (  
                <ListItemButton
                  key={flight._id}
                  onClick={(e) => {
                    setSelectedFlight(flight);
                    navigate("/booking")
                  }}
                >
                  <ListItemText
                    primary={`Airline : ${flight.airline.name}`}
                    secondary={`Price : ${flight.price}`}
                  />
                </ListItemButton>
              );
            })}
        </List>
        {noFlight && flights.length === 0 && (
          <Typography variant="h6">No Flights available</Typography>
        )}
      </Box>
    </Stack>
  );
};

export default Flights;
