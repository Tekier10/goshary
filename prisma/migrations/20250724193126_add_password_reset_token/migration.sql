-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    "uzivatelId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PasswordResetToken_uzivatelId_fkey" FOREIGN KEY ("uzivatelId") REFERENCES "Uzivatel" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON "PasswordResetToken"("token");
