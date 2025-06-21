"use client";

import { updateVegetable } from "@/lib/server-actions/dt/vegetable";
import { isStringEmpty } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Veggie } from "@mm-app/internal/api";
import { Button } from "@mm-app/ui/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@mm-app/ui/components/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@mm-app/ui/components/form";
import { Input } from "@mm-app/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@mm-app/ui/components/select";
import Image from "next/image";
import { startTransition, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useDataManagement } from "../dt-provider";
import { useVeggieActions } from "./actions-provider";
import VeggieEditImage from "./veggie-edit-image";

const editFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  priceUnit: z.string(),
  imageUrl: z.string(),
  imageSource: z.string(),
});

type EditForm = z.infer<typeof editFormSchema>;

export default function VeggieEdit() {
  const { tradingCenter } = useDataManagement();

  const [isSet, setIsSet] = useState(false);
  const [isProcessing, setTransition] = useTransition();

  const { action, handleCloseAction } = useVeggieActions();

  const form = useForm<EditForm>({
    resolver: zodResolver(editFormSchema),
    defaultValues: action.isOpen
      ? {
          id: action.veggie.id,
          name: action.veggie.name,
          imageUrl: action.veggie.imageUrl,
          imageSource: action.veggie.imageSource,
          priceUnit: action.veggie.priceUnit ?? "",
        }
      : {
          id: "",
          name: "",
          imageUrl: "",
          imageSource: "",
          priceUnit: "",
        },
  });

  const handleSubmit = (data: EditForm) => {
    if (!action.isOpen) return;

    if (isStringEmpty(data.name)) {
      toast.error("Name cannot be empty");
      return;
    }

    const update: Partial<Veggie> = {
      _id: action.veggie._id,
      name: data.name,
      priceUnit: data.priceUnit,
      imageUrl: data.imageUrl,
      imageSource: data.imageSource,
    };

    const process = toast.loading("Updating...");

    setTransition(async () => {
      const res = await updateVegetable(update, tradingCenter);
      if (!res?.success) {
        toast.error("Failed to update", { id: process });
        return;
      }

      startTransition(() => {
        toast.success("Updated", { id: process });

        // Close edit dialog
        handleCloseAction(false);
      });
    });
  };

  const formImageUrl = form.watch("imageUrl");

  useEffect(() => {
    if (isSet) return;

    if (action.isOpen) {
      form.reset({
        id: action.veggie.id,
        name: action.veggie.name,
        priceUnit: action.veggie.priceUnit,
        imageUrl: action.veggie.imageUrl,
        imageSource: action.veggie.imageSource,
      });

      setIsSet(true);
    }
  }, [action, form, isSet]);

  useEffect(() => {
    if (!action.isOpen) {
      setIsSet(false);
    }
  }, [action.isOpen]);

  return (
    <Dialog
      open={action.isOpen && action.type === "edit"}
      onOpenChange={(value) => !isProcessing && handleCloseAction(value)}
    >
      <DialogContent
        onInteractOutside={(e) => isProcessing && e.preventDefault()}
        className="max-w-xl"
      >
        <DialogHeader>
          <DialogTitle>Edit Vegetable</DialogTitle>
          <DialogDescription>
            If you edit the name, please edit also in the vegetable categories
            and history prices to reflect the changes.
          </DialogDescription>
        </DialogHeader>

        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>ID</FormLabel>

                    <FormControl>
                      <Input readOnly {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Name</FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priceUnit"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Price Unit</FormLabel>

                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select price unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="kilo">Kilo</SelectItem>
                        <SelectItem value="bag">Bag</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Image URL</FormLabel>

                    <div className="flex items-center min-h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 read-only:opacity-50 md:text-sm break-all">
                      {(field.value?.length ?? 0) > 0
                        ? field.value
                        : "Select image..."}
                    </div>

                    <div className="space-y-1 flex flex-col w-full">
                      <div className="relative h-[150px]">
                        {(formImageUrl?.length ?? 0) > 0 ? (
                          <Image
                            src={formImageUrl}
                            alt={formImageUrl}
                            sizes="34rem"
                            fill
                            priority
                            className="rounded-lg object-cover"
                          />
                        ) : (
                          <div className="absolute rounded-lg border h-full w-full"></div>
                        )}
                      </div>

                      <VeggieEditImage
                        handleSelection={(imgValue, imgSource) => {
                          form.setValue("imageUrl", imgValue);
                          form.setValue("imageSource", imgSource);
                        }}
                      />
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex items-center space-x-2">
                <DialogClose disabled={isProcessing} asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>

                <Button disabled={isProcessing} type="submit">
                  {isProcessing ? "Updating..." : "Update"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
