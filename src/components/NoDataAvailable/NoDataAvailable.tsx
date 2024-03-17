import { Grid, Typography, useTheme } from "@mui/material";
import React from "react";

const NoDataAvailable = ({ message }: { message?: string }) => {
  const theme = useTheme();
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Typography color={theme.palette.text.secondary}>
        {message ?? "No data available"}
      </Typography>
    </Grid>
  );
};

export default NoDataAvailable;
