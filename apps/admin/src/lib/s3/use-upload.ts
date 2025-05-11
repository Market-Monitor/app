"use client";

import { lyla } from "@lylajs/web";
import { useState } from "react";
import { generatePresignedUrl } from "./actions";

export interface UploadedFile {
  key: string;
  url: string;
  file: File;
}

export interface UploadHandlers<T> {
  onFileUploadFinish?: (file: UploadedFile, data?: T) => void;
  onFileUploadFail?: (file: File, err: Error) => void;
}

/**
 * Custom hook for uploading files to a specific album.
 *
 * @param handlers - Optional handlers for file upload events.
 * @returns An object containing the following properties:
 *   - handleUpload: A function to handle the upload of files.
 *   - progresses: A record of file names and their upload progress percentages.
 *   - isUploading: A boolean indicating whether files are currently being uploaded.
 *   - failedUploads: An array of files that failed to upload.
 *   - successfulUploads: An array of files that were successfully uploaded.
 *   - isDoneUploading: A boolean indicating whether the upload process is done.
 *   - resetUpload: A function to reset the upload process.
 */
export const useUpload = <T = Record<string, unknown>>(
  handlers?: UploadHandlers<T>,
) => {
  const [progresses, setProgresses] = useState<Record<string, number>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [isDoneUploading, setIsDoneUploading] = useState<null | boolean>(null);

  const [failedUploads, setFailedUploads] = useState<File[]>([]);
  const [successfulUploads, setSuccessfulUploads] = useState<UploadedFile[]>(
    [],
  );

  const handleUpload = async (files: File[], data?: T) => {
    setIsUploading(true);
    setIsDoneUploading(false);

    setProgresses({
      ...Object.fromEntries(
        files.map((file) => [encodeURIComponent(file.name), 1]),
      ),
    });

    // Loop through each file and upload it
    for (const file of files) {
      const fileCopy = file;

      const signedUrl = await generatePresignedUrl(file.name);
      if (!signedUrl) {
        setFailedUploads((prev) => [...prev, file]);

        if (handlers?.onFileUploadFail) {
          // Call the onFileUploadFail handler if provided
          handlers.onFileUploadFail(
            file,
            new Error("Failed to generate signed URL for file"),
          );
        }

        continue;
      }

      await lyla
        .put(signedUrl.signedUrl, {
          body: file,
          headers: {
            "Content-Type": file.type,
          },
          onUploadProgress: ({ percent }) => {
            setProgresses((prev) => ({
              ...prev,
              [encodeURIComponent(fileCopy.name)]: percent,
            }));
          },
        })
        .then(() => {
          setSuccessfulUploads(() => [
            {
              key: signedUrl.fileKey,
              url: signedUrl.cdnUrl,
              file: fileCopy,
            },
          ]);

          if (handlers?.onFileUploadFinish) {
            handlers.onFileUploadFinish(
              {
                key: signedUrl.fileKey,
                url: signedUrl.cdnUrl,
                file: fileCopy,
              },
              data,
            );
          }
        })
        .catch((err) => {
          setFailedUploads((prev) => [...prev, fileCopy]);

          if (handlers?.onFileUploadFail) {
            // Call the onFileUploadFail handler if provided
            handlers.onFileUploadFail(
              file,
              new Error("Failed to upload file to signed URL", err),
            );
          }
        });
    }

    setIsUploading(false);
    setIsDoneUploading(true);
  };

  const resetUpload = () => {
    setProgresses({});
    setIsUploading(false);
    setIsDoneUploading(null);
  };

  return {
    handleUpload,
    progresses,
    isUploading,
    failedUploads,
    successfulUploads,
    isDoneUploading,
    resetUpload,
  };
};
