import { Grid, Paper, Tab, Tabs } from "@mui/material";
import React from "react";
import Signup from "./Signup";
import Login from "./Login";
import { useAuthContext } from "@/contexts/AuthContext";
import FullScreenLoader from "../shared/FullScreenLoader";
import useAuth from "@/hooks/useAuth";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return value === index && children;
}
const Auth = () => {
  const { showLoading } = useAuthContext();
  const { tabValue, handleTabChange } = useAuth();
  if (showLoading) {
    return <FullScreenLoader />;
  }
  return (
    <Grid
      container
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item display="flex" flexDirection="column" gap={2} height="500px">
        <Tabs value={tabValue} onChange={handleTabChange} component={Paper}>
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>
        <CustomTabPanel value={tabValue} index={0}>
          <Login />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          <Signup />
        </CustomTabPanel>
      </Grid>
    </Grid>
  );
};

export default Auth;
