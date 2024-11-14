-- CreateTable
CREATE TABLE "agremiaciones" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(250) NOT NULL,
    "direccion" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agremiaciones_pkey" PRIMARY KEY ("id")
);
