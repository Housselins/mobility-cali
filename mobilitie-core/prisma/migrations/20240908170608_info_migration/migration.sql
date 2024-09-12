/*
  Warnings:

  - Made the column `image` on table `info` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "info" ALTER COLUMN "image" SET NOT NULL;
