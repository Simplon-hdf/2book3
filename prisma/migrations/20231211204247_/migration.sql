-- CreateTable
CREATE TABLE "HumanInformations" (
    "UUID" TEXT NOT NULL,
    "first_name" VARCHAR(20) NOT NULL,
    "last_name" VARCHAR(30) NOT NULL,

    CONSTRAINT "HumanInformations_pkey" PRIMARY KEY ("UUID")
);

-- CreateTable
CREATE TABLE "Authors" (
    "UUID" TEXT NOT NULL,
    "humanInformationId" TEXT NOT NULL,

    CONSTRAINT "Authors_pkey" PRIMARY KEY ("UUID")
);

-- CreateTable
CREATE TABLE "Borrowers" (
    "UUID" TEXT NOT NULL,
    "humanInformationId" TEXT NOT NULL,

    CONSTRAINT "Borrowers_pkey" PRIMARY KEY ("UUID")
);

-- CreateTable
CREATE TABLE "Employees" (
    "UUID" TEXT NOT NULL,
    "mail_address" VARCHAR(80) NOT NULL,
    "password" VARCHAR(72) NOT NULL,
    "humanInformationId" TEXT NOT NULL,

    CONSTRAINT "Employees_pkey" PRIMARY KEY ("UUID")
);

-- CreateTable
CREATE TABLE "Books" (
    "UUID" TEXT NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "description" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "borrowId" TEXT,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("UUID")
);

-- CreateTable
CREATE TABLE "Borrows" (
    "UUID" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "employeeId" TEXT NOT NULL,
    "borrowerId" TEXT NOT NULL,

    CONSTRAINT "Borrows_pkey" PRIMARY KEY ("UUID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Authors_humanInformationId_key" ON "Authors"("humanInformationId");

-- CreateIndex
CREATE UNIQUE INDEX "Borrowers_humanInformationId_key" ON "Borrowers"("humanInformationId");

-- CreateIndex
CREATE UNIQUE INDEX "Employees_humanInformationId_key" ON "Employees"("humanInformationId");

-- AddForeignKey
ALTER TABLE "Authors" ADD CONSTRAINT "Authors_humanInformationId_fkey" FOREIGN KEY ("humanInformationId") REFERENCES "HumanInformations"("UUID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrowers" ADD CONSTRAINT "Borrowers_humanInformationId_fkey" FOREIGN KEY ("humanInformationId") REFERENCES "HumanInformations"("UUID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_humanInformationId_fkey" FOREIGN KEY ("humanInformationId") REFERENCES "HumanInformations"("UUID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Authors"("UUID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_borrowId_fkey" FOREIGN KEY ("borrowId") REFERENCES "Borrows"("UUID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrows" ADD CONSTRAINT "Borrows_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employees"("UUID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrows" ADD CONSTRAINT "Borrows_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "Borrowers"("UUID") ON DELETE RESTRICT ON UPDATE CASCADE;
