import { Button, Grid, Paper, TextField, useTheme } from "@mui/material";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { useMutation } from "@tanstack/react-query";
import { createServer } from "../../api/createServer";
import { useNavigate } from "react-router-dom";

const Setup = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [openSnackBar, setOpenSnackBar] = useState<{
    open: boolean;
    message: any;
  }>({ open: false, message: "" });
  const [serverFormData, setServerFormData] = useState<{
    serverName: string;
    serverDesc: string;
  }>({ serverDesc: "", serverName: "" });
  const [disable, setDisable] = useState<{
    message: string;
    status: boolean;
  }>({
    message: "",
    status: false,
  });
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setServerFormData((prev: typeof serverFormData) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }
  const { isPending, mutate } = useMutation({
    mutationFn: ({
      serverName,
      serverDesc,
    }: {
      serverName: string;
      serverDesc?: string;
    }) => {
      return createServer({ serverName, serverDesc });
    },
    onSuccess: (data) => {
      setOpenSnackBar({
        open: true,
        message: "Server Created",
      });
      setDisable({ message: "", status: true });
      console.log(data, "data");
      navigate(`/server/${data?.id}`);
    },
    onError: (error: any) => {
      setOpenSnackBar({
        open: true,
        message: error,
      });
    },
  });
  function handleCreateServer() {
    mutate(serverFormData);
  }
  return (
    <Grid
      container
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        flexDirection="column"
        container
        component={Paper}
        variant="outlined"
        maxWidth={theme.breakpoints.values.sm}
        gap={2}
        p={4}
        textAlign="center"
      >
        <Typography variant="h5">Setup your first server.</Typography>
        <TextField
          type="text"
          name="serverName"
          onChange={handleChange}
          size="small"
          placeholder="Server Name"
        />
        <TextField
          type="text"
          name="serverDesc"
          onChange={handleChange}
          size="small"
          placeholder="Server Description (optional)"
        />
        <Button onClick={handleCreateServer} variant="contained">
          Create
        </Button>
      </Grid>
    </Grid>
  );
};

export default Setup;
