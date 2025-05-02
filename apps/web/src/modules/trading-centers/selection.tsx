"use client";

import { TradingCenter } from "@mm-app/internal/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@mm-app/ui/components/select";
import { cn } from "@mm-app/ui/lib/utils";
import { useState } from "react";

export default function TradingCenterSelections(props: {
  className?: string;
  tradingCenters: TradingCenter[];
}) {
  const [value, setValue] = useState("baptc");

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className={cn("w-[180px]", props.className)}>
        <SelectValue placeholder="Trading Center" />
      </SelectTrigger>
      <SelectContent>
        {props.tradingCenters.map((item) => (
          <SelectItem key={item._id} value={item.slug}>
            {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
