/*
  Warnings:

  - The values [Cat,Dog,Turtle,Fish] on the enum `ToyTypeEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ToyTypeEnum_new" AS ENUM ('Monkey', 'Elephant');
ALTER TYPE "ToyTypeEnum" RENAME TO "ToyTypeEnum_old";
ALTER TYPE "ToyTypeEnum_new" RENAME TO "ToyTypeEnum";
DROP TYPE "ToyTypeEnum_old";
COMMIT;
