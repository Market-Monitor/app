"use client";

import { AssetDoc } from "@/types/dt";
import { Veggie } from "@mm-app/internal/api";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import VeggieEdit from "./veggie-edit";

type Action =
  | {
      type: "edit";
      veggie: Veggie;
      isOpen: true;
    }
  | {
      isOpen: false;
    };

const context = createContext<{
  action: Action;
  setAction: Dispatch<SetStateAction<Action>>;
  handleCloseAction: (value: boolean) => void;

  allVeggies: {
    tradingCenter: string;
    data: Veggie[];
  }[];
  assets: AssetDoc[];
}>({
  action: {
    isOpen: false,
  },
  setAction: () => {},
  handleCloseAction: () => {},

  allVeggies: [],
  assets: [],
});

export default function VeggieActionsProvider(props: {
  children: ReactNode;
  allVeggies: {
    tradingCenter: string;
    data: Veggie[];
  }[];
  assets: AssetDoc[];
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
        allVeggies: props.allVeggies,
        assets: props.assets,
      }}
    >
      {props.children}

      <VeggieEdit />
    </context.Provider>
  );
}

export const useVeggieActions = () => {
  const ctx = useContext(context);
  if (!ctx) {
    throw new Error(
      "useVeggieActions must be used within VeggieActionsProvider",
    );
  }

  return ctx;
};
