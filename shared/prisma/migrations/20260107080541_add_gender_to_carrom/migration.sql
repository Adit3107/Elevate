/*
  Warnings:

  - Added the required column `gender` to the `CarromTeam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CarromTeam" ADD COLUMN     "gender" TEXT NOT NULL;
