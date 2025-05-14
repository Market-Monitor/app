"use client";

import { updateVeggieHistoryPrice } from "@/lib/server-actions/dt/history-price";
import { zodResolver } from "@hookform/resolvers/zod";
import { VeggiePrice } from "@mm-app/internal/api";
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
} from "@mm-app/ui/components/form";
import { Input } from "@mm-app/ui/components/input";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useDataManagement } from "../dt-provider";
import { useHistoryDataActions } from "./actions-provider";

const editFormSchema = z.object({
  id: z.string(),
  parentName: z.string(),
  name: z.string(),
  prices: z.string(),
  date: z.string(),
  parentId: z.string(),
});

type EditForm = z.infer<typeof editFormSchema>;

export default function HistoryEdit() {
  const { tradingCenter } = useDataManagement();
  const { action, handleCloseAction } = useHistoryDataActions();

  const [isSet, setIsSet] = useState(false);
  const [isProcessing, setTransition] = useTransition();

  const form = useForm<EditForm>({
    resolver: zodResolver(editFormSchema),
    defaultValues: action.isOpen
      ? {
          id: action.veggiePrice.id,
          name: action.veggiePrice.name,
          parentName: action.veggiePrice.parentName,
          prices: action.veggiePrice.price.toString(),
          parentId: action.veggiePrice.parentId,
          date: new Date(action.veggiePrice.dateUnix).toISOString(),
        }
      : {
          id: "",
          name: "",
          parentName: "",
          prices: "",
          date: "",
          parentId: "",
        },
  });

  const handleSubmit = async (data: EditForm) => {
    if (!action.isOpen) return;

    // Parse price, take only the first 2
    const newPrices = data.prices
      .split(",")
      .map((price) => Number(price))
      .slice(0, 2);

    if (newPrices.length < 2) {
      toast.error("Please enter at least 2 prices");
      return;
    }

    const update: Partial<VeggiePrice> = {
      _id: action.veggiePrice._id,
      price: newPrices,
      id: data.id,
      name: data.name,
    };

    const process = toast.loading("Updating...");

    setTransition(async () => {
      const res = await updateVeggieHistoryPrice(update, tradingCenter);
      if (!res?.success) {
        toast.error("Failed to update", { id: process });
        return;
      }

      setTransition(() => {
        toast.success("Updated", { id: process });

        // Close edit dialog
        handleCloseAction(false);
      });
    });
  };

  useEffect(() => {
    if (isSet) return;

    if (action.isOpen) {
      form.reset({
        id: action.veggiePrice.id,
        name: action.veggiePrice.name,
        parentName: action.veggiePrice.parentName,
        prices: action.veggiePrice.price.toString(),
        date: new Date(action.veggiePrice.dateUnix).toISOString(),
        parentId: action.veggiePrice.parentId,
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
            For now, editing the name is not allowed.
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
                name="parentId"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Parent ID</FormLabel>

                    <FormControl>
                      <Input readOnly {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="parentName"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Parent</FormLabel>

                    <FormControl>
                      <Input readOnly {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>ID</FormLabel>

                    <FormControl>
                      <Input {...field} />
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
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="prices"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Prices</FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter prices, use comma to separate"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Date</FormLabel>

                    <FormControl>
                      <Input readOnly {...field} />
                    </FormControl>
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
