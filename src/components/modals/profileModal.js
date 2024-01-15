"use client";
import { useContext } from "react";
import { AuthContext } from "@/utils/authContext";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
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
          <div className="flex justify-center items-center mb-4">
            <Avatar sx={{ width: 200, height: 200 }} />
          </div>
          <div className="mb-4">
            Username
            <TextField
              value={user?.username}
              disabled
              margin="none"
              fullWidth
              type="email"
            />
          </div>
          <div>
            Email
            <TextField
              value={user?.email}
              disabled
              margin="none"
              fullWidth
              type="email"
            />
          </div>
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
