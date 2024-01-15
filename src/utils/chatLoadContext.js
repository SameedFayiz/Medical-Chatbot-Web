"use client";
import { createContext, useState } from "react";

export const ChatLoadContext = createContext();

const ChatLoadProvider = ({ children }) => {
  const [load, setLoad] = useState(false);

  return (
    <ChatLoadContext.Provider value={[load, setLoad]}>
      {children}
    </ChatLoadContext.Provider>
  );
};

export default ChatLoadProvider;
