import React from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Modal,
  Tabs,
  Tab,
  Menu,
  MenuItem,
} from "@mui/material";
import PropTypes from "prop-types";
import { useFlightContext } from "../context/FlightContext";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useNavigate } from "react-router-dom";
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
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const Navbar = () => {
  const { user, setUser, open, setOpen, setSelectedFlight,setFlights } =
    useFlightContext();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              ":hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => {
              setSelectedFlight();
              navigate("/");
            }}
          >
            Flight Booking
          </Typography>
          {user ? (
            <div>
              <Button
                id="basic-button"
                aria-controls={openMenu ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? "true" : undefined}
                onClick={handleClick}
                sx={{ color: "white" }}
              >
                {user.name}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={() => {
                    localStorage.removeItem("userInfo");
                    handleCloseMenu();
                    setUser();
                    setSelectedFlight();
                    setFlights([]);
                    navigate("/");
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Button color="inherit" onClick={handleOpen}>
              SignUp/SignIN
            </Button>
          )}
          {!user && (
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    sx={{ display: "flex", alignContent: "space-evenly" }}
                  >
                    <Tab label="SignIn" {...a11yProps(0)} />
                    <Tab label="SignUp" {...a11yProps(1)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <SignIn handleClose={handleClose} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <SignUp handleClose={handleClose} />
                </TabPanel>
              </Box>
            </Modal>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
