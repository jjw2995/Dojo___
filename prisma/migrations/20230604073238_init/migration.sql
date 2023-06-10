-- CreateTable
CREATE TABLE `Bistro` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `osm_id` INTEGER UNSIGNED NOT NULL,
    `osm_type` VARCHAR(191) NOT NULL DEFAULT '',
    `osm_display_name` VARCHAR(191) NOT NULL DEFAULT '',
    `osm_lat` VARCHAR(191) NOT NULL DEFAULT '',
    `osm_lon` VARCHAR(191) NOT NULL DEFAULT '',
    `address` JSON NOT NULL,

    INDEX `Bistro_osm_type_osm_id_idx`(`osm_type`, `osm_id`),
    UNIQUE INDEX `Bistro_name_key`(`name`),
    FULLTEXT INDEX `Bistro_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PendingJoin` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `bistroId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `PendingJoin_bistroId_userId_key`(`bistroId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipForm` (
    `id` VARCHAR(191) NOT NULL,
    `bistroId` VARCHAR(191) NOT NULL,
    `formula` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tip` (
    `id` VARCHAR(191) NOT NULL,
    `tipFormId` VARCHAR(191) NOT NULL,
    `date` TIME NOT NULL,
    `total` DECIMAL(10, 2) NOT NULL,

    UNIQUE INDEX `Tip_date_tipFormId_key`(`date`, `tipFormId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BistroUser` (
    `id` VARCHAR(191) NOT NULL,
    `bistroId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `authority` ENUM('MODERATOR', 'USER') NOT NULL DEFAULT 'USER',

    UNIQUE INDEX `BistroUser_bistroId_userId_key`(`bistroId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BistroUserPosition` (
    `id` VARCHAR(191) NOT NULL,
    `tipPercent` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `bistroUserId` VARCHAR(191) NOT NULL,
    `positionId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `BistroUserPosition_bistroUserId_positionId_key`(`bistroUserId`, `positionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Position` (
    `id` VARCHAR(191) NOT NULL,
    `bistroId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `positionTipPercent` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `hourlyRateInCents` INTEGER NOT NULL,

    UNIQUE INDEX `Position_name_bistroId_key`(`name`, `bistroId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipContribution` (
    `id` VARCHAR(191) NOT NULL,
    `date` DATE NOT NULL,
    `tipPercent` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `positionTipPercent` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `hours` DECIMAL(4, 2) NOT NULL,
    `bistroUserPositionId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,

    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PendingJoin` ADD CONSTRAINT `PendingJoin_bistroId_fkey` FOREIGN KEY (`bistroId`) REFERENCES `Bistro`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PendingJoin` ADD CONSTRAINT `PendingJoin_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TipForm` ADD CONSTRAINT `TipForm_bistroId_fkey` FOREIGN KEY (`bistroId`) REFERENCES `Bistro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tip` ADD CONSTRAINT `Tip_tipFormId_fkey` FOREIGN KEY (`tipFormId`) REFERENCES `TipForm`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BistroUser` ADD CONSTRAINT `BistroUser_bistroId_fkey` FOREIGN KEY (`bistroId`) REFERENCES `Bistro`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BistroUser` ADD CONSTRAINT `BistroUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BistroUserPosition` ADD CONSTRAINT `BistroUserPosition_bistroUserId_fkey` FOREIGN KEY (`bistroUserId`) REFERENCES `BistroUser`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BistroUserPosition` ADD CONSTRAINT `BistroUserPosition_positionId_fkey` FOREIGN KEY (`positionId`) REFERENCES `Position`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Position` ADD CONSTRAINT `Position_bistroId_fkey` FOREIGN KEY (`bistroId`) REFERENCES `Bistro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TipContribution` ADD CONSTRAINT `TipContribution_bistroUserPositionId_fkey` FOREIGN KEY (`bistroUserPositionId`) REFERENCES `BistroUserPosition`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
