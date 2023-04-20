// @ts-ignore
import pdf from "pdf-parse/lib/pdf-parse"
import { InsuranceFile } from "@prisma/client"
import { getFile } from "./file-storage"
import { updateInsuranceFileContent } from "$lib/db"

export async function loadInsuranceFile(metadata: InsuranceFile) {
  const file = await getFile(metadata.objectKey)
  if (metadata.content) {
    return metadata.content
  }

  const byteStream = await file.Body?.transformToByteArray()
  if (!byteStream) {
    throw new Error("No file found")
  }
  const result = await pdf(Buffer.from(byteStream))

  await updateInsuranceFileContent(metadata.id, result.text)

  return result.text
}
