import { TradingCenterDoc } from "@/types/dt";
import { Button } from "@mm-app/ui/components/button";
import { useTradingCentersActions } from "./context";

export default function TradingCenterTableActions(props: {
  item: TradingCenterDoc;
}) {
  const { setAction } = useTradingCentersActions();

  const handleEditOpen = () => {
    setAction({
      type: "edit",
      tradingCenter: props.item,
      isOpen: true,
    });
  };

  return (
    <div className="inline-flex items-center gap-2">
      <Button className="h-[auto] py-1" onClick={handleEditOpen}>
        Edit
      </Button>
    </div>
  );
}
