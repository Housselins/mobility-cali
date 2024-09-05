/*
  Warnings:

  - You are about to drop the column `content` on the `New` table. All the data in the column will be lost.
  - Added the required column `contenido_noticia` to the `New` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "New" DROP COLUMN "content",
ADD COLUMN     "contenido_noticia" TEXT NOT NULL;
