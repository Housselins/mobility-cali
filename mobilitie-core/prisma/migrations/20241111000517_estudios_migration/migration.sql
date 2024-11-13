-- CreateTable
CREATE TABLE "estudios" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(250) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "estudios_pkey" PRIMARY KEY ("id")
);
