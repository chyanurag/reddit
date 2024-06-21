/*
  Warnings:

  - The primary key for the `SubredditMember` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `SubredditMember` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SubredditMember" DROP CONSTRAINT "SubredditMember_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "SubredditMember_pkey" PRIMARY KEY ("subredditId", "userId");
