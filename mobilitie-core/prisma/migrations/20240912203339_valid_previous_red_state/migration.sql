/*
  Warnings:

  - Made the column `image` on table `SocialMediaAudit` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SocialMediaAudit" ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "isEnabled" DROP DEFAULT,
ALTER COLUMN "isEnabled" SET DATA TYPE TEXT;
