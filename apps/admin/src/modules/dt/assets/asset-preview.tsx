import { Asset } from "@/types/dt";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@mm-app/ui/components/dialog";
import { WithId } from "mongodb";
import Image from "next/image";
import AssetDelete from "./asset-delete";

export default function AssetPreview(props: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  asset: WithId<Asset> | null;
}) {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Asset Preview</DialogTitle>
          <DialogDescription>
            From: <code>{props.asset?.source ?? "[None specified]"}</code>
          </DialogDescription>
        </DialogHeader>

        {props.asset ? (
          <div className="space-y-2">
            <div className="relative h-[600px]">
              <Image
                src={props.asset.image}
                alt={props.asset.image}
                fill
                sizes="80vw"
                className="w-full rounded-lg object-cover"
              />
            </div>

            <div className="flex items-center justify-between">
              <a
                href={props.asset.image}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-muted-foreground text-xs"
              >
                View Full Image
              </a>

              <AssetDelete />
            </div>
          </div>
        ) : (
          <></>
        )}
      </DialogContent>
    </Dialog>
  );
}
