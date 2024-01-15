import { useContext, useEffect, useState } from "react";
import MessageBox from "../messageBox/messageBox";
import { ChatContext } from "@/utils/chatContext";
import { ModalContext } from "@/utils/modalContext";
import { ChatLoadContext } from "@/utils/chatLoadContext";
import Image from "next/image";
import {
  Checkbox,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Send } from "@mui/icons-material";

const ChatArea = (props) => {
  const [selectChat, setSelectChat] = useContext(ChatContext);
  const [modal, setModal] = useContext(ModalContext);
  const [load, setLoad] = useContext(ChatLoadContext);

  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [staticRes, setStaticRes] = useState(false);

  useEffect(() => {
    if (selectChat) {
      let userMessages = selectChat.userMessages;
      let botMessages = selectChat.botMessages;
      let tmp = userMessages.concat(botMessages);
      tmp = Array.from(tmp).sort((a, b) => {
        let t1 = new Date(a.createdAt).getTime();
        let t2 = new Date(b.createdAt).getTime();
        return t1 - t2;
      });
      setMessages([...tmp]);
    } else {
      setMessages(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectChat]);

  const sendMessage = async () => {
    setLoading(true);
    setPrompt("waiting for response...");

    try {
      let reqBody = {
        chatId: selectChat._id,
        message: prompt,
        staticRes: staticRes ? true : null,
      };
      let url = process.env.NEXT_PUBLIC_BACKEND_URL
        ? process.env.NEXT_PUBLIC_BACKEND_URL
        : process.env.BACKEND_URL
        ? process.env.BACKEND_URL
        : "https://defiant-slug-jewelry.cyclic.app/";
      let myRequest = await fetch(`${url}chats/sendMessage`, {
        body: JSON.stringify(reqBody),
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
      });
      let res = await myRequest.json();
      if (res.error) {
        throw res;
      }
      setSelectChat({ ...res.chat });
    } catch (error) {
      let tmp = {
        open: true,
        type: "",
        body: "Failed to get response, Due to some error!",
      };
      setModal({ ...tmp });
    }
    setPrompt("");
    setLoading(false);
  };

  return (
    <div className="w-full h-[575px] max-h-full flex flex-col border-2 border-slate-600 rounded-md overflow-hidden bg-slate-100">
      <div className="flex flex-col flex-auto gap-4 overflow-y-scroll p-10 relative">
        {load ? (
          <CircularProgress className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]" />
        ) : null}
        {!selectChat ? (
          <div className="flex flex-col justify-center items-center absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] font-semibold text-slate-500">
            <Image
              className="rounded-full mb-2"
              src={"/sleepImg.jpg"}
              alt="Bot sleeping"
              width={150}
              height={150}
            />
            No chat selected
          </div>
        ) : null}
        {messages?.map((i, index) => {
          return (
            <MessageBox key={index} username={i.from} message={i.message} />
          );
        })}
      </div>
      <div className="w-full flex gap-4 mt-auto bg-white py-5 px-4 lg:px-10">
        <div className="flex gap-1 justify-center items-center text-sm">
          <p className="text-slate-600 font-medium">Static</p>
          <Checkbox
            className="p-0"
            checked={staticRes}
            onChange={() => {
              setStaticRes(!staticRes);
            }}
          />
        </div>
        <TextField
          value={prompt}
          className="w-full"
          id="standard-multiline-flexible"
          placeholder="Type a message"
          maxRows={3}
          multiline
          variant="outlined"
          disabled={loading || !selectChat}
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {loading ? (
                  <CircularProgress />
                ) : (
                  <IconButton
                    disabled={prompt == "" || !selectChat}
                    aria-label="send message"
                    edge="end"
                    onClick={sendMessage}
                  >
                    <Send></Send>
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default ChatArea;
