"use client";

import { Button } from "@mm-app/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@mm-app/ui/components/dialog";
import { useState } from "react";
import AssetsUploader from "./uploader";

export default function AssetsUploaderDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Upload Assets</Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Upload Assets</DialogTitle>

          <DialogDescription>
            Images can only be uploaded currently, special images like{" "}
            <code>.heic</code> is not supported. <br />
            Provide source if image is a re-upload from a different source.
          </DialogDescription>
        </DialogHeader>

        <div>
          <AssetsUploader className="w-full" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
