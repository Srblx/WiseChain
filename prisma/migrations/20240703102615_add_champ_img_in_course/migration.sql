/*
  Warnings:

  - Added the required column `img` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Course` ADD COLUMN `img` VARCHAR(191) NOT NULL;
