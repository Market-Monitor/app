"use client";

import { TradingCenterDoc } from "@/types/dt";
import { TradingCenter } from "@mm-app/internal/api";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import TradingCentersEditItem from "./td-edit";

type Action =
  | {
      type: "edit";
      tradingCenter: TradingCenterDoc;
      isOpen: true;
    }
  | {
      isOpen: false;
    };

const context = createContext<{
  action: Action;
  setAction: Dispatch<SetStateAction<Action>>;
  handleCloseAction: (value: boolean) => void;

  allTradingCenters: TradingCenter[];
}>({
  action: {
    isOpen: false,
  },
  setAction: () => {},
  handleCloseAction: () => {},

  allTradingCenters: [],
});

export default function TradingCentersActionsProvider(props: {
  children: ReactNode;
  allTradingCenters: TradingCenterDoc[];
}) {
  const [action, setAction] = useState<Action>({
    isOpen: false,
  });

  const handleCloseAction = (value: boolean) => {
    if (value === true) return;

    setAction({ isOpen: false });
  };

  return (
    <context.Provider
      value={{
        action,
        setAction,
        handleCloseAction,

        allTradingCenters: props.allTradingCenters,
      }}
    >
      {props.children}

      <TradingCentersEditItem />
    </context.Provider>
  );
}

export const useTradingCentersActions = () => {
  const ctx = useContext(context);
  if (!ctx)
    throw new Error(
      "useTradingCentersActions must be used within a TradingCentersActionsProvider",
    );
  return ctx;
};
