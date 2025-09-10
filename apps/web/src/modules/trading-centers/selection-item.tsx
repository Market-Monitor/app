"use client";

import { TradingCenter } from "@mm-app/internal/api";
import { SelectItem } from "@mm-app/ui/components/select";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TradingCenterSelectionItem(props: {
  tradingCenter: TradingCenter;
  isCurrent: boolean;
}) {
  const router = useRouter();

  useEffect(() => {
    if (!props.isCurrent) {
      console.log("Prefetching", props.tradingCenter.slug);
      router.prefetch(`/${props.tradingCenter.slug}`);
    }
  }, [router, props]);

  return (
    <SelectItem value={props.tradingCenter.slug}>
      {props.tradingCenter.name}
    </SelectItem>
  );
}
