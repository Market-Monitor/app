"use client";

import { useUpload } from "@/lib/s3/use-upload";
import { saveAssetUploadToDB } from "@/lib/server-actions/asset";
import { AssetDoc } from "@/types/dt";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mm-app/ui/components/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@mm-app/ui/components/field";
import { Input } from "@mm-app/ui/components/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@mm-app/ui/components/tooltip";
import { cn } from "@mm-app/ui/lib/utils";
import { CircleHelpIcon, UploadCloudIcon } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocalStorage } from "react-use";
import { toast } from "sonner";
import { z } from "zod";
import { FileUploader } from "./file-uploader";
import { UploadedFilesCard } from "./uploaded-files-card";

const uploadSchema = z.object({
  images: z.array(z.instanceof(File)),
  source: z.string().optional(),
});

type UploadSchema = z.infer<typeof uploadSchema>;

const AssetsUploader = (props: { className?: string }) => {
  const [, startTransition] = useTransition();
  const [failedSaves, setFailedSaves] = useLocalStorage<Partial<AssetDoc>[]>(
    "save-failures",
    [],
  );
  const {
    handleUpload,
    progresses,
    isUploading,
    failedUploads,
    successfulUploads,
    isDoneUploading,
    resetUpload,
  } = useUpload<{
    source: string;
  }>({
    async onFileUploadFinish(file, data) {
      toast.success(`File ${file.file.name} uploaded successfully.`);

      // We save each file separately, incase a person is uploading multiple files
      // and one of them fails, we can still save the successful ones.
      // TODO: incase of save fail, we kind of need a failover mechanism to retry saving the file
      const record: Partial<AssetDoc> = {
        image: file.url,
        uploadedDate: new Date().toISOString(),
        fileSize: file.file.size,
        source: data?.source ?? "",
      };

      startTransition(async () => {
        const save = await saveAssetUploadToDB(record);

        if (!save?.success) {
          // Save to localStorage for retry later on
          setFailedSaves([...(failedSaves ?? []), record]);
        }
      });

      // No need to notify the user I think
    },
    onFileUploadFail(file, err) {
      toast.error(`File ${file.name} failed to upload. Reason: ${err.message}`);
    },
  });

  const form = useForm<UploadSchema>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      images: [],
      source: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const watchImages = form.watch("images");

  const onSubmit = async (data: UploadSchema) => {
    const process = toast.loading("Uploading files...");

    setIsLoading(true);
    try {
      await handleUpload(data.images, {
        source: data.source ?? "",
      });

      form.reset();
      resetUpload();
    } catch (err) {
      setIsLoading(false);
      console.error(err);

      toast.error("An error occurred while uploading files.", {
        id: process,
      });
      return;
    }

    setIsLoading(false);
    toast.success("Files uploaded successfully.", { id: process });
  };

  useEffect(() => {
    if (failedUploads.length > 0) {
      toast.error(
        "The following files failed to upload: " +
          failedUploads.map((file) => file.name).join(", "),
      );
    }
  }, [failedUploads]);

  return (
    <div className={cn("w-5/6 mx-auto space-y-6", props.className)}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="gap-4">
          <Controller
            control={form.control}
            name="images"
            disabled={
              isUploading ||
              (typeof isDoneUploading === "boolean" ? isDoneUploading : false)
            }
            render={({ field, fieldState }) => (
              <div className="space-y-6">
                <Field aria-invalid={fieldState.invalid} className="w-full">
                  <FileUploader
                    value={field.value}
                    onValueChange={field.onChange}
                    maxFileCount={Infinity}
                    progresses={progresses}
                    disabled={isUploading}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              </div>
            )}
          />
          <Controller
            control={form.control}
            name="source"
            render={({ field, fieldState }) => (
              <Field aria-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-muted-foreground space-x-2 inline-flex items-center"
                >
                  <span>Image Source (Optional)</span>

                  <Tooltip>
                    <TooltipTrigger>
                      <CircleHelpIcon className="h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        If the image is from another website, please provide
                        source to credit the author.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </FieldLabel>

                <Input
                  {...field}
                  placeholder="Image source if available..."
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                />
              </Field>
            )}
          />
          <div>
            <Button
              type="submit"
              disabled={
                (watchImages ?? []).length === 0 || isLoading || isUploading
              }
              className="space-x-2 w-full"
            >
              <UploadCloudIcon className="h-4 w-4" />
              <span>{isLoading ? "Uploading..." : "Upload"}</span>
            </Button>
          </div>
          <div>
            {successfulUploads.length > 0 ? (
              <UploadedFilesCard uploadedFiles={successfulUploads} />
            ) : null}
          </div>
        </FieldGroup>
      </form>
    </div>
  );
};
export default AssetsUploader;
