/*
  Warnings:

  - The `status` column on the `TravelBuddy` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'DEACTIVATE');

-- AlterTable
ALTER TABLE "TravelBuddy" DROP COLUMN "status",
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';
