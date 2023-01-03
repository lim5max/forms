/*
  Warnings:

  - Added the required column `pollId` to the `AnonymousUserAnwer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AnonymousUserAnwer" ADD COLUMN     "pollId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "AnonymousUserAnwer" ADD CONSTRAINT "AnonymousUserAnwer_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "polls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
