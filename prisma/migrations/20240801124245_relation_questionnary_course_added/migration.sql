-- AlterTable
ALTER TABLE `Course` ADD COLUMN `difficulty` VARCHAR(191) NOT NULL DEFAULT 'Facile';

-- AlterTable
ALTER TABLE `Questionary` ADD COLUMN `courseId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Questionary` ADD CONSTRAINT `Questionary_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
