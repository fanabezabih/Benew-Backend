-- AlterTable
ALTER TABLE "GiftItem" ADD COLUMN     "addedById" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "reservedByName" TEXT;

-- AddForeignKey
ALTER TABLE "GiftItem" ADD CONSTRAINT "GiftItem_addedById_fkey" FOREIGN KEY ("addedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
