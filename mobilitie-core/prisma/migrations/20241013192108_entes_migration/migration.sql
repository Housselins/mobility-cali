/*
  Warnings:

  - You are about to drop the column `updateddAt` on the `ente` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `ente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ente" DROP COLUMN "updateddAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
