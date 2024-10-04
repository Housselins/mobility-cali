-- CreateTable
CREATE TABLE "Footer" (
    "id" SERIAL NOT NULL,
    "nombreColumna" TEXT NOT NULL,

    CONSTRAINT "Footer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inFooter" (
    "id" SERIAL NOT NULL,
    "texto" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "fkIdFooter" INTEGER NOT NULL,

    CONSTRAINT "inFooter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "inFooter" ADD CONSTRAINT "inFooter_fkIdFooter_fkey" FOREIGN KEY ("fkIdFooter") REFERENCES "Footer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
