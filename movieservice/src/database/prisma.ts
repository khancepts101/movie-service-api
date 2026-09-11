import "dotenv/config";
import { resolve } from "node:path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
let ratingsAttached = false;

export async function attachRatingsDatabase(): Promise<void> {
  if (ratingsAttached) {
    return;
  }

  const ratingsPath = resolve(
    process.env.RATINGS_DATABASE_PATH ?? "../db/ratings.db",
  );

  await prisma.$executeRawUnsafe(
    "ATTACH DATABASE ? AS ratings_db",
    ratingsPath,
  );

  ratingsAttached = true;
}

export default prisma;