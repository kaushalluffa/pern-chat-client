import { Button, Grid, Paper, TextField, useTheme } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";

const Setup = () => {
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
        textAlign="center"
      >
        <Typography variant="h5">Setup your first server.</Typography>
        <TextField size="small" placeholder="Server Name" />
        <TextField size="small" placeholder="Server Description (optional)" />
        <Button variant="contained">Create</Button>
      </Grid>
    </Grid>
  );
};

export default Setup;
