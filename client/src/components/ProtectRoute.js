import { useFlightContext } from "../context/FlightContext";
const ProtectRoute = ({ children }) => {
  const { user, setOpen, selectedFlight } = useFlightContext();
  console.log(selectedFlight);
  const handleOpen = () => setOpen(true);
  if (!user) {
    handleOpen();
  }
  return children;
};

export default ProtectRoute;
