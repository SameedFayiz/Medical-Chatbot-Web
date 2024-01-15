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
import { Add, SmartToyRounded } from "@mui/icons-material";
import { ChatContext } from "@/utils/chatContext";
import { ModalContext } from "@/utils/modalContext";
import { ChatLoadContext } from "@/utils/chatLoadContext";

const Item = SideBarItem;

const SideBar = (props) => {
  const [user, setUser] = useContext(AuthContext);
  const [selectChat, setSelectChat] = useContext(ChatContext);
  const [modal, setModal] = useContext(ModalContext);
  const [load, setLoad] = useContext(ChatLoadContext);
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
          let url = process.env.NEXT_PUBLIC_BACKEND_URL
            ? process.env.NEXT_PUBLIC_BACKEND_URL
            : process.env.BACKEND_URL
            ? process.env.BACKEND_URL
            : "https://defiant-slug-jewelry.cyclic.app/";
          let myRequest = await fetch(`${url}chats/findByUserId/${user?._id}`);
          let res = await myRequest.json();
          if (res.error) {
            throw res;
          }
          setChats(res.chats);
        } catch (error) {
          let tmp = {
            open: true,
            type: "",
            body: "Some error has occured please reload the page",
          };
          setModal({ ...tmp });
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const getChatById = async (id) => {
    setLoad(true);
    try {
      let url = process.env.NEXT_PUBLIC_BACKEND_URL
        ? process.env.NEXT_PUBLIC_BACKEND_URL
        : process.env.BACKEND_URL
        ? process.env.BACKEND_URL
        : "https://defiant-slug-jewelry.cyclic.app/";
      let myRequest = await fetch(`${url}chats/${id}`, {
        method: "GET",
      });
      let res = await myRequest.json();
      setLoad(false);
      if (res.error) {
        throw res;
      }
      setSelectChat({ ...res.chat });
    } catch (error) {
      let tmp = { open: true, type: "", body: "Chat load failed!" };
      setModal({ ...tmp });
    }
  };

  const deleteChat = async (param) => {
    try {
      let url = process.env.NEXT_PUBLIC_BACKEND_URL
        ? process.env.NEXT_PUBLIC_BACKEND_URL
        : process.env.BACKEND_URL
        ? process.env.BACKEND_URL
        : "https://defiant-slug-jewelry.cyclic.app/";
      let myRequest = await fetch(`${url}chats/${param}`, {
        method: "DELETE",
      });
      let res = await myRequest.json();
      if (res.error) {
        throw res;
      }
      setSelectChat(null);
      let tmp = {
        open: true,
        type: "success",
        body: "Chat deleted successfully!",
      };
      setModal({ ...tmp });
      return res;
    } catch (error) {
      let tmp = { open: true, type: "", body: "Chat deletion failed!" };
      setModal({ ...tmp });
    }
  };

  const createChat = async () => {
    try {
      let url = process.env.NEXT_PUBLIC_BACKEND_URL
        ? process.env.NEXT_PUBLIC_BACKEND_URL
        : process.env.BACKEND_URL
        ? process.env.BACKEND_URL
        : "https://defiant-slug-jewelry.cyclic.app/";
      let reqBody = { userId: user?._id };
      let myRequest = await fetch(`${url}chats/`, {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: { "Content-Type": "application/json" },
      });
      let res = await myRequest.json();
      if (res.error) {
        throw res;
      }
      let tmp = chats;
      tmp.push(res.chat);
      setChats([...tmp]);
      setModal({
        open: true,
        type: "success",
        body: "Chat created successfully",
      });
    } catch (error) {
      if (error.message == "Maximum chats limit has reached") {
        let tmp = { open: true, type: "", body: error.message };
        setModal({ ...tmp });
      }
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
        <div className="flex items-center gap-1 text-white text-lg lg:text-2xl font-bold tracking-wider mb-2 uppercase">
          Chats
          <SmartToyRounded />
        </div>
        <Stack
          divider={
            <Divider className="bg-white" orientation="horizontal" flexItem />
          }
          spacing={1}
        >
          {chats?.map((i, index) => {
            return (
              <Item
                key={index}
                id={i._id}
                onclick={(e) => {
                  let chatId = e.target.id;
                  getChatById(chatId);
                }}
                onDelete={(e) => {
                  e.stopPropagation();
                  delRef.current = e.target.parentNode;
                  setOpen(true);
                }}
              >
                {"Chat " + (index + 1)}
              </Item>
            );
          })}
          <Item onclick={createChat} newOpt={true}>
            <div className="flex items-center text-sm lg:text-base">
              New chat
              <Add className="text-sm lg:text-base text-[10px]" />
            </div>
          </Item>
        </Stack>
        <div
          className="mt-auto mb-4 w-full h-10 flex justify-center items-center rounded-lg bg-white shadow-2xl shadow-white px-5 relative hover:bg-slate-100 transition duration-200 ease-in-out hover:scale-105 text-sm lg:text-base"
          onClick={() => {
            handleClick(setProfile);
          }}
        >
          Profile
        </div>
        <div
          className="w-full h-10 flex justify-center items-center rounded-lg bg-white shadow-2xl shadow-white px-5 relative hover:bg-slate-100 transition duration-200 ease-in-out hover:scale-105 text-sm lg:text-base"
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
