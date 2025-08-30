/*
  Warnings:

  - A unique constraint covering the columns `[judul]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Product_judul_key" ON "public"."Product"("judul");
