-- CreateTable
CREATE TABLE `SequenceArticle` (
    `id` VARCHAR(191) NOT NULL,
    `index` INTEGER NOT NULL,
    `title` TEXT NOT NULL,
    `containt` TEXT NOT NULL,
    `img` TEXT NULL,
    `article_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `SequenceArticle_index_key`(`index`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SequenceArticle` ADD CONSTRAINT `SequenceArticle_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `Article`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
