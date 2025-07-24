-- CreateTable
CREATE TABLE "Uzivatel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "jmeno" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Inzerat" (
    "id" TEXT NOT NULL PRIMARY KEY,
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

-- CreateTable
CREATE TABLE "Fotka" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "inzeratId" TEXT NOT NULL,
    CONSTRAINT "Fotka_inzeratId_fkey" FOREIGN KEY ("inzeratId") REFERENCES "Inzerat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Uzivatel_email_key" ON "Uzivatel"("email");
