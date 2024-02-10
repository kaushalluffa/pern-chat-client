import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { Button, Grid, Paper, TextField, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";

const SignupPage = () => {
  const theme = useTheme();
  return (
    <Grid
      container
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        flexDirection="column"
        container
        component={Paper}
        variant="outlined"
        maxWidth={theme.breakpoints.values.sm}
        gap={2}
        p={4}
      >
        <Typography variant="h5">Don't have an account?</Typography>
        <TextField size="small" placeholder="Email" />
        <TextField size="small" placeholder="Password" />
        <TextField size="small" placeholder="Name" />
        <Button size="small" variant="contained">
          Signup
        </Button>
        <Link to="/login">Already have an account? Log in</Link>
      </Grid>
    </Grid>
  );
};

export default SignupPage;
