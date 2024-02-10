import {
  Avatar,
  Divider,
  Grid,
  IconButton,
  Paper,
  useTheme,
} from "@mui/material";
import React, { memo } from "react";
import AddIcon from "@mui/icons-material/Add";
const SideBarServer = () => {
  const theme = useTheme();
  return (
    <Grid
      component={Paper}
      maxWidth="80px"
      container
      sx={{
        height: "100vh",
      }}
      variant="outlined"
      flexDirection="column"
      p={2}
      alignItems="center"
      gap={2}
    >
      <Grid item>
        <IconButton
          sx={{
            border: 1,
            borderColor: theme.palette.divider,
            borderRadius: "50%",
            mb: 2,
          }}
        >
          <AddIcon color="success" />
        </IconButton>
        <Divider />
      </Grid>
      <Grid
        sx={{
          maxHeight: "70vh",
          overflow: "scroll",
          "&::-webkit-scrollbar": { display: "none" },
        }}
        container
        flexDirection="column"
        gap={2}
        alignItems="center"
        flexWrap="nowrap"
      >
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </Grid>
      <Grid
        container
        flexDirection="column"
        gap={2}
        alignItems="center"
        sx={{ borderTop: 1, borderColor: theme.palette.divider, pt: 2 }}
      >
        <Avatar />
        <Avatar />
      </Grid>
    </Grid>
  );
};

export default memo(SideBarServer);
