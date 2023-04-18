import prisma from "$lib/prisma";
import { randomUUID } from "crypto";

export async function findInsurancFilee(userId: string) {
  await prisma.$connect();
  return prisma.insuranceFile.findMany({
    where: {
      userId: userId
    }
  });
}

export async function saveInsuranceFile(
  userId: string,
  type: string,
  name: string
) {
  await prisma.$connect();
  return prisma.insuranceFile.create({
    data: {
      userId: userId,
      type: type,
      name: name,
      objectKey: `insurance/${userId}/${randomUUID()}`
    }
  })
}
