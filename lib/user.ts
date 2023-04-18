import prisma from "$lib/prisma"

export async function saveUser(email: string, name: string) {
  await prisma.$connect()
  return prisma.user.upsert({
    where: { email: email },
    create: {
      email: email,
      name: name,
    },
    update: {
      name: name,
    },
  })
}

export async function findUserByEmail(email: string) {
  await prisma.$connect()
  return prisma.user.findUnique({
    where: {
      email: email,
    },
  })
}
