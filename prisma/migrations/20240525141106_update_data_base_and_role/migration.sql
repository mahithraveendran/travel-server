/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TravelType" AS ENUM ('BACKPACKING', 'LUXURY', 'ROAD_TRIP', 'VOLUNTEER', 'EDUCATIONAL', 'ADVENTURE', 'FOODIE', 'SLOW_TRAVEL', 'LEISURE', 'BUSINESS', 'OTHER');

-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "photos" TEXT[],
ADD COLUMN     "type" "TravelType" NOT NULL DEFAULT 'ADVENTURE';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';
