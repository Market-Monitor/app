"use client";

import { setCurrentTD } from "@/lib/current-td";
import { useAppData } from "@/providers/app-provider";
import { TradingCenter } from "@mm-app/internal/api";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@mm-app/ui/components/select";
import { cn } from "@mm-app/ui/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TradingCenterSelectionItem from "./selection-item";

export default function TradingCenterSelections(props: {
  className?: string;
  tradingCenters: TradingCenter[];
}) {
  const router = useRouter();

  const { tradingCenter } = useAppData();

  const [value] = useState(tradingCenter);

  useEffect(() => {
    if (tradingCenter) {
      setCurrentTD(tradingCenter);
    }
  }, [tradingCenter]);

  return (
    <Select
      value={value}
      onValueChange={async (value) => {
        await setCurrentTD(value);

        router.push(`/${value}`);
      }}
    >
      <SelectTrigger className={cn("w-[180px]", props.className)}>
        <SelectValue placeholder="Trading Center" />
      </SelectTrigger>
      <SelectContent>
        {props.tradingCenters.map((item) => (
          <TradingCenterSelectionItem
            isCurrent={value === item.slug}
            key={item._id}
            tradingCenter={item}
          />
        ))}
      </SelectContent>
    </Select>
  );
}
