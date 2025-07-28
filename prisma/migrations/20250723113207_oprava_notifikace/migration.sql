/*
  Warnings:

  - You are about to drop the column `uzivatelId` on the `Notifikace` table. All the data in the column will be lost.
  - Added the required column `prijemceId` to the `Notifikace` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Notifikace" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "zprava" TEXT NOT NULL,
    "datum" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "precteno" BOOLEAN NOT NULL DEFAULT false,
    "prijemceId" TEXT NOT NULL,
    CONSTRAINT "Notifikace_prijemceId_fkey" FOREIGN KEY ("prijemceId") REFERENCES "Uzivatel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Notifikace" ("datum", "id", "precteno", "zprava") SELECT "datum", "id", "precteno", "zprava" FROM "Notifikace";
DROP TABLE "Notifikace";
ALTER TABLE "new_Notifikace" RENAME TO "Notifikace";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
