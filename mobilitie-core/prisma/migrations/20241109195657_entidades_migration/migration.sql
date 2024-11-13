-- CreateTable
CREATE TABLE "entidades_relacionadas" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(250) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "entidades_relacionadas_pkey" PRIMARY KEY ("id")
);
