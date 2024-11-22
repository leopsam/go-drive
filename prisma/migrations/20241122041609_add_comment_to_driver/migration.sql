/*
  Warnings:

  - Added the required column `comment` to the `Driver` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Driver" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "car" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "comment" TEXT NOT NULL,
    "ratePerKm" REAL NOT NULL,
    "minDistance" INTEGER NOT NULL
);
INSERT INTO "new_Driver" ("car", "description", "id", "minDistance", "name", "ratePerKm", "rating") SELECT "car", "description", "id", "minDistance", "name", "ratePerKm", "rating" FROM "Driver";
DROP TABLE "Driver";
ALTER TABLE "new_Driver" RENAME TO "Driver";
CREATE UNIQUE INDEX "Driver_name_key" ON "Driver"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
