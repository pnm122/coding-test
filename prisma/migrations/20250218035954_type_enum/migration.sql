/*
  Warnings:

  - Changed the type of `name` on the `Type` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TypeEnum" AS ENUM ('Cat', 'Dog', 'Turtle', 'Fish');

-- AlterTable
ALTER TABLE "Type" DROP COLUMN "name",
ADD COLUMN     "name" "TypeEnum" NOT NULL;
