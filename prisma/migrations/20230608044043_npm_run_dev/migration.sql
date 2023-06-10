/*
  Warnings:

  - You are about to drop the column `address` on the `Bistro` table. All the data in the column will be lost.
  - You are about to alter the column `osm_id` on the `Bistro` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Bistro` DROP COLUMN `address`,
    ADD COLUMN `amenity` VARCHAR(191) NULL,
    ADD COLUMN `city` VARCHAR(191) NULL,
    ADD COLUMN `country` VARCHAR(191) NULL,
    ADD COLUMN `house_number` VARCHAR(191) NULL,
    ADD COLUMN `road` VARCHAR(191) NULL,
    ADD COLUMN `state` VARCHAR(191) NULL,
    ADD COLUMN `suburb` VARCHAR(191) NULL,
    MODIFY `osm_id` VARCHAR(191) NULL,
    MODIFY `osm_type` VARCHAR(191) NULL,
    MODIFY `osm_display_name` VARCHAR(191) NULL,
    MODIFY `osm_lat` VARCHAR(191) NULL,
    MODIFY `osm_lon` VARCHAR(191) NULL;
