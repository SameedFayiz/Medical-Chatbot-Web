"use client";
import { useContext, useState, useEffect, useRef } from "react";
import SettingsModal from "../modals/settingsModal";
import ProfileModal from "../modals/profileModal";
import { AuthContext } from "@/utils/authContext";
import SideBarItem from "./sideBarItem";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Stack,
} from "@mui/material";
import { Add } from "@mui/icons-material";

const Item = SideBarItem;

const SideBar = (props) => {
  const [user, setUser] = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [profile, setProfile] = useState(false);
  const [settings, setSettings] = useState(false);
  const [open, setOpen] = useState(false);
  const delRef = useRef(null);

  const handleClick = (func) => {
    func(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      if (user) {
        try {
          let myRequest = await fetch(
            `http://localhost:3001/chats/findByUserId/${user?._id}`
          );
          let res = await myRequest.json();
          if (res.error) {
            throw res;
          }
          setChats(res.chats);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [user]);

  const deleteChat = async (param) => {
    try {
      let myRequest = await fetch(`http://localhost:3001/chats/${param}`, {
        method: "DELETE",
      });
      let res = await myRequest.json();
      console.log(res);
      return res;
    } catch (error) {
      return error;
    }
  };

  const createChat = async () => {
    try {
      let reqBody = { userId: user?._id };
      let myRequest = await fetch(`http://localhost:3001/chats/`, {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: { "Content-Type": "application/json" },
      });
      let res = await myRequest.json();
      if (res.error) {
        throw res;
      }
      console.log(res);
      let tmp = chats;
      tmp.push(res.chat);
      setChats([...tmp]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          className="bg-red-600 text-white p-3 text-base font-semibold"
        >
          Delete chat
        </DialogTitle>
        <DialogContent className="pb-2">
          <DialogContentText id="alert-dialog-description" className="pt-4">
            Confirm if you want to delete this chat
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            className="bg-slate-500 text-white hover:bg-slate-400"
          >
            Cancel
          </Button>
          <Button
            className="bg-red-600 text-white hover:bg-red-500"
            onClick={() => {
              deleteChat(delRef.current.id).then((res) => {
                if (!res.error) {
                  let tmp = chats.filter((i) => {
                    if (i._id != delRef.current.id) {
                      return i;
                    }
                  });
                  setChats([...tmp]);
                  handleClose();
                }
              });
            }}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <ProfileModal state={[profile, setProfile]} />
      <SettingsModal state={[settings, setSettings]} />
      <div className="w-full h-full flex flex-col px-2">
        <div className="text-2xl font-bold tracking-wider mb-2">Chats</div>
        <Stack
          divider={<Divider orientation="horizontal" flexItem />}
          spacing={1}
        >
          {chats?.map((i, index) => {
            return (
              <Item
                key={index}
                id={i._id}
                onclick={(e) => {
                  // console.log(e.target);
                }}
                onDelete={(e) => {
                  delRef.current = e.target.parentNode;
                  setOpen(true);
                }}
              >
                {"Chat " + (index + 1)}
              </Item>
            );
          })}
          <Item onclick={createChat} newOpt={true}>
            New Chat
            <Add className="text-lg ms-1" />
          </Item>
        </Stack>
        <div
          className="bg-white w-full h-10 mt-auto mb-2 flex justify-center items-center rounded-lg shadow-2xl shadow-black"
          onClick={() => {
            handleClick(setProfile);
          }}
        >
          Profile
        </div>
        <div
          className="bg-white w-full h-10 flex justify-center items-center rounded-lg shadow-2xl shadow-black"
          onClick={() => {
            handleClick(setSettings);
          }}
        >
          Settings
        </div>
      </div>
    </>
  );
};

export default SideBar;
