import { definePrismaConfig } from "prisma/config";
import { defineConfig as defineSqliteConfig } from "@prisma/orm-sqlite/config";

export default definePrismaConfig({
  orm: defineSqliteConfig({
    contract: "prisma/ratings.prisma",
    db: {
      connection: "../db/ratings.db",
    },
  }),
  skills: {
    agents: ["claude", "cursor", "agents", "devin"],
  },
});
