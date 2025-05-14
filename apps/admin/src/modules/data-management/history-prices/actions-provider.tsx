"use client";

import { VeggiePrice } from "@mm-app/internal/api";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import HistoryEdit from "./history-edit";

type Action =
  | {
      type: "edit";
      veggiePrice: VeggiePrice;
      isOpen: true;
    }
  | {
      isOpen: false;
    };

const context = createContext<{
  action: Action;
  setAction: Dispatch<SetStateAction<Action>>;
  handleCloseAction: (value: boolean) => void;

  allHistoryPrices: {
    tradingCenter: string;
    data: VeggiePrice[];
  }[];
}>({
  action: {
    isOpen: false,
  },
  setAction: () => {},
  handleCloseAction: () => {},

  allHistoryPrices: [],
});

export default function HistoryActionsProvider(props: {
  children: ReactNode;
  allHistoryPrices: {
    tradingCenter: string;
    data: VeggiePrice[];
  }[];
}) {
  const [action, setAction] = useState<Action>({
    isOpen: false,
  });

  const handleCloseAction = (value: boolean) => {
    if (value === true) return;

    setAction({
      isOpen: false,
    });
  };

  return (
    <context.Provider
      value={{
        action,
        setAction,
        handleCloseAction,
        allHistoryPrices: props.allHistoryPrices,
      }}
    >
      {props.children}

      <HistoryEdit />
    </context.Provider>
  );
}

export const useHistoryDataActions = () => {
  const ctx = useContext(context);
  if (!ctx) {
    throw new Error(
      "useVeggieActions must be used within VeggieActionsProvider",
    );
  }

  return ctx;
};
