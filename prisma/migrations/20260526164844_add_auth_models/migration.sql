/*
  Warnings:

  - Added the required column `mediaType` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "post" ADD COLUMN     "mediaType" "MediaType" NOT NULL;
