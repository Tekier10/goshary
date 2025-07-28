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
    CONSTRAINT "Inzerat_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Inzerat" ("autorId", "hodnoceni", "id", "kontakt", "lokalita", "overeno", "popis", "titulek", "typ", "typStranky") SELECT "autorId", "hodnoceni", "id", "kontakt", "lokalita", "overeno", "popis", "titulek", "typ", "typStranky" FROM "Inzerat";
DROP TABLE "Inzerat";
ALTER TABLE "new_Inzerat" RENAME TO "Inzerat";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
