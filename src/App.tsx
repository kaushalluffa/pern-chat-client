import { Grid } from "@mui/material";
import React from "react";
import ResponsiveDrawer from "./components/ResponsiveDrawer/ResponsiveDrawer";

function App() {
  return (
    <Grid container alignItems="center" flexDirection="row">
      <ResponsiveDrawer />
    </Grid>
  );
}

export default App;
