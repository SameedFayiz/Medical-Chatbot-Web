"use client";
import { useContext, useState } from "react";
import { AuthContext } from "@/utils/authContext";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const ProfileModal = (props) => {
  const [user, setUser] = useContext(AuthContext);
  const [open, setOpen] = props.state;

  const handleClose = () => {
    setOpen(false);
  };

  const userLogout = () => {
    localStorage.clear("user");
    setUser(null);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="rounded-3xl"
      >
        <DialogTitle id="alert-dialog-title" className="rounded-t-2xl">
          Profile
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            className="bg-slate-500 hover:bg-slate-400 text-white"
            onClick={handleClose}
            autoFocus
          >
            Close
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-600 text-white"
            onClick={userLogout}
            autoFocus
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfileModal;
