import { TextField, Box, Stack, Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useFlightContext } from "../context/FlightContext";

const SignIn = ({ handleClose }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const {setUser} = useFlightContext()
  const handleSubmit = async () => {
    setLoading(true);
    if (!email || !password) {
      setLoading(false);
      setAlert(true);
      return;
    }
    try {
      const { data } = await axios.post("/api/v1/user/login", {
        email,
        password,
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      handleClose();
    } catch (error) {
      setAlert(true);
      setLoading(false);
      console.log(error.response.data);
      handleClose();  
    }
  };
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <Stack spacing={1}>
        <TextField
          label="email"
          variant="filled"
          error={alert}
          onChange={(e) => {
            setEmail(e.target.value);
            setAlert(false);
          }}
        />
        <TextField
          label="password"
          variant="filled"
          type="password"
          error={alert}
          onChange={(e) => {
            setPassword(e.target.value);
            setAlert(false);
          }}
        />
        <Button
          variant="contained"
          sx={{ width: "100%" }}
          onClick={handleSubmit}
          loading={loading}
        >
          SignIn
        </Button>
      </Stack>
    </Box>
  );
};

export default SignIn;
