/*
  Warnings:

  - The `date_of_realize_questionary` column on the `RealizeQuestionary` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `RealizeQuestionary` DROP COLUMN `date_of_realize_questionary`,
    ADD COLUMN `date_of_realize_questionary` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
