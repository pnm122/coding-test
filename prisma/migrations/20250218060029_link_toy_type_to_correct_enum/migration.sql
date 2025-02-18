/*
  Warnings:

  - Changed the type of `name` on the `ToyType` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ToyType" DROP COLUMN "name",
ADD COLUMN     "name" "ToyTypeEnum" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ToyType_name_key" ON "ToyType"("name");
