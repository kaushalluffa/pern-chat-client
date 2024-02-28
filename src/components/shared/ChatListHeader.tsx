import { Grid, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import SettingIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import { Home } from "@mui/icons-material";

const ChatListHeader = () => {
  return (
    <Toolbar>
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Hi, Kaushal</Typography>
        <Grid item display="flex" alignItems="center" gap={1}>
          <Link to="/">
            <IconButton
              sx={{
                color: `#615EF0`,
                bgcolor: "#EFEFFD",
              }}
            >
              <Home />
            </IconButton>
          </Link>
          <IconButton
            sx={{
              color: `#615EF0`,
              bgcolor: "#EFEFFD",
            }}
          >
            <SettingIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Toolbar>
  );
};

export default ChatListHeader;
