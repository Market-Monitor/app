"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@mm-app/ui/components/select";
import { useDataManagement } from "./dt-provider";

export default function TradingCenterSelection() {
  const { tradingCenter, setTradingCenter, tradingCenters } =
    useDataManagement();

  return (
    <div>
      <Select onValueChange={setTradingCenter} value={tradingCenter}>
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="Select Trading Center..." />
        </SelectTrigger>
        <SelectContent>
          {tradingCenters.map((item) => (
            <SelectItem key={item._id.toString()} value={item.slug}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
