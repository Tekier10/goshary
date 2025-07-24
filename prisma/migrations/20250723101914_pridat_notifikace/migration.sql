/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Uzivatel` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Notifikace" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "zprava" TEXT NOT NULL,
    "datum" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "precteno" BOOLEAN NOT NULL DEFAULT false,
    "uzivatelId" TEXT NOT NULL,
    CONSTRAINT "Notifikace_uzivatelId_fkey" FOREIGN KEY ("uzivatelId") REFERENCES "Uzivatel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_OblibeneInzeraty" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_OblibeneInzeraty_A_fkey" FOREIGN KEY ("A") REFERENCES "Inzerat" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_OblibeneInzeraty_B_fkey" FOREIGN KEY ("B") REFERENCES "Uzivatel" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Inzerat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "typStranky" TEXT NOT NULL,
    "typ" TEXT NOT NULL,
    "titulek" TEXT NOT NULL,
    "popis" TEXT NOT NULL,
    "lokalita" TEXT NOT NULL,
    "kontakt" TEXT NOT NULL,
    "overeno" BOOLEAN NOT NULL DEFAULT false,
    "hodnoceni" REAL NOT NULL DEFAULT 0,
    "autorId" TEXT NOT NULL,
    CONSTRAINT "Inzerat_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "Uzivatel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Inzerat" ("autorId", "hodnoceni", "id", "kontakt", "lokalita", "overeno", "popis", "titulek", "typ", "typStranky") SELECT "autorId", "hodnoceni", "id", "kontakt", "lokalita", "overeno", "popis", "titulek", "typ", "typStranky" FROM "Inzerat";
DROP TABLE "Inzerat";
ALTER TABLE "new_Inzerat" RENAME TO "Inzerat";
CREATE TABLE "new_Uzivatel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "jmeno" TEXT NOT NULL,
    "email" TEXT NOT NULL
);
INSERT INTO "new_Uzivatel" ("email", "id", "jmeno") SELECT "email", "id", "jmeno" FROM "Uzivatel";
DROP TABLE "Uzivatel";
ALTER TABLE "new_Uzivatel" RENAME TO "Uzivatel";
CREATE UNIQUE INDEX "Uzivatel_email_key" ON "Uzivatel"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_OblibeneInzeraty_AB_unique" ON "_OblibeneInzeraty"("A", "B");

-- CreateIndex
CREATE INDEX "_OblibeneInzeraty_B_index" ON "_OblibeneInzeraty"("B");
