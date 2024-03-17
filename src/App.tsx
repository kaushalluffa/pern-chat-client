import { Grid } from "@mui/material";
import React from "react";
import ResponsiveChatDrawer from "./components/ResponsiveChatDrawer/ResponsiveChatDrawer";

function App() {
  return (
    <Grid container alignItems="center" flexDirection="row">
      <ResponsiveChatDrawer />
    </Grid>
  );
}

export default App;
