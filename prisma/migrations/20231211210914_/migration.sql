/*
  Warnings:

  - You are about to drop the column `humanInformationId` on the `Authors` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Books` table. All the data in the column will be lost.
  - You are about to drop the column `borrowId` on the `Books` table. All the data in the column will be lost.
  - You are about to drop the column `humanInformationId` on the `Borrowers` table. All the data in the column will be lost.
  - You are about to drop the column `borrowerId` on the `Borrows` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `Borrows` table. All the data in the column will be lost.
  - You are about to drop the column `humanInformationId` on the `Employees` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[humanInformation_uuid]` on the table `Authors` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[humanInformation_uuid]` on the table `Borrowers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[humanInformation_uuid]` on the table `Employees` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `humanInformation_uuid` to the `Authors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author_uuid` to the `Books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `humanInformation_uuid` to the `Borrowers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `borrower_uuid` to the `Borrows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employee_uuid` to the `Borrows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `humanInformation_uuid` to the `Employees` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Authors" DROP CONSTRAINT "Authors_humanInformationId_fkey";

-- DropForeignKey
ALTER TABLE "Books" DROP CONSTRAINT "Books_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Books" DROP CONSTRAINT "Books_borrowId_fkey";

-- DropForeignKey
ALTER TABLE "Borrowers" DROP CONSTRAINT "Borrowers_humanInformationId_fkey";

-- DropForeignKey
ALTER TABLE "Borrows" DROP CONSTRAINT "Borrows_borrowerId_fkey";

-- DropForeignKey
ALTER TABLE "Borrows" DROP CONSTRAINT "Borrows_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Employees" DROP CONSTRAINT "Employees_humanInformationId_fkey";

-- DropIndex
DROP INDEX "Authors_humanInformationId_key";

-- DropIndex
DROP INDEX "Borrowers_humanInformationId_key";

-- DropIndex
DROP INDEX "Employees_humanInformationId_key";

-- AlterTable
ALTER TABLE "Authors" DROP COLUMN "humanInformationId",
ADD COLUMN     "humanInformation_uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Books" DROP COLUMN "authorId",
DROP COLUMN "borrowId",
ADD COLUMN     "author_uuid" TEXT NOT NULL,
ADD COLUMN     "borrow_uuid" TEXT;

-- AlterTable
ALTER TABLE "Borrowers" DROP COLUMN "humanInformationId",
ADD COLUMN     "humanInformation_uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Borrows" DROP COLUMN "borrowerId",
DROP COLUMN "employeeId",
ADD COLUMN     "borrower_uuid" TEXT NOT NULL,
ADD COLUMN     "employee_uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Employees" DROP COLUMN "humanInformationId",
ADD COLUMN     "humanInformation_uuid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Authors_humanInformation_uuid_key" ON "Authors"("humanInformation_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Borrowers_humanInformation_uuid_key" ON "Borrowers"("humanInformation_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Employees_humanInformation_uuid_key" ON "Employees"("humanInformation_uuid");

-- AddForeignKey
ALTER TABLE "Authors" ADD CONSTRAINT "Authors_humanInformation_uuid_fkey" FOREIGN KEY ("humanInformation_uuid") REFERENCES "HumanInformations"("UUID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrowers" ADD CONSTRAINT "Borrowers_humanInformation_uuid_fkey" FOREIGN KEY ("humanInformation_uuid") REFERENCES "HumanInformations"("UUID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_humanInformation_uuid_fkey" FOREIGN KEY ("humanInformation_uuid") REFERENCES "HumanInformations"("UUID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_author_uuid_fkey" FOREIGN KEY ("author_uuid") REFERENCES "Authors"("UUID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_borrow_uuid_fkey" FOREIGN KEY ("borrow_uuid") REFERENCES "Borrows"("UUID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrows" ADD CONSTRAINT "Borrows_employee_uuid_fkey" FOREIGN KEY ("employee_uuid") REFERENCES "Employees"("UUID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrows" ADD CONSTRAINT "Borrows_borrower_uuid_fkey" FOREIGN KEY ("borrower_uuid") REFERENCES "Borrowers"("UUID") ON DELETE RESTRICT ON UPDATE CASCADE;
