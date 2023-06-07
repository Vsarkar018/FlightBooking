import React, { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Skeleton,
  Typography,
  TextField,
  ListSubheader
} from "@mui/material";
import axios from "axios";
import { useFlightContext } from "../context/FlightContext";
const AirportList = ({
  heading,
  handleClose,
  setFromName,
  setToName,
  value,
  setValue,
}) => {
  const { airports, setFrom, setTo, setAirports } = useFlightContext();
  const [selectedAiport, setSelectedAiport] = useState("");
  const [search, setSearch] = useState();
  useEffect(() => {
    if (heading === "From" && selectedAiport) {
      setFrom(selectedAiport._id);
      setFromName(selectedAiport.name);
      handleClose();
    }
    if (heading === "Destination" && selectedAiport) {
      setTo(selectedAiport._id);
      setToName(selectedAiport.name);
      handleClose();
    }
  }, [
    selectedAiport,
    heading,
    setFrom,
    setTo,
    handleClose,
    setFromName,
    setToName,
  ]);
  const getAirports = async (e) => {
    setValue(e.target.value);
    setSearch(e.target.value);
    if (!search) {
      return;
    }
    try {
      const { data } = await axios.get(`/api/v1/airport?search=${search}`);
      setAirports(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <Typography variant="h4" position="static">
        {heading}
      </Typography>
      <TextField
        label="search"
        variant="filled"
        width="100%"
        onChange={getAirports}
        value={value}
        inputRef={(input) => {
          if (input != null) {
            input.focus();
          }
        }}
      />

      <List
        component="nav"
        aria-label="main mailbox folders"
        sx={{
          width: "100%",
          position: "relative",
          overflow: "auto",
          maxHeight: 300,
        }}
      >
        {airports.length > 0 ? (
          airports.map((airport, i) => {
            return (
              <ListItemButton
                key={airport._id}
                onClick={(e) => {
                  setSelectedAiport(airport);
                }}
              >
                <ListItemText
                  primary={airport.name}
                  secondary={`${airport.city} , ${airport.country}`}
                />
              </ListItemButton>
            );
          })
        ) : (
          <Box sx={{ width: "100%" }}>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </Box>
        )}
      </List>
    </Box>
  );
};

export default AirportList;
