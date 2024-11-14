/*
  Warnings:

  - Added the required column `pertenece` to the `horarios_direcciones_atencion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "horarios_direcciones_atencion" ADD COLUMN     "pertenece" VARCHAR(150) NOT NULL;
