"use client";
import React, { useContext } from "react";
import { ErrorContext } from "@/utils/errorContext";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const ErrorModal = () => {
  const [error, setError] = useContext(ErrorContext);

  const handleClose = () => {
    setError(false);
  };

  return (
    <>
      <Dialog
        open={Boolean(error)}
        onClose={handleClose}
        maxWidth={"xs"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          className="text-white bg-red-700 text-lg font-semibold py-2"
          id="alert-dialog-title"
        >
          Error
        </DialogTitle>
        <DialogContent
          className=" pb-0 px-6"
          sx={{ backgroundImage: "url('errorg.jpg')" }}
        >
          <DialogContentText
            className="text-red-600 p-4 text-sm"
            id="alert-dialog-description"
          >
            {error ||
              ` Something went wrong or error has happend because of something i dont know about`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            className="bg-red-600 hover:bg-red-500 text-white"
            onClick={handleClose}
            autoFocus
          >
            Dismiss
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ErrorModal;
