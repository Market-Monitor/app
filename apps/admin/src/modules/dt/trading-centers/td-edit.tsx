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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@mm-app/ui/components/form";
import { Input } from "@mm-app/ui/components/input";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
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
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                name="id"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="slug"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        readOnly
                        placeholder="Slug for trading center, i.e trading-center"
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      * Can't be changed for now since requires renaming
                      database names.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Name of trading center" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="longName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Long Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Long Name for trading center"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="facebookPage"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facebook Page</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://facebook.com/trading-center"
                      />
                    </FormControl>
                    <FormMessage />
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
