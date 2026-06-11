import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL as string,
})

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter })

globalForPrisma.prisma = prisma
