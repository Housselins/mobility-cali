/*
  Warnings:

  - Changed the type of `tipo` on the `horarios_direcciones_atencion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "horarios_direcciones_atencion" DROP COLUMN "tipo",
ADD COLUMN     "tipo" VARCHAR(255) NOT NULL;

-- DropEnum
DROP TYPE "TipoSede";
