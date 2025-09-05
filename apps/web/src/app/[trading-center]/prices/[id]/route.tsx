import { veggiesAPI } from "@/lib/veggies-api/client";
import { redirect } from "next/navigation";

export const GET = async (
  req: Request,
  { params }: RouteContext<"/[trading-center]/prices/[id]">,
) => {
  const pars = await params;
  const id = pars.id;
  const tradingCenter = pars["trading-center"];

  const data = await veggiesAPI.getVeggie(tradingCenter, {
    veggieId: id,
  });

  if (!data.success) {
    redirect(`/error`);
  }

  const firstItem = data.data.classes[0]!;

  redirect(`/${tradingCenter}/prices/${id}/${firstItem.id}`);
};
