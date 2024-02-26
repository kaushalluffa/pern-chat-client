import { CircularProgress, Grid } from "@mui/material";
import React, { useEffect } from "react";
const Auth = () => {
  useEffect(() => {
    window.location.replace("http://localhost:8000/auth");
  }, []);
  return (
    <Grid
      container
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress />
    </Grid>
  );
};

export default Auth;
