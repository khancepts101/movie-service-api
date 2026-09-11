import "dotenv/config";
import { resolve } from "node:path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
let ratingsAttached = false;

//Prisma enables you to attach a db and be able to query it similar having the same data as a table to join on
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