"use client";
import { createContext, useState } from "react";

export const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  let state = {
    open: false,
    type: "",
    body: "",
  };
  const [modal, setModal] = useState(state);
  return (
    <ModalContext.Provider value={[modal, setModal]}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
