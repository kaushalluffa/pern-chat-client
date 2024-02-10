import { Grid } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import ResponsiveDrawer from "./components/ResponsiveDrawer/ResponsiveDrawer";
import SideBarServer from "./components/shared/SideBarServer";

function App() {
  return (
    <Grid container alignItems="center" flexDirection="row">
      {/* <SideBarServer /> */}
      <ResponsiveDrawer />
    </Grid>
  );
}

export default App;
