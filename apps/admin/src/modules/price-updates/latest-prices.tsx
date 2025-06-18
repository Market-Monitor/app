"use client";

import CodeEditor from "@/components/code-editor";
import { updateLatestPrices } from "@/lib/server-actions/updates/latest-prices";
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
import { Checkbox } from "@mm-app/ui/components/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@mm-app/ui/components/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@mm-app/ui/components/select";
import { WithId } from "mongodb";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  value: z.string(),
  tradingCenter: z.string(),
  forceInsert: z.boolean().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

export default function PriceUpdatesLatest(props: {
  tradingCenters: WithId<TradingCenterDoc>[];
}) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "[]",
      tradingCenter: props.tradingCenters[0]?.slug || "",
      forceInsert: false,
    },
  });

  const [isPending, startTransition] = useTransition();

  const submitHandler = (data: FormSchema) => {
    try {
      const parsedData = JSON.parse(data.value);

      if (!Array.isArray(parsedData)) {
        toast.error("Data is not a valid JSON array");
        return;
      }

      if (parsedData.length === 0) {
        toast.error("Data is an empty JSON array");
        return;
      }

      const process = toast.loading("Processing...");

      startTransition(async () => {
        const res = await updateLatestPrices(parsedData, data.tradingCenter, {
          forceInsert: data.forceInsert,
        });
        if (!res.success) {
          toast.error(`Error: ${res.message}`, {
            id: process,
          });
          return;
        }

        startTransition(() => {
          form.setValue("value", "[]");
          toast.success("Latest prices updated successfully", {
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
        <CardTitle>Update Latest Prices</CardTitle>
        <CardDescription>
          Add new latest prices data. Data needs to be a JSON array.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <CodeEditor
                    lang="json"
                    value={field.value}
                    onChange={field.onChange}
                    height="700px"
                  />
                </FormItem>
              )}
            />

            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-end space-x-4">
                <FormField
                  control={form.control}
                  name="tradingCenter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trading Center</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-[300px]">
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
                    </FormItem>
                  )}
                />
                <FormField
                  name="forceInsert"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex items-start">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div>
                        <FormLabel>Force Insert</FormLabel>
                        <FormDescription className="text-xs">
                          If checked, it will ignore existing data date checks
                          and forcefully adds the data.
                          <br />
                          Only check if you know what you are doing.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <Button
                  className="w-[250px]"
                  disabled={isPending}
                  type="submit"
                >
                  {isPending ? "Processing..." : "Submit (Process Changes)"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
