-- CreateTable
CREATE TABLE "info" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "contenido_info" TEXT NOT NULL,
    "image" TEXT,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateddAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "info_pkey" PRIMARY KEY ("id")
);
