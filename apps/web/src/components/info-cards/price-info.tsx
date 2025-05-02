import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@mm-app/ui/components/ui/alert";
import { InfoIcon } from "lucide-react";

export default function InfoPriceCard() {
  return (
    <Alert className="">
      <InfoIcon className="size-4" />
      <AlertTitle>Price Information</AlertTitle>
      <AlertDescription>
        The following vegetable prices may or may not be accurate and may change
        at any time.
      </AlertDescription>
    </Alert>
  );
}
