/*
  Warnings:

  - Added the required column `ciudad` to the `Pqrs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departamento` to the `Pqrs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Pqrs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pais` to the `Pqrs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pqrs" ADD COLUMN     "ciudad" TEXT NOT NULL,
ADD COLUMN     "departamento" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "pais" TEXT NOT NULL;
