/*
  Warnings:

  - You are about to drop the `Type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Type_Attribute` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `product` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_id` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_id` to the `Toy` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductEnum" AS ENUM ('Pet', 'Toy');

-- CreateEnum
CREATE TYPE "PetTypeEnum" AS ENUM ('Cat', 'Dog', 'Turtle', 'Fish');

-- CreateEnum
CREATE TYPE "ToyTypeEnum" AS ENUM ('Cat', 'Dog', 'Turtle', 'Fish');

-- DropForeignKey
ALTER TABLE "Animal" DROP CONSTRAINT "Animal_type_id_fkey";

-- DropForeignKey
ALTER TABLE "Type_Attribute" DROP CONSTRAINT "Type_Attribute_attribute_id_fkey";

-- DropForeignKey
ALTER TABLE "Type_Attribute" DROP CONSTRAINT "Type_Attribute_type_id_fkey";

-- AlterTable
ALTER TABLE "Animal" ADD COLUMN     "product" "ProductEnum" NOT NULL;

-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "type_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Toy" ADD COLUMN     "type_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Type";

-- DropTable
DROP TABLE "Type_Attribute";

-- DropEnum
DROP TYPE "TypeEnum";

-- CreateTable
CREATE TABLE "PetType" (
    "id" SERIAL NOT NULL,
    "name" "PetTypeEnum" NOT NULL,

    CONSTRAINT "PetType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ToyType" (
    "id" SERIAL NOT NULL,
    "name" "PetTypeEnum" NOT NULL,

    CONSTRAINT "ToyType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetType_Attribute" (
    "id" SERIAL NOT NULL,
    "type_id" INTEGER NOT NULL,
    "attribute_id" INTEGER NOT NULL,

    CONSTRAINT "PetType_Attribute_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PetType_name_key" ON "PetType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ToyType_name_key" ON "ToyType"("name");

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "PetType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Toy" ADD CONSTRAINT "Toy_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "ToyType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetType_Attribute" ADD CONSTRAINT "PetType_Attribute_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "PetType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetType_Attribute" ADD CONSTRAINT "PetType_Attribute_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "Attribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
