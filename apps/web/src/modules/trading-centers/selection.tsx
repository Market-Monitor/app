"use client";

import { useAppData } from "@/providers/app-provider";
import { TradingCenter } from "@mm-app/internal/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@mm-app/ui/components/select";
import { cn } from "@mm-app/ui/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TradingCenterSelections(props: {
  className?: string;
  tradingCenters: TradingCenter[];
}) {
  const router = useRouter();

  const { tradingCenter } = useAppData();

  const [value] = useState(tradingCenter);

  return (
    <Select
      value={value}
      onValueChange={(value) => {
        router.push(`/${value}`);
      }}
    >
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
