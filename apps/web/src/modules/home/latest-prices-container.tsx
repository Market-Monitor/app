"use client";

import { useAppData } from "@/providers/app-provider";
import { Button } from "@mm-app/ui/components/button";
import { cn } from "@mm-app/ui/lib/utils";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { ReactNode, useState } from "react";

export default function LatestPricesContainer(props: { children: ReactNode }) {
  const { tradingCenter } = useAppData();

  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="space-y-12">
      <div className="relative">
        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden transition-all duration-500 ease-in-out",
            {
              "max-h-[500px]": !isExpanded,
              "lg:grid-cols-1 w-5/6 mx-auto": tradingCenter !== "baptc",
            },
          )}
        >
          {props.children}
        </div>

        {isExpanded ? null : (
          <div className="absolute -bottom-2 left-0 right-0 h-20 bg-gradient-to-t from-secondary to-transparent pointer-events-none rounded-xl" />
        )}
      </div>

      <Button
        variant={"ghost"}
        onClick={toggleExpand}
        className="w-full text-center space-x-2 inline-flex items-center text-muted-foreground"
      >
        {isExpanded ? (
          <>
            <ChevronUpIcon className="h-4 w-4" />

            <span>Show less</span>
          </>
        ) : (
          <>
            <ChevronDownIcon className="h-4 w-4" />

            <span>Show more</span>
          </>
        )}
      </Button>
    </div>
  );
}
