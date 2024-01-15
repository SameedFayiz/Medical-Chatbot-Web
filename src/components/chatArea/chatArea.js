import { useContext, useEffect, useState } from "react";
import MessageBox from "../messageBox/messageBox";
import { ChatContext } from "@/utils/chatContext";
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import { ModalContext } from "@/utils/modalContext";

const ChatArea = (props) => {
  const [selectChat, setSelectChat] = useContext(ChatContext);
  const [modal, setModal] = useContext(ModalContext);
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

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
      let reqBody = { chatId: selectChat._id, message: prompt };
      let myRequest = await fetch("http://localhost:3001/chats/sendMessage", {
        body: JSON.stringify(reqBody),
        method: "POST",
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
      <div className="flex flex-col flex-auto gap-4 overflow-y-scroll p-10">
        {messages?.map((i, index) => {
          return (
            <MessageBox key={index} username={i.from} message={i.message} />
          );
        })}
      </div>
      <div className="w-full mt-auto bg-white py-5 px-4 lg:px-10">
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
