"use client";

import { Feedback } from "@/lib/feedbacks/query";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type Action =
  | {
      type: "edit";
      feedback: Feedback;
      isOpen: true;
    }
  | {
      isOpen: false;
    };

const context = createContext<{
  action: Action;
  setAction: Dispatch<SetStateAction<Action>>;
  handleCloseAction: (value: boolean) => void;

  allFeedbacks: Feedback[];
}>({
  action: {
    isOpen: false,
  },
  setAction: () => {},
  handleCloseAction: () => {},

  allFeedbacks: [],
});

export default function FeedbackActionsProvider(props: {
  children: ReactNode;
  allFeedbacks: Feedback[];
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
        allFeedbacks: props.allFeedbacks,
      }}
    >
      {props.children}
    </context.Provider>
  );
}

export const useFeedbackActions = () => {
  const ctx = useContext(context);
  if (!ctx) {
    throw new Error(
      "useFeedbackActions must be used within FeedbackActionsProvider",
    );
  }

  return ctx;
};
