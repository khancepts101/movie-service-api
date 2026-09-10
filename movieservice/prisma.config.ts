import { definePrismaConfig } from "prisma/config";
import { defineConfig as defineSqliteConfig } from "@prisma/orm-sqlite/config";

export default definePrismaConfig({
  orm: defineSqliteConfig({
    contract: "prisma/movies.prisma",
    db: {
      connection: "../db/movies.db",
    },
  }),
  skills: {
    agents: ["claude", "cursor", "agents", "devin"],
  },
});
