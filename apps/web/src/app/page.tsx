import { getCurrentTD } from "@/lib/current-td";
import { veggiesAPI } from "@/lib/veggies-api/client";
import { Button } from "@mm-app/ui/components/button";
import { redirect } from "next/navigation";

export default async function Page() {
  const tradingCenters = await veggiesAPI.getTradingCenters();

  if (!tradingCenters.success) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Button variant="destructive" className="w-1/2">
          Error fetching trading centers
        </Button>
      </div>
    );
  }

  const currentTd = await getCurrentTD();
  if (currentTd && tradingCenters.data.some((td) => td.slug === currentTd)) {
    // If the current trading center is valid, redirect to it
    return redirect(`/${currentTd}`);
  }

  return redirect(`/${tradingCenters.data[0]?.slug}`);
}
