/*
  Warnings:

  - You are about to drop the column `likelihood` on the `Assessment` table. All the data in the column will be lost.
  - You are about to drop the column `severity` on the `Assessment` table. All the data in the column will be lost.
  - Added the required column `control` to the `Assessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `procedure` to the `Assessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `response` to the `Assessment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Assessment` DROP COLUMN `likelihood`,
    DROP COLUMN `severity`,
    ADD COLUMN `control` INTEGER NOT NULL,
    ADD COLUMN `procedure` VARCHAR(191) NOT NULL,
    ADD COLUMN `response` VARCHAR(191) NOT NULL;
