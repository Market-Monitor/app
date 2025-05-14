"use client";

import { AppStats } from "@/types/dt";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type StatsContextProps = {
  appStats: AppStats;

  selection: string;
  setSelection: Dispatch<SetStateAction<string>>;
};

const statsContext = createContext<StatsContextProps>({
  appStats: {
    assets: 0,
    tradingCenters: [],
  },
  selection: "",
  setSelection: () => {},
});

export default function AppStatsProvider(props: {
  children: ReactNode;
  appStats: AppStats;
}) {
  const [selection, setSelection] = useState<string>("all");

  return (
    <statsContext.Provider
      value={{
        appStats: props.appStats,
        selection,
        setSelection,
      }}
    >
      {props.children}
    </statsContext.Provider>
  );
}

export const useAppStats = () => {
  const context = useContext(statsContext);
  if (context === undefined) {
    throw new Error("useAppStats must be used within a AppStatsProvider");
  }
  return context;
};
