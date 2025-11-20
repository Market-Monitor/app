"use client";

import { updateVegetableClass } from "@/lib/server-actions/dt/vegetable-class";
import { isStringEmpty } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { VeggieClass } from "@mm-app/internal/api";
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
import { startTransition, useEffect, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useDataManagement } from "../dt-provider";
import { useVeggieCategoryActions } from "./actions-provider";

const editFormSchema = z.object({
  id: z.string(),
  name: z.string(),
});

type EditForm = z.infer<typeof editFormSchema>;

export default function VeggieCategoryEdit() {
  const { tradingCenter } = useDataManagement();

  const [isSet, setIsSet] = useState(false);
  const [isProcessing, setTransition] = useTransition();

  const { action, handleCloseAction } = useVeggieCategoryActions();

  const form = useForm<EditForm>({
    resolver: zodResolver(editFormSchema),
    defaultValues: action.isOpen
      ? {
          id: action.veggie.id,
          name: action.veggie.name,
        }
      : {
          id: "",
          name: "",
        },
  });

  const handleSubmit = async (data: EditForm) => {
    if (!action.isOpen) return;

    if (isStringEmpty(data.name)) {
      toast.error("Name is required");
      return;
    }

    const update: Partial<VeggieClass> = {
      _id: action.veggie._id,
      name: data.name,
    };

    const process = toast.loading("Updating...");

    setTransition(async () => {
      const res = await updateVegetableClass(update, tradingCenter);
      if (!res.success) {
        toast.error("Failed to update", { id: process });
        return;
      }

      startTransition(() => {
        toast.success("Vegetable updated successfully", { id: process });

        // Close edit dialog
        handleCloseAction(false);
      });
    });
  };

  useEffect(() => {
    if (isSet) return;

    if (action.isOpen) {
      form.reset({
        id: action.veggie.id,
        name: action.veggie.name,
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
            * Make sure to not update the name of the parent name too. Example:{" "}
            <code className="bg-secondary px-1 py-0.5 rounded-lg">
              Veggie Good
            </code>
            ,{" "}
            <code className="bg-secondary px-1 py-0.5 rounded-lg">Veggie</code>{" "}
            is the parent name, update only{" "}
            <code className="bg-secondary px-1 py-0.5 rounded-lg">Good</code>{" "}
            since it is the category / class name. This will be fixed in the
            future.
          </DialogDescription>
        </DialogHeader>

        <div>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FieldGroup className="gap-4">
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
                      readOnly
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
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
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                    />
                  </Field>
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
            </FieldGroup>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
