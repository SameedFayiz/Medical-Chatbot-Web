import { useContext, useEffect, useState } from "react";
import MessageBox from "../messageBox/messageBox";
import { ChatContext } from "@/utils/chatContext";

const ChatArea = (props) => {
  const [selectChat, setSelectChat] = useContext(ChatContext);
  const [messages, setMessages] = useState();

  useEffect(() => {
    if (selectChat) {
      let userMessages = selectChat.userMessages;
      let botMessages = selectChat.botMessages;
      let tmp = userMessages.concat(botMessages);
      tmp.sort((t1, t2) => {
        return t1 - t2;
      });
      if (!messages) {
        console.log("hey");
        setMessages([...tmp]);
      }
      console.log(messages);
    }
  }, [messages, selectChat]);
  return (
    <div className="w-full h-full flex flex-col bg-fuchsia-200">
      <div className="w-full h-10 flex items-center text-3xl font-bold tracking-wider bg-slate-400 ps-10">
        ChatBot
      </div>
      <div className="flex flex-col grow gap-10 overflow-y-scroll bg-slate-500 p-10">
        {messages?.map((i, index) => {
          return (
            <MessageBox key={index} username={i.from} message={i.message} />
          );
        })}
      </div>
    </div>
  );
};

export default ChatArea;
