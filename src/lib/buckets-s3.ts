import { S3Client } from "@aws-sdk/client-s3";

const SUPABASE_PROJECT = "kqckpmlswggdecuohlfe";
const SUPABASE_STORAGE_URL = `https://${SUPABASE_PROJECT}.supabase.co`;
export const PRODUCT_BUCKET = "products";

export function getS3(): S3Client {
  return new S3Client({
    forcePathStyle: true,
    region: "ap-southeast-1",
    endpoint: `${SUPABASE_STORAGE_URL}/storage/v1/s3`,
    credentials: {
      accessKeyId: process.env.AccessKeyID ?? "",
      secretAccessKey: process.env.SecretKeyAccess ?? "",
    },
  });
}

/** Returns the public CDN URL for a stored object path. */
export function getPublicUrl(path: string, bucket = PRODUCT_BUCKET): string {
  return `${SUPABASE_STORAGE_URL}/storage/v1/object/public/${bucket}/${path}`;
}
