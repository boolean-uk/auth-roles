/*
  Warnings:

  - Made the column `permission` on table `Permission` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Permission" ALTER COLUMN "role" DROP DEFAULT,
ALTER COLUMN "permission" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
