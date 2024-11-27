-- CreateTable
CREATE TABLE "Driver" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "car" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "comment" TEXT NOT NULL,
    "ratePerKm" DOUBLE PRECISION NOT NULL,
    "minDistance" INTEGER NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Driver_name_key" ON "Driver"("name");

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
