import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.S3_ENDPOINT || undefined,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
})

export async function generateFileUploadURL(key: string, type: string) {
  return getSignedUrl(
    s3,
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET || "",
      Key: key,
      ContentType: type,
    }),
    { expiresIn: 60 * 60 * 24 }
  )
}
