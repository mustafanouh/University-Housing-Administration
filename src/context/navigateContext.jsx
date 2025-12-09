import { createContext, useContext } from "react";

export const NavigateContext = createContext();

export const useNavigateContext = () => {
  const context = useContext(NavigateContext);
  if (!context) {
    throw new Error("useNavigateContext must be used within NavigateContext.Provider");
  }
  return context;
};