"use client";
import { createContext, useState } from "react";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectChat, setSelectChat] = useState(null);

  return (
    <ChatContext.Provider value={[selectChat, setSelectChat]}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
