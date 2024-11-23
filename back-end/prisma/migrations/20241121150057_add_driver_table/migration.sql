-- CreateTable
CREATE TABLE "Driver" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "car" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "ratePerKm" REAL NOT NULL,
    "minDistance" INTEGER NOT NULL
);
