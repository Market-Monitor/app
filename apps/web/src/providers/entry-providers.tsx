"use client";

import { ThemeProvider } from "@mm-app/ui/components/theme-provider";
import { TooltipProvider } from "@mm-app/ui/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Fragment, ReactNode } from "react";

const queryClient = new QueryClient();

export default function EntryProviders(props: { children: ReactNode }) {
  return (
    <Fragment>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <QueryClientProvider client={queryClient}>
          <TooltipProvider delayDuration={0} skipDelayDuration={0}>
            {props.children}
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </Fragment>
  );
}
