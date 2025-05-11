"use server";

import { DeleteObjectsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { auth } from "@mm-app/auth/server";
import { nanoid } from "nanoid";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cdnConfig, s3Client } from "./client";

/**
 * Generates a presigned URL for the given file name.
 *
 * @param fileName - The name of the file.
 * @returns An object containing the new filename and the signed URL.
 */
export const generatePresignedUrl = async (fileName: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    revalidateTag("get-assets");
    revalidateTag("get-veggies");
    return redirect("/");
  }

  try {
    const fileKey = `${nanoid()}`;
    const newFilename =
      fileKey + "/" + encodeURI(fileName.replaceAll(" ", "_"));

    const command = new PutObjectCommand({
      Bucket: cdnConfig.DEFAULT_BUCKET,
      Key: newFilename,
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 900 }); // 15 minutes

    return {
      cdnUrl:
        cdnConfig.CDN_CLOUDFLARE +
        `/${cdnConfig.DEFAULT_BUCKET}/` +
        newFilename,
      newFilename,
      signedUrl,
      fileKey,
    };
  } catch (err) {
    console.error(err);

    return null;
  }
};

/**
 * Removes files from S3 bucket.
 *
 * @param fileUrls - An array of file keys to be removed.
 * @returns A boolean indicating whether the files were successfully removed or not.
 */
export const removeFilesFromS3 = async (
  previousState: {
    success: boolean;
  } | null,
  fileUrls: string[],
) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    revalidateTag("get-assets");
    revalidateTag("get-veggies");
    return redirect("/");
  }
  const fileKeys = fileUrls.map((x) =>
    x
      .replace(`${cdnConfig.CDN_CLOUDFLARE}/${cdnConfig.DEFAULT_BUCKET}/`, "")
      .replace(`${cdnConfig.CDN_CLOUDFLARE}//${cdnConfig.DEFAULT_BUCKET}/`, ""),
  );

  try {
    const command = new DeleteObjectsCommand({
      Bucket: cdnConfig.DEFAULT_BUCKET,
      Delete: {
        Objects: fileKeys.map((x) => ({ Key: x })),
      },
    });

    await s3Client.send(command);

    return {
      success: true,
    };
  } catch (err) {
    console.error(err);

    return {
      success: false,
    };
  }
};
