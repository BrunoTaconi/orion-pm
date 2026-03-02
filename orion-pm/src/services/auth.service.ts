import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";

export async function registerUser(data: {
  email: string;
  password: string;
  name?: string;
}) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const user = await tx.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
      },
    });

    const team = await tx.team.create({
      data: {
        name: `${data.email}'s Workspace`,
        ownerId: user.id,
      },
    });

    await tx.teamMember.create({
      data: {
        userId: user.id,
        teamId: team.id,
        role: "OWNER",
      },
    });

    return { user, team };
  });
}
