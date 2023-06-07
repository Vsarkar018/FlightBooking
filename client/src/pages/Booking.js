import React from 'react';
import {Box,Button,Container,Paper,Stack, Typography} from '@mui/material'
import { styled } from '@mui/material/styles';
import { useFlightContext } from "../context/FlightContext";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: "black",
  fontSize:25
}));


const Booking = () => {
  const { selectedFlight } = useFlightContext();
  console.log(selectedFlight.airline.name);
  return (
    <Container
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box sx={{ width: "50%", m: 15 }}>
        <Stack spacing={2}>
          <Item><b>Airline :</b> {selectedFlight.airline.name}</Item>
          <Item><b>From : </b>{selectedFlight.startFrom.name}</Item>
          <Item><b>Destination :</b>{selectedFlight.destination.name}</Item>
          <Item><b>Boarding Date:</b> {selectedFlight.date}</Item>
          <Item><b>Price :</b> {selectedFlight.price}</Item>
          <Button sx={{backgroundColor:"#1976d2" ,color:"white",":hover":{
            backgroundColor:"blue"
          }}}>Book</Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default Booking;
