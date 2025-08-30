-- CreateTable
CREATE TABLE "public"."Product" (
    "id" SERIAL NOT NULL,
    "judul" VARCHAR(255) NOT NULL,
    "pengarang" TEXT NOT NULL,
    "penerbit" TEXT NOT NULL,
    "tahunTerbit" INTEGER NOT NULL,
    "gambar" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Product_judul_idx" ON "public"."Product"("judul");
