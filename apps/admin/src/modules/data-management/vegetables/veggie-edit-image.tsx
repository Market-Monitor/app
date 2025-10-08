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
import { ScrollArea } from "@mm-app/ui/components/scroll-area";
import { cn } from "@mm-app/ui/lib/utils";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useVeggieActions } from "./actions-provider";

export default function VeggieEditImage(props: {
  handleSelection: (imageUrl: string, imageSource: string) => void;
}) {
  const { assets } = useVeggieActions();

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelected = () => {
    if (!selected) return;

    const sel = assets.find((item) => item._id === selected);

    if (!sel) return;

    props.handleSelection(sel.image, sel.source);

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="">
          <ImageIcon />
          Select Image
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Select Image</DialogTitle>
          <DialogDescription>
            Select the available assets for the vegetable{`'`}s image. You can
            upload new images from the assets data management page.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[500px]">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 ">
            {assets
              .sort(
                (a, b) =>
                  new Date(b.uploadedDate).getTime() -
                  new Date(a.uploadedDate).getTime(),
              )
              .map((item) => (
                <div
                  onClick={() => {
                    if (selected === item._id) {
                      setSelected(null);
                    } else {
                      setSelected(item._id);
                    }
                  }}
                  key={item._id}
                  className={cn(
                    "relative h-[100px] cursor-pointer border-2 border-transparent rounded-lg group",
                    {
                      "border-primary": selected === item._id,
                    },
                  )}
                >
                  <Image
                    src={item.image}
                    alt={item.image}
                    fill
                    priority
                    sizes="60vw (max-width: 768px) 50vw, 33vw, (max-width: 1024px) 50vw, 25vw, (max-width: 1280px) 50vw, 20vw"
                    className="object-cover rounded-lg brightness-90 group-hover:brightness-100 group-focus-within:brightness-100 duration-300"
                  />
                </div>
              ))}
          </div>
        </ScrollArea>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>

          <Button disabled={!selected} onClick={handleSelected}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
