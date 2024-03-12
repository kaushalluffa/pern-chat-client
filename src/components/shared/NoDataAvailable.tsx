import { Grid, Typography } from "@mui/material";
import React from "react";

const NoDataAvailable = ({ message }: { message?: string }) => {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Typography>{message ?? "No data available"}</Typography>
    </Grid>
  );
};

export default NoDataAvailable;
