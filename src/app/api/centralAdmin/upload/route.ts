import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getS3, getPublicUrl, PRODUCT_BUCKET } from "@/lib/buckets-s3";
import { ok, err } from "@/lib/api-response";
import type { NextRequest } from "next/server";

// POST /api/centralAdmin/upload
// Body: multipart/form-data — field "file" (image) + optional "productId"
// Returns: { url } — public URL to store in ProductImage.url
export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    const productId = form.get("productId")?.toString() ?? "misc";

    if (!(file instanceof File)) return err("Missing file field", 400);

    const allowed = ["image/jpeg", "image/png", "image/webp", "image/avif"];
    if (!allowed.includes(file.type)) return err("Unsupported image type", 415);

    const maxBytes = 8 * 1024 * 1024; // 8 MB
    if (file.size > maxBytes) return err("File exceeds 8 MB limit", 413);

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const timestamp = Date.now();
    const path = `${productId}/${timestamp}.${ext}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    await getS3().send(
      new PutObjectCommand({
        Bucket: PRODUCT_BUCKET,
        Key: path,
        Body: buffer,
        ContentType: file.type,
        CacheControl: "public, max-age=31536000, immutable",
      }),
    );

    return ok({ url: getPublicUrl(path), path });
  } catch (e) {
    console.error("[POST /api/centralAdmin/upload]", e);
    return err("Upload failed", 500);
  }
}
