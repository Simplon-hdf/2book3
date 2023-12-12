/*
  Warnings:

  - The `status` column on the `Borrows` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "borrowState" AS ENUM ('ONGOING', 'CLOSED');

-- AlterTable
ALTER TABLE "Borrows" DROP COLUMN "status",
ADD COLUMN     "status" "borrowState" NOT NULL DEFAULT 'ONGOING';
