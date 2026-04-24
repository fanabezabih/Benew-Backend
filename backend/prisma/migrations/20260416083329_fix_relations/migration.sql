/*
  Warnings:

  - You are about to drop the column `contributorName` on the `Contribution` table. All the data in the column will be lost.
  - You are about to drop the column `paymentStatus` on the `Contribution` table. All the data in the column will be lost.
  - You are about to drop the column `tx_ref` on the `Contribution` table. All the data in the column will be lost.
  - You are about to drop the column `isGroup` on the `GiftItem` table. All the data in the column will be lost.
  - You are about to drop the column `coverImage` on the `Registry` table. All the data in the column will be lost.
  - You are about to drop the column `eventDate` on the `Registry` table. All the data in the column will be lost.
  - You are about to drop the column `isPrivate` on the `Registry` table. All the data in the column will be lost.
  - You are about to drop the column `occasion` on the `Registry` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Registry` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Registry" DROP CONSTRAINT "Registry_ownerId_fkey";

-- DropIndex
DROP INDEX "Contribution_tx_ref_key";

-- AlterTable
ALTER TABLE "Contribution" DROP COLUMN "contributorName",
DROP COLUMN "paymentStatus",
DROP COLUMN "tx_ref",
ADD COLUMN     "giftItemId" TEXT,
ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "GiftItem" DROP COLUMN "isGroup",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Registry" DROP COLUMN "coverImage",
DROP COLUMN "eventDate",
DROP COLUMN "isPrivate",
DROP COLUMN "occasion",
DROP COLUMN "ownerId",
ADD COLUMN     "description" TEXT;

-- DropTable
DROP TABLE "User";

-- AddForeignKey
ALTER TABLE "Contribution" ADD CONSTRAINT "Contribution_giftItemId_fkey" FOREIGN KEY ("giftItemId") REFERENCES "GiftItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
