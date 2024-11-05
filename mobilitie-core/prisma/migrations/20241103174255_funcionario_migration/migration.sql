-- CreateTable
CREATE TABLE "funcionario" (
    "id" SERIAL NOT NULL,
    "direccion" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "funcionario_pkey" PRIMARY KEY ("id")
);
