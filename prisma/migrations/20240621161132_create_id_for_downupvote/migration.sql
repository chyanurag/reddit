/*
  Warnings:

  - The primary key for the `Downvote` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Downvote` table. All the data in the column will be lost.
  - The primary key for the `Upvote` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Upvote` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Downvote" DROP CONSTRAINT "Downvote_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Downvote_pkey" PRIMARY KEY ("postId", "userId");

-- AlterTable
ALTER TABLE "Upvote" DROP CONSTRAINT "Upvote_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Upvote_pkey" PRIMARY KEY ("postId", "userId");
