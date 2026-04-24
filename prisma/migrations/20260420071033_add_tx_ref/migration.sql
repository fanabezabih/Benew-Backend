/*
  Warnings:

  - A unique constraint covering the columns `[tx_ref]` on the table `Contribution` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tx_ref` to the `Contribution` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contribution" ADD COLUMN     "tx_ref" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Contribution_tx_ref_key" ON "Contribution"("tx_ref");
