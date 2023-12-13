-- DropForeignKey
ALTER TABLE "Authors" DROP CONSTRAINT "Authors_humanInformation_uuid_fkey";

-- DropForeignKey
ALTER TABLE "Borrowers" DROP CONSTRAINT "Borrowers_humanInformation_uuid_fkey";

-- DropForeignKey
ALTER TABLE "Employees" DROP CONSTRAINT "Employees_humanInformation_uuid_fkey";

-- AddForeignKey
ALTER TABLE "Authors" ADD CONSTRAINT "Authors_humanInformation_uuid_fkey" FOREIGN KEY ("humanInformation_uuid") REFERENCES "HumanInformations"("UUID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrowers" ADD CONSTRAINT "Borrowers_humanInformation_uuid_fkey" FOREIGN KEY ("humanInformation_uuid") REFERENCES "HumanInformations"("UUID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_humanInformation_uuid_fkey" FOREIGN KEY ("humanInformation_uuid") REFERENCES "HumanInformations"("UUID") ON DELETE CASCADE ON UPDATE CASCADE;
