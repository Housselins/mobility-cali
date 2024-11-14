/*
  Warnings:

  - Added the required column `url` to the `entidades_relacionadas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "entidades_relacionadas" ADD COLUMN     "url" TEXT NOT NULL;
