import React, { useState } from "react";
import { Box, Stack, TextField, Typography, Modal } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AirportList from "./AirportList";
import { useFlightContext } from "../context/FlightContext";
import axios from "axios";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SearchFlight = () => {
  const { setAirports, from, to, setFlights, setNoFlight  } = useFlightContext();
  const [date, setDate] = useState();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertTo, setAlertTo] = useState(false);
  const [alertFrom, setAlertFrom] = useState(false);
  const [alertDate, setAlertDate] = useState(false);
  const [heading, setHeading] = useState();
  const [toName, setToName] = useState();
  const [fromName, setFromName] = useState();
  const [value,setValue] = useState()
  const handleClose = () => setOpen(false);
  const getAirports = async () => {
    try {
      const { data } = await axios.get("/api/v1/airport/all");
      setAirports(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    if (!to) {
      setAlertTo(true);
      setLoading(false);
      return;
    }
    if (!from) {
      setAlertFrom(true);
      setLoading(false);
      return;
    }
    if (!date) {
      setAlertDate(true);
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.get(
        `/api/v1/flight?to=${to}&from=${from}&date=${date}`,
        {
          date,
          startFrom: from,
          destination: to,
        }
      );
      if (data.length === 0) {
        setNoFlight(true);
        setFlights([]);
        setLoading(false);
        return;
      }
      setNoFlight(false);
      setFlights(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <>
      <Stack spacing={1}>
        <Typography variant="h4">Search For Flights</Typography>
        <TextField
          label="From"
          variant="filled"
          width="100%"
          value={fromName}
          onChange={(e) => {
            setHeading("From");
            setOpen(true);
            getAirports();
            setAlertFrom(false);
            setValue(e.target.value)
          }}
          error={alertFrom}
          />
        <TextField
          label="to"
          variant="filled"
          width="100%"
          value={toName}
          onChange={(e) => {
            setHeading("Destination");
            setOpen(true);
            getAirports();
            setAlertTo(false);
            setValue(e.target.value)
          }}
          error={alertTo}
        />
        <TextField
          variant="filled"
          width="100%"
          type="date"
          error={alertDate}
          onChange={(e) => {
            setDate(e.target.value);
            setAlertDate(false);
          }}
        />
        <LoadingButton
          variant="contained"
          sx={{ width: "100%" }}
          onClick={handleSubmit}
          loading={loading}
        >
          Search
        </LoadingButton>
      </Stack>
      <div>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AirportList
              heading={heading}
              handleClose={handleClose}
              setFromName={setFromName}
              setToName={setToName}
              value={value}
              setValue={setValue}
            />
   
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default SearchFlight;
