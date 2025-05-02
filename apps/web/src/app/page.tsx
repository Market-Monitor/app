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

  return redirect(`/${tradingCenters.data[0]?.slug}`);
}
