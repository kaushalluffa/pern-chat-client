import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
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
        <Typography variant="h5">Already have an account?</Typography>
        <TextField size="small" placeholder="Email" />
        <TextField size="small" placeholder="Password" />
        <Button size="small" variant="contained">
          Login
        </Button>
        <Link to="/signup">Don't have an account? Sign up</Link>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
