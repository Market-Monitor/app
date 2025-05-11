import { removeFilesFromS3 } from "@/lib/s3/actions";
import { Button } from "@mm-app/ui/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@mm-app/ui/components/dialog";
import { useActionState, useState } from "react";

// TODO: to be implemented

export default function AssetDelete() {
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isProcessing, setIsProcessing] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, action, isPending] = useActionState(removeFilesFromS3, null);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(value) => {
        if (isProcessing) return;

        setIsOpen(value);
      }}
    >
      <DialogTrigger asChild>
        <Button variant={"destructive"}>Delete</Button>
      </DialogTrigger>

      <DialogContent
        onInteractOutside={(e) => isProcessing && e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Delete Asset</DialogTitle>
          <DialogDescription>
            Removing assets will remove it entirely from all of the documents
            that use it. Are you sure you want to delete this asset?
          </DialogDescription>
        </DialogHeader>

        <div>
          {error && "success" in Object.keys(error) ? (
            <p className="text-destructive text-sm">
              There was a problem removing the asset. Please try again later.
            </p>
          ) : (
            <></>
          )}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"}>Cancel</Button>
          </DialogClose>

          <Button variant={"destructive"}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
