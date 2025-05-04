"use client";

import { createContext, ReactNode, useContext } from "react";

interface AppData {
  tradingCenter: string;
}

const context = createContext<AppData>({
  tradingCenter: "",
});

export const AppProvider = (props: {
  children: ReactNode;
  tradingCenter: string;
}) => {
  return (
    <context.Provider value={{ tradingCenter: props.tradingCenter }}>
      {props.children}
    </context.Provider>
  );
};

export const useAppData = () => {
  const ctx = useContext(context);
  if (!ctx) {
    throw new Error("useAppData must be used within a <AppProvider />");
  }

  return ctx;
};
