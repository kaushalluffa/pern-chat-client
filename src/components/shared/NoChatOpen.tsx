import { Grid, Paper, Typography } from "@mui/material";
import React from "react";

const NoChatOpen = ({ drawerWidth }: { drawerWidth: number }) => {
  return (
    <Grid
      container
      sx={{
        ml: { sm: `${drawerWidth}px` },
        backgroundImage: `radial-gradient(#444cf7 2px, transparent 2px), radial-gradient(#444cf7 2px, transparent 2px)`,
        backgroundSize: " 80px 80px",
        backgroundPosition: "0 0,40px 40px",
      }}
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Paper variant="elevation" sx={{ p: 5 }}>
        <Typography variant="h4">Click on chat to start.</Typography>
      </Paper>
    </Grid>
  );
};

export default NoChatOpen;
