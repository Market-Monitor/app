"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@mm-app/ui/components/select";
import { useAppStats } from "./stats-provider";

export default function StatsTradeCenterSelection() {
  const { appStats, selection, setSelection } = useAppStats();

  return (
    <div>
      <Select value={selection} onValueChange={setSelection}>
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="Select trading center..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {appStats.tradingCenters.map((tradingCenter) => (
            <SelectItem key={tradingCenter.slug} value={tradingCenter.slug}>
              {tradingCenter.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
