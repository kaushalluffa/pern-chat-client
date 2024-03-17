import { Grid, Paper, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import { useAuthContext } from "@/contexts/AuthContext";
import FullScreenLoader from "../FullScreenLoader/FullScreenLoader";
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
  const [value, setValue] = useState<number>(0);
  function handleChange(event: React.SyntheticEvent, newValue: number) {
    setValue(newValue);
  }
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
        <Tabs value={value} onChange={handleChange} component={Paper}>
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>
        <CustomTabPanel value={value} index={0}>
          <Login />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Signup />
        </CustomTabPanel>
      </Grid>
    </Grid>
  );
};

export default Auth;
