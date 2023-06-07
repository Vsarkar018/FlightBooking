import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ContextProvider = React.createContext();
const FlightContext = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState();
  const [selectedFlight, setSelectedFlight] = useState();
  const [flights, setFlights] = useState([]);
  const [airports, setAirports] = useState([]);
  const [noFlight, setNoFlight] = useState(false);
  const [open, setOpen] = useState(false);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      return;
    }
    setUser(userInfo);
    navigate("/");
  }, [navigate]);
  useEffect(() => {
    selectedFlight && navigate("/booking");
  }, [selectedFlight, navigate]);
  return (
    <ContextProvider.Provider
      value={{
        to,
        setTo,
        from,
        setFrom,
        airports,
        setAirports,
        isLogged,
        setIsLogged,
        user,
        setUser,
        flights,
        setFlights,
        selectedFlight,
        setSelectedFlight,
        noFlight,
        setNoFlight,
        open,
        setOpen,
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
};

export const useFlightContext = () => {
  return useContext(ContextProvider);
};

export default FlightContext;
