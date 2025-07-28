/*
  Warnings:

  - You are about to drop the `Uzivatel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Uzivatel_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Uzivatel";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "jmeno" TEXT,
    "email" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT,
    "passwordHash" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER'
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Account" ("access_token", "expires_at", "id", "id_token", "provider", "providerAccountId", "refresh_token", "scope", "session_state", "token_type", "type", "userId") SELECT "access_token", "expires_at", "id", "id_token", "provider", "providerAccountId", "refresh_token", "scope", "session_state", "token_type", "type", "userId" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");
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
    CONSTRAINT "Inzerat_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Inzerat" ("autorId", "hodnoceni", "id", "kontakt", "lokalita", "overeno", "popis", "titulek", "typ", "typStranky") SELECT "autorId", "hodnoceni", "id", "kontakt", "lokalita", "overeno", "popis", "titulek", "typ", "typStranky" FROM "Inzerat";
DROP TABLE "Inzerat";
ALTER TABLE "new_Inzerat" RENAME TO "Inzerat";
CREATE TABLE "new_Notifikace" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "zprava" TEXT NOT NULL,
    "datum" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "precteno" BOOLEAN NOT NULL DEFAULT false,
    "prijemceId" TEXT NOT NULL,
    CONSTRAINT "Notifikace_prijemceId_fkey" FOREIGN KEY ("prijemceId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Notifikace" ("datum", "id", "precteno", "prijemceId", "zprava") SELECT "datum", "id", "precteno", "prijemceId", "zprava" FROM "Notifikace";
DROP TABLE "Notifikace";
ALTER TABLE "new_Notifikace" RENAME TO "Notifikace";
CREATE TABLE "new_PasswordResetToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    "uzivatelId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PasswordResetToken_uzivatelId_fkey" FOREIGN KEY ("uzivatelId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PasswordResetToken" ("createdAt", "expires", "id", "token", "uzivatelId") SELECT "createdAt", "expires", "id", "token", "uzivatelId" FROM "PasswordResetToken";
DROP TABLE "PasswordResetToken";
ALTER TABLE "new_PasswordResetToken" RENAME TO "PasswordResetToken";
CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON "PasswordResetToken"("token");
CREATE TABLE "new_Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Session" ("expires", "id", "sessionToken", "userId") SELECT "expires", "id", "sessionToken", "userId" FROM "Session";
DROP TABLE "Session";
ALTER TABLE "new_Session" RENAME TO "Session";
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");
CREATE TABLE "new__OblibeneInzeraty" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_OblibeneInzeraty_A_fkey" FOREIGN KEY ("A") REFERENCES "Inzerat" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_OblibeneInzeraty_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__OblibeneInzeraty" ("A", "B") SELECT "A", "B" FROM "_OblibeneInzeraty";
DROP TABLE "_OblibeneInzeraty";
ALTER TABLE "new__OblibeneInzeraty" RENAME TO "_OblibeneInzeraty";
CREATE UNIQUE INDEX "_OblibeneInzeraty_AB_unique" ON "_OblibeneInzeraty"("A", "B");
CREATE INDEX "_OblibeneInzeraty_B_index" ON "_OblibeneInzeraty"("B");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
