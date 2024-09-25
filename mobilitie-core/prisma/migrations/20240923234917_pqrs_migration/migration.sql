-- CreateTable
CREATE TABLE "Pqrs" (
    "id" SERIAL NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "identificacion" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "tipoSolicitud" TEXT NOT NULL,
    "contenidoSolicitud" TEXT NOT NULL,
    "dependencia" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pqrs_pkey" PRIMARY KEY ("id")
);
