"use client";

import { TradingCenter } from "@/types/dt";
import { WithId } from "mongodb";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type DataManagementContext = {
  tradingCenter: string;
  setTradingCenter: Dispatch<SetStateAction<string>>;
  tradingCenters: WithId<TradingCenter>[];
};

const dataManagementContext = createContext<DataManagementContext>({
  tradingCenter: "",
  setTradingCenter: () => {},
  tradingCenters: [],
});

export default function DataManagementProvider(props: {
  children: ReactNode;
  tradingCenters: WithId<TradingCenter>[];
}) {
  const [tradingCenter, setTradingCenter] = useState<string>(
    props.tradingCenters[0]?.slug ?? "",
  );

  return (
    <dataManagementContext.Provider
      value={{
        tradingCenter,
        setTradingCenter,
        tradingCenters: props.tradingCenters,
      }}
    >
      {props.children}
    </dataManagementContext.Provider>
  );
}

export const useDataManagement = () => {
  const ctx = useContext(dataManagementContext);
  if (!ctx) {
    throw new Error(
      "useDataManagement must be used within DataManagementProvider",
    );
  }
  return ctx;
};
