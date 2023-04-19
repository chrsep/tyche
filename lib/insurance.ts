// @ts-ignore
import pdf from "pdf-parse/lib/pdf-parse"
import prisma from "$lib/prisma"
import { randomUUID } from "crypto"
import { InsuranceFile } from "@prisma/client"
import { getFile } from "$lib/file-storage"

export async function findInsuranceFiles(email: string) {
  await prisma.$connect()
  return prisma.insuranceFile.findMany({
    where: {
      user: {
        email: email,
      },
    },
  })
}

export async function saveInsuranceFile(
  userId: string,
  type: string,
  name: string
) {
  await prisma.$connect()
  return prisma.insuranceFile.create({
    data: {
      userId: userId,
      type: type,
      name: name,
      objectKey: `insurance/${userId}/${randomUUID()}`,
      content: "",
    },
  })
}

export async function updateInsuranceFileContent(id: string, content: string) {
  await prisma.$connect()
  await prisma.insuranceFile.update({
    where: { id },
    data: { content },
  })
}

export async function deleteInsuranceFile(id: string) {
  await prisma.$connect()
  return prisma.insuranceFile.delete({
    where: {
      id: id,
    },
  })
}

export async function findInsuranceFile(id: string) {
  await prisma.$connect()
  return prisma.insuranceFile.findUnique({
    where: { id: id },
  })
}

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
