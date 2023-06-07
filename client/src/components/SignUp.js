import React, { useState } from "react";
import { TextField, Box, Stack, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
const SignUp = ({ handleClose }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const [alertDet, setAlertDet] = useState(false);
  const [alertPass, setAlertPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPass) {
      setAlertDet(true);
      setLoading(false);
      return;
    }
    if (password !== confirmPass) {
      setAlertPass(true);
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post("/api/v1/user", {
        name,
        email,
        password,
      });
      handleClose();
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return <Alert severity="error">{error.response.data}</Alert>;
    }
  };
  return (
    <>
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
            label="name"
            variant="filled"
            onChange={(e) => {
              setName(e.target.value);
              setAlertDet(false);
            }}
          />
          <TextField
            label="email"
            variant="filled"
            onChange={(e) => {
              setEmail(e.target.value);
              setAlertDet(false);
            }}
            />
          <TextField
            label="Password"
            variant="filled"
            type="password"
            error={alertPass}
            onChange={(e) => {
              setPassword(e.target.value);
              setAlertDet(false);
              setAlertPass(false);
            }}
          />
          <TextField
            label="Confirm Password"
            variant="filled"
            type="password"
            error={alertPass}
            onChange={(e) => {
              setConfirmPass(e.target.value);
              setAlertDet(false);
              setAlertPass(false);
            }}
          />
          <LoadingButton
            variant="contained"
            sx={{ width: "100%" }}
            onClick={handleSubmit}
            loading={loading}
          >
            SignUp
          </LoadingButton>
        </Stack>
        {alertDet && (
          <Alert severity="warning">Please Fill out the Details</Alert>
        )}
      </Box>
    </>
  );
};

export default SignUp;
