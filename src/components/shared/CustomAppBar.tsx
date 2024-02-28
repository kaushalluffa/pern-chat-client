import {
  AppBar,
  Avatar,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CustomAppBarProps } from "@/utils/types";

const CustomAppBar = ({
  drawerWidth,
  currentLoggedInMember,
}: CustomAppBarProps) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
      color="transparent"
    >
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item display="flex" gap={1} alignItems="center">
            <Avatar src={""} />
            <Grid item>
              <Typography>{currentLoggedInMember?.user?.name}</Typography>
              <Typography variant="caption">Online</Typography>
            </Grid>
          </Grid>
          <IconButton sx={{ bgcolor: "#EFEFFD", color: "#615EF0" }}>
            <MoreVertIcon />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
