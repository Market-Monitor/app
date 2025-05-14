"use client";

import { VeggieClass } from "@mm-app/internal/api";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

// TODO: Re-think on how to implement edit / delete actions

type Action =
  | {
      type: "edit";
      veggie: VeggieClass;
      isOpen: true;
    }
  | {
      type: "delete";
      veggie: VeggieClass;
      isOpen: true;
    }
  | {
      isOpen: false;
    };

const context = createContext<{
  action: Action;
  setAction: Dispatch<SetStateAction<Action>>;
  handleCloseAction: (value: boolean) => void;

  allVeggieCategories: {
    tradingCenter: string;
    data: VeggieClass[];
  }[];
}>({
  action: {
    isOpen: false,
  },
  setAction: () => {},
  handleCloseAction: () => {},

  allVeggieCategories: [],
});

export default function VeggieCategoriesActionsProvider(props: {
  children: ReactNode;
  allVeggieCategories: {
    tradingCenter: string;
    data: VeggieClass[];
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
        allVeggieCategories: props.allVeggieCategories,
      }}
    >
      {props.children}

      {/* <VeggieCategoryEdit /> */}

      {/* <VeggieCategoryDelete /> */}
    </context.Provider>
  );
}

export const useVeggieCategoryActions = () => {
  const ctx = useContext(context);
  if (!ctx) {
    throw new Error(
      "useVeggieActions must be used within VeggieActionsProvider",
    );
  }

  return ctx;
};
