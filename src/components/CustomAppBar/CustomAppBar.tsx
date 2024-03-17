import {
  AppBar,
  Avatar,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CustomAppBarProps } from "@/utils/types";

const CustomAppBar = ({
  drawerWidth,
  currentLoggedInMember,
}: CustomAppBarProps) => {
  const theme = useTheme();
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
            <Avatar sx={{ color: theme.palette.text.primary }} src={""} />
            <Grid item>
              <Typography color={theme.palette.text.secondary}>
                {currentLoggedInMember?.user?.name}
              </Typography>
              <Typography
                color={theme.palette.text.secondary}
                variant="caption"
              >
                Online
              </Typography>
            </Grid>
          </Grid>
          <IconButton sx={{ color: theme.palette.text.secondary }}>
            <MoreVertIcon />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
