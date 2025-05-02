"use client";

import { VeggieClass } from "@mm-app/internal/api";
import { createContext, ReactNode, useContext } from "react";

export type SearchData =
  | {
      success: false;
      error: {
        status: number;
        statusText: string;
      };
    }
  | {
      success: true;
      data: VeggieClass[];
    };

const context = createContext<{
  data: SearchData;
}>({
  data: {} as never,
});

export default function SearchBarDataProvider(props: {
  data: SearchData;
  children: ReactNode;
}) {
  return (
    <context.Provider value={{ data: props.data }}>
      {props.children}
    </context.Provider>
  );
}

export const useSearchData = () => {
  const ctx = useContext(context);
  if (!ctx) {
    throw new Error(
      "useSearchData must be used within a <SearchBarDataProvider /",
    );
  }

  return ctx;
};
