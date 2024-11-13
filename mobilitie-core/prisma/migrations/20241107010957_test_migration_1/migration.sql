-- CreateEnum
CREATE TYPE "TipoSede" AS ENUM ('SEDE_ATENCION', 'SEDE_PROGRAMA');

-- CreateTable
CREATE TABLE "horarios_direcciones_atencion" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(100) NOT NULL,
    "direccion" VARCHAR(255) NOT NULL,
    "tipo" "TipoSede" NOT NULL,

    CONSTRAINT "horarios_direcciones_atencion_pkey" PRIMARY KEY ("id")
);
