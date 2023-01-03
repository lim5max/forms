/*
  Warnings:

  - The `userAnswer` column on the `AnonymousUserAnwer` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "AnonymousUserAnwer" DROP COLUMN "userAnswer",
ADD COLUMN     "userAnswer" TEXT[];
