"use client";

import { updateVeggieHistoryPrice } from "@/lib/server-actions/dt/history-price";
import { isStringEmpty } from "@/lib/utils";
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
import { Field, FieldGroup, FieldLabel } from "@mm-app/ui/components/field";
import { Input } from "@mm-app/ui/components/input";
import { useEffect, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
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

    if (isStringEmpty(data.parentName)) {
      toast.error("Parent name cannot be empty");
      return;
    }

    if (isStringEmpty(data.name)) {
      toast.error("Name cannot be empty");
      return;
    }

    const update: Partial<VeggiePrice> = {
      _id: action.veggiePrice._id,
      parentName: data.parentName,
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
          <DialogTitle>Edit Historical Price</DialogTitle>
          <DialogDescription>
            For now, editing the name is not allowed.
          </DialogDescription>
        </DialogHeader>

        <div>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FieldGroup className="gap-4">
              <Controller
                control={form.control}
                name="parentId"
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="space-y-1"
                  >
                    <FieldLabel htmlFor={field.name}>Parent ID</FieldLabel>

                    <Input
                      readOnly
                      {...field}
                      aria-invalid={fieldState.invalid}
                      id={field.name}
                    />
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="parentName"
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="space-y-1"
                  >
                    <FieldLabel htmlFor={field.name}>Parent</FieldLabel>

                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      id={field.name}
                    />
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="id"
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="space-y-1"
                  >
                    <FieldLabel htmlFor={field.name}>ID</FieldLabel>

                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      id={field.name}
                    />
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="space-y-1"
                  >
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>

                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      id={field.name}
                    />
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="prices"
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="space-y-1"
                  >
                    <FieldLabel htmlFor={field.name}>Prices</FieldLabel>

                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      id={field.name}
                      placeholder="Enter prices, use comma to separate"
                    />
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="date"
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="space-y-1"
                  >
                    <FieldLabel htmlFor={field.name}>Date</FieldLabel>

                    <Input
                      readOnly
                      {...field}
                      aria-invalid={fieldState.invalid}
                      id={field.name}
                    />
                  </Field>
                )}
              />

              <div className="flex items-center space-x-2">
                <DialogClose type="button" disabled={isProcessing} asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>

                <Button disabled={isProcessing} type="submit">
                  {isProcessing ? "Updating..." : "Update"}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
