/*
  Warnings:

  - Added the required column `alt` to the `Banner` table without a default value. This is not possible if the table is not empty.
  - Made the column `image` on table `Banner` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Banner" ADD COLUMN     "alt" TEXT NOT NULL,
ALTER COLUMN "image" SET NOT NULL;
