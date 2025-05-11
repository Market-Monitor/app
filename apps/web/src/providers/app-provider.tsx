"use client";

import { TradingCenter } from "@mm-app/internal/api";
import { createContext, ReactNode, useContext } from "react";

interface AppData {
  tradingCenter: string;
  tradingCenterData: TradingCenter;
}

const context = createContext<AppData>({
  tradingCenter: "",
  tradingCenterData: {
    _id: "",
    name: "",
    longName: "",
    slug: "",
  },
});

export const AppProvider = (props: {
  children: ReactNode;
  tradingCenter: string;
  tradingCenterData: TradingCenter;
}) => {
  return (
    <context.Provider
      value={{
        tradingCenter: props.tradingCenter,
        tradingCenterData: props.tradingCenterData,
      }}
    >
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
