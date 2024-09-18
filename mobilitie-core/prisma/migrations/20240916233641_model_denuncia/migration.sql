-- CreateTable
CREATE TABLE "Denunciante" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "numeroIdentificacion" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,

    CONSTRAINT "Denunciante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Denuncia" (
    "id" SERIAL NOT NULL,
    "denuncianteId" INTEGER NOT NULL,
    "servidorInvolucrado" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "organismo" TEXT NOT NULL,
    "lugarHechos" TEXT NOT NULL,
    "fechaHechos" TIMESTAMP(3) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Denuncia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prueba" (
    "id" SERIAL NOT NULL,
    "denunciaId" INTEGER NOT NULL,
    "evidencia" TEXT,

    CONSTRAINT "Prueba_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testigo" (
    "id" SERIAL NOT NULL,
    "nombreCompleto" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "pruebaId" INTEGER NOT NULL,

    CONSTRAINT "Testigo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Denuncia" ADD CONSTRAINT "Denuncia_denuncianteId_fkey" FOREIGN KEY ("denuncianteId") REFERENCES "Denunciante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prueba" ADD CONSTRAINT "Prueba_denunciaId_fkey" FOREIGN KEY ("denunciaId") REFERENCES "Denuncia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testigo" ADD CONSTRAINT "Testigo_pruebaId_fkey" FOREIGN KEY ("pruebaId") REFERENCES "Prueba"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
