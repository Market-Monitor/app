"use client";

import { TooltipProvider } from "@mm-app/ui/components/tooltip";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <TooltipProvider skipDelayDuration={0} delayDuration={0}>
        {children}
      </TooltipProvider>
    </NextThemesProvider>
  );
}
