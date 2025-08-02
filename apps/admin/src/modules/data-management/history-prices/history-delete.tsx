"use client";

import { deleteVeggieHistoryPrice } from "@/lib/server-actions/dt/history-price";
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

const deleteFormSchema = z.object({
  _id: z.string(),
  id: z.string(),
});

type DeleteForm = z.infer<typeof deleteFormSchema>;

export default function HistoryDelete() {
  const { tradingCenter } = useDataManagement();
  const { action, handleCloseAction } = useHistoryDataActions();

  const [isSet, setIsSet] = useState(false);
  const [isProcessing, startTransition] = useTransition();

  const form = useForm<DeleteForm>({
    resolver: zodResolver(deleteFormSchema),
    defaultValues: action.isOpen
      ? {
          _id: action.veggiePrice._id,
          id: action.veggiePrice.id,
        }
      : {
          _id: "",
          id: "",
        },
  });

  const handleSubmit = async (data: DeleteForm) => {
    if (!action.isOpen) return;

    if (action.type !== "delete") {
      toast.error("Invalid action type for delete");
      return;
    }

    if (!data.id) {
      toast.error("No ID provided for deletion");
      return;
    }

    const process = toast.loading("Deleting historical price...");

    startTransition(async () => {
      const res = await deleteVeggieHistoryPrice(data._id, tradingCenter);
      if (!res.success) {
        toast.error(res.message || "Failed to delete historical price", {
          id: process,
        });
        return;
      }

      startTransition(() => {
        toast.success("Historical price deleted successfully", {
          id: process,
        });

        handleCloseAction(false);
      });
    });
  };

  useEffect(() => {
    if (isSet) return;

    if (action.isOpen) {
      form.reset({
        _id: action.veggiePrice._id,
        id: action.veggiePrice.id,
      });
      setIsSet(true);
    }
  }, [action, form, isSet]);

  return (
    <Dialog
      open={action.isOpen && action.type === "delete"}
      onOpenChange={(value) => !isProcessing && handleCloseAction(value)}
    >
      <DialogContent
        onInteractOutside={(e) => isProcessing && e.preventDefault()}
        className="max-w-xl"
      >
        <DialogHeader>
          <DialogTitle>Delete Price History</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this historical price?
            <br />
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {action.isOpen ? (
          <div className="border p-2 rounded-lg text-muted-foreground text-sm">
            <p>
              Vegetable: <strong>{action.veggiePrice.name}</strong>
            </p>
            <p>
              Date:{" "}
              <strong>
                {new Date(action.veggiePrice.dateUnix).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  },
                )}
              </strong>
            </p>
          </div>
        ) : null}

        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <input type="hidden" {...form.register("_id")} />

              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vegetable ID</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        readOnly
                        placeholder="This is the ID of the vegetable"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-end space-x-2">
                <DialogClose disabled={isProcessing} asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>

                <Button
                  disabled={isProcessing}
                  type="submit"
                  variant={"destructive"}
                >
                  {isProcessing ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
