/*
  Warnings:

  - The required column `id` was added to the `Downvote` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Upvote` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Downvote" ADD COLUMN     "id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Upvote" ADD COLUMN     "id" TEXT NOT NULL;
