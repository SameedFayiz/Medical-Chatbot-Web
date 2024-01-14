"use client";
import { createContext, useState } from "react";

export const ErrorContext = createContext();

const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(false);
  return (
    <ErrorContext.Provider value={[error, setError]}>
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorProvider;
