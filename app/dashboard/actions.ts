import prisma from "@/prisma/db";

export default function addUserToDb(email: string) {
  return prisma.user.create({
    data: {
      email,
    },
  });
}
