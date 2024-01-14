"use client";
import { Add, Delete } from "@mui/icons-material";
import { Divider, Stack } from "@mui/material";
import { useContext, useState } from "react";
import SettingsModal from "../modals/settingsModal";
import ProfileModal from "../modals/profileModal";
import { useEffect } from "react";
import { AuthContext } from "@/utils/authContext";

const Item = (props) => {
  return (
    <div
      onClick={props.onclick}
      className="bg-white w-full h-10 flex justify-center items-center rounded-lg shadow-2xl shadow-black px-5 relative"
    >
      <div className="flex items-center justify-center">{props.children}</div>
      {props.newOpt ? null : (
        <Delete
          onClick={props.onDelete}
          className="absolute right-5 text-lg hover:text-rose-600 transition duration-200"
        />
      )}
    </div>
  );
};

const SideBar = (props) => {
  const [user, setUser] = useContext(AuthContext);
  const [chats, setChats] = useState([1, 2]);
  const [profile, setProfile] = useState(false);
  const [settings, setSettings] = useState(false);

  useEffect(() => {
    (async () => {
      let myRequest = await fetch(
        `http://localhost:3001/chats/findByUserId/${user._id}`
      );
      let res = await myRequest.json();
      setChats(res.chats);
      console.log(res);
    })();
  }, []);

  const handleClick = (func) => {
    func(true);
  };

  return (
    <>
      <ProfileModal state={[profile, setProfile]} />
      <SettingsModal state={[settings, setSettings]} />
      <div className="w-full h-full flex flex-col px-2">
        <div className="text-2xl font-bold tracking-wider mb-2">Chats</div>
        <Stack
          divider={<Divider orientation="horizontal" flexItem />}
          spacing={1}
        >
          {chats.map((i, index) => {
            return (
              <Item
                key={i}
                onclick={(e) => {
                  console.log(e.target.key);
                }}
                onDelete={(e) => {
                  console.log(e.target.key);
                }}
              >
                {"Chat " + (index + 1)}
              </Item>
            );
          })}
          <Item
            onclick={(e, i) => {
              console.log(e, i);
            }}
            newOpt={true}
          >
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
