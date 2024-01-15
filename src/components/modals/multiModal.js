"use client";
import React, { useContext, useState } from "react";
import { ModalContext } from "@/utils/modalContext";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useEffect } from "react";
import {
  CheckCircleRounded,
  ErrorRounded,
  InfoRounded,
} from "@mui/icons-material";

const MultiModal = () => {
  const [modal, setModal] = useContext(ModalContext);
  const [theme, setTheme] = useState({
    bg: "",
    text: "",
    hover: "",
  });

  useEffect(() => {
    if (modal.type == "info") {
      setTheme({
        bg: "bg-blue-600",
        text: "text-black",
        hover: "bg-blue-600 hover:bg-blue-500",
      });
    } else if (modal.type == "success") {
      setTheme({
        bg: "bg-green-600",
        text: "text-green-600",
        hover: "bg-green-600 hover:bg-green-500",
      });
    } else {
      setTheme({
        bg: "bg-red-600",
        text: "text-red-600",
        hover: "bg-red-600 hover:bg-red-500",
      });
    }
  }, [modal]);

  const handleClose = () => {
    setModal({ ...modal, open: false });
  };

  return (
    <>
      <Dialog
        open={Boolean(modal.open)}
        onClose={handleClose}
        maxWidth={"xs"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          className={`text-white text-lg font-semibold py-2 ${theme.bg}`}
          id="alert-dialog-title"
        >
          {modal.type == "info" ? (
            <div className="flex items-center gap-1">
              Infomation
              <InfoRounded />
            </div>
          ) : modal.type == "success" ? (
            <div className="flex items-center gap-1">
              Success
              <CheckCircleRounded />
            </div>
          ) : (
            <div className="flex items-center gap-1">
              Error
              <ErrorRounded />
            </div>
          )}
        </DialogTitle>
        <DialogContent className=" pb-0 px-6">
          <DialogContentText
            className={`p-4 text-sm ${theme.text}`}
            id="alert-dialog-description"
          >
            {modal.body ||
              `Something went wrong or error has happend because of something i dont know about`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            className={`text-white ${theme.hover}`}
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

export default MultiModal;
