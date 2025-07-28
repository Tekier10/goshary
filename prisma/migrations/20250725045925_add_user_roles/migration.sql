-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Uzivatel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "jmeno" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER'
);
INSERT INTO "new_Uzivatel" ("email", "id", "jmeno", "passwordHash") SELECT "email", "id", "jmeno", "passwordHash" FROM "Uzivatel";
DROP TABLE "Uzivatel";
ALTER TABLE "new_Uzivatel" RENAME TO "Uzivatel";
CREATE UNIQUE INDEX "Uzivatel_email_key" ON "Uzivatel"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
