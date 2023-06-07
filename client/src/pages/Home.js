import React from "react";
import { Container, Box } from "@mui/material";
import SearchFlight from "../components/SearchFlight";
import Flights from "../components/Flights";
const Home = () => {
  return (
    <Container sx={{ display: "flex", flexDirection: "row", justifyContent:"space-evenly" }}>
      <Box width="40%" marginTop={8}>
        <SearchFlight />
      </Box>
      <Box width="40%" marginTop={8} >
        <Flights />
      </Box>
    </Container>
  );
};

export default Home;
