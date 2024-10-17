/*
  Warnings:

  - Added the required column `url` to the `ente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ente" ADD COLUMN     "url" TEXT NOT NULL;
