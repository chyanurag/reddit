-- CreateTable
CREATE TABLE "Downvote" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Downvote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Downvote" ADD CONSTRAINT "Downvote_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
