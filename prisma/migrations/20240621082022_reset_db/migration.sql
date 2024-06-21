/*
  Warnings:

  - You are about to drop the column `userId` on the `Subreddit` table. All the data in the column will be lost.
  - Added the required column `owner` to the `Subreddit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subreddit" DROP COLUMN "userId",
ADD COLUMN     "owner" TEXT NOT NULL;
