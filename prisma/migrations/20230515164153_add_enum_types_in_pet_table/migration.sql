/*
  Warnings:

  - Changed the type of `age` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `size` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `independence_level` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `environment_type` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AnimalSize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "IndependenceLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "EnvironmentType" AS ENUM ('INDOOR', 'OUTDOOR', 'SPACIOUS');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "age",
ADD COLUMN     "age" INTEGER NOT NULL,
DROP COLUMN "size",
ADD COLUMN     "size" "AnimalSize" NOT NULL,
DROP COLUMN "independence_level",
ADD COLUMN     "independence_level" "IndependenceLevel" NOT NULL,
DROP COLUMN "environment_type",
ADD COLUMN     "environment_type" "EnvironmentType" NOT NULL;
