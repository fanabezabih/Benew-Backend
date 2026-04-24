/*
  Warnings:

  - Made the column `quantity` on table `GiftItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `goalAmount` on table `Registry` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "GiftItem" DROP CONSTRAINT "GiftItem_registryId_fkey";

-- AlterTable
ALTER TABLE "GiftItem" ADD COLUMN     "isReserved" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "quantity" SET NOT NULL,
ALTER COLUMN "quantity" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Registry" ADD COLUMN     "coverImage" TEXT,
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "occasion" TEXT,
ALTER COLUMN "goalAmount" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "GiftItem" ADD CONSTRAINT "GiftItem_registryId_fkey" FOREIGN KEY ("registryId") REFERENCES "Registry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
