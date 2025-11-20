"use client";

import JsonCodeEditor from "@/components/code-editor";
import { updateVegetableCategories } from "@/lib/server-actions/updates/vegetable-categories";
import { TradingCenterDoc } from "@/types/dt";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mm-app/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@mm-app/ui/components/card";
import { Field, FieldGroup, FieldLabel } from "@mm-app/ui/components/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@mm-app/ui/components/select";
import { WithId } from "mongodb";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  value: z.string(),
  tradingCenter: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

export default function PriceUpdatesVegetableCategories(props: {
  tradingCenters: WithId<TradingCenterDoc>[];
}) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "{}",
      tradingCenter: props.tradingCenters[0]?.slug || "",
    },
  });

  const [isPending, startTransition] = useTransition();

  const submitHandler = (data: FormSchema) => {
    try {
      const parsedData = JSON.parse(data.value);

      if (Object.keys(parsedData).length === 0) {
        toast.error("Empty JSON object ");
        return;
      }

      const process = toast.loading("Processing...");

      startTransition(async () => {
        const res = await updateVegetableCategories(
          parsedData,
          data.tradingCenter,
        );
        if (!res.success) {
          toast.error(`Error: ${res.message}`, { id: process });
          return;
        }

        startTransition(() => {
          form.setValue("value", "{}");
          toast.success("Vegetable categories updated successfully", {
            id: process,
          });
        });
      });
    } catch (err) {
      toast.error(`Error: ${err}`);
    }
  };

  return (
    <Card className="bg-muted">
      <CardHeader>
        <CardTitle>Vegetable Categories</CardTitle>
        <CardDescription>Add new vegetable categories data.</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(submitHandler)}>
          <FieldGroup className="gap-8">
            <Controller
              control={form.control}
              name="value"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <JsonCodeEditor
                    value={field.value}
                    onChange={field.onChange}
                    height="700px"
                    aria-invalid={fieldState.invalid}
                  />
                </Field>
              )}
            />

            <div className="flex flex-row items-center justify-between">
              <Controller
                control={form.control}
                name="tradingCenter"
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="w-[300px]"
                  >
                    <FieldLabel htmlFor={field.name}>Trading Center</FieldLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      name={field.name}
                    >
                      <SelectTrigger
                        className="w-[300px]"
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder="Select Trading Center" />
                      </SelectTrigger>
                      <SelectContent>
                        {props.tradingCenters.map((tradingCenter) => (
                          <SelectItem
                            key={tradingCenter._id.toString()}
                            value={tradingCenter.slug}
                          >
                            {tradingCenter.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />

              <div>
                <Button disabled={isPending} type="submit">
                  {isPending ? "Processing..." : "Submit (Process Changes)"}
                </Button>
              </div>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
