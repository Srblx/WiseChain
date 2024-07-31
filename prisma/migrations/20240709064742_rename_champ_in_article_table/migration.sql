/*
  Warnings:

  - You are about to drop the column `content` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `cover_img` on the `Article` table. All the data in the column will be lost.
  - Added the required column `summary` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Made the column `img` on table `Article` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Article` DROP COLUMN `content`,
    DROP COLUMN `cover_img`,
    ADD COLUMN `summary` TEXT NOT NULL,
    MODIFY `img` VARCHAR(191) NOT NULL;
