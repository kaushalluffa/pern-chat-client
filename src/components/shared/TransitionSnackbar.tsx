import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";

export default function TransitionsSnackbar({
  message,
  isOpen,
}: {
  message: any;
  isOpen: boolean;
}) {
  const [open, setOpen] = useState<boolean>(isOpen);

  return (
    <Snackbar
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      TransitionComponent={Slide}
      message={message}
      key={message}
      autoHideDuration={2000}
    />
  );
}
