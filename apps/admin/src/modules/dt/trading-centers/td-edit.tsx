"use client";

import { updateTradingCenter } from "@/lib/server-actions/trading-centers";
import { zodResolver } from "@hookform/resolvers/zod";
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
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@mm-app/ui/components/field";
import { Input } from "@mm-app/ui/components/input";
import { useEffect, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useTradingCentersActions } from "./context";

const editFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  longName: z.string(),
  slug: z.string(),
  facebookPage: z.string().url().optional().or(z.literal("")),
});

type EditForm = z.infer<typeof editFormSchema>;

export default function TradingCentersEditItem() {
  const { action, handleCloseAction } = useTradingCentersActions();

  const [isSet, setIsSet] = useState(false);
  const [isProcessing, startTransition] = useTransition();

  const form = useForm<EditForm>({
    resolver: zodResolver(editFormSchema),
    defaultValues: action.isOpen
      ? {
          id: action.tradingCenter._id,
          name: action.tradingCenter.name,
          longName: action.tradingCenter.longName,
          slug: action.tradingCenter.slug,
          facebookPage: action.tradingCenter.facebookPage || "",
        }
      : {
          id: "",
          name: "",
          longName: "",
          slug: "",
          facebookPage: "",
        },
  });

  const handleSubmit = (data: EditForm) => {
    const process = toast.loading("Updating trading center...");

    startTransition(async () => {
      const res = await updateTradingCenter(data.id, {
        name: data.name,
        longName: data.longName,
        facebookPage: data.facebookPage,
      });
      if (!res.success) {
        toast.error(res.message || "Failed to update trading center", {
          id: process,
        });
        return;
      }

      startTransition(() => {
        handleCloseAction(false);
        toast.success("Trading center updated successfully", { id: process });
      });
    });
  };

  useEffect(() => {
    if (isSet) return;

    if (action.isOpen) {
      form.reset({
        id: action.tradingCenter._id,
        name: action.tradingCenter.name,
        longName: action.tradingCenter.longName,
        slug: action.tradingCenter.slug,
        facebookPage: action.tradingCenter.facebookPage || "",
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
    <Dialog open={action.isOpen} onOpenChange={handleCloseAction}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {action.isOpen ? action.tradingCenter.name : ""} | Edit Trading
            Center
          </DialogTitle>
          <DialogDescription>
            Make changes to the trading center here. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>

        <div>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FieldGroup>
              <Controller
                name="id"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>ID</FieldLabel>
                    <Input
                      {...field}
                      readOnly
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                    />
                  </Field>
                )}
              />

              <Controller
                name="slug"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Slug</FieldLabel>
                    <Input
                      {...field}
                      readOnly
                      placeholder="Slug for trading center, i.e trading-center"
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldDescription className="text-xs">
                      * Can't be changed for now since requires renaming
                      database names.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      {...field}
                      placeholder="Name of trading center"
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="longName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Long Name</FieldLabel>
                    <Input
                      {...field}
                      placeholder="Long Name for trading center"
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="facebookPage"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Facebook Page</FieldLabel>
                    <Input
                      {...field}
                      placeholder="https://facebook.com/trading-center"
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
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
