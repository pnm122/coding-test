/*
  Warnings:

  - A unique constraint covering the columns `[attribute]` on the table `Attribute` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Attribute_attribute_key" ON "Attribute"("attribute");
