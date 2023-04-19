import prisma from "$lib/prisma"
import { randomUUID } from "crypto"

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
    },
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
