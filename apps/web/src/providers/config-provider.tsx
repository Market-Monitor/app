import { Config } from "@mm-app/internal/api";
import { createContext, ReactNode } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ConfigContext extends Config {}

const context = createContext<ConfigContext>({
  latestDataDate: "",
  configId: 0,
});

export const ConfigProvider = (props: {
  children: ReactNode;
  apiConfig: Config;
}) => {
  return (
    <context.Provider value={{ ...props.apiConfig }}>
      {props.children}
    </context.Provider>
  );
};
