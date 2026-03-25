-- AlterTable practice_areas: add slug column
ALTER TABLE "practice_areas" ADD COLUMN "slug" TEXT;
UPDATE "practice_areas" SET "slug" = id WHERE "slug" IS NULL;
ALTER TABLE "practice_areas" ALTER COLUMN "slug" SET NOT NULL;
CREATE UNIQUE INDEX "practice_areas_slug_key" ON "practice_areas"("slug");

-- AlterTable team_members: add slug column
ALTER TABLE "team_members" ADD COLUMN "slug" TEXT;
UPDATE "team_members" SET "slug" = id WHERE "slug" IS NULL;
ALTER TABLE "team_members" ALTER COLUMN "slug" SET NOT NULL;
CREATE UNIQUE INDEX "team_members_slug_key" ON "team_members"("slug");

-- AlterTable careers: add slug column
ALTER TABLE "careers" ADD COLUMN "slug" TEXT;
UPDATE "careers" SET "slug" = id WHERE "slug" IS NULL;
ALTER TABLE "careers" ALTER COLUMN "slug" SET NOT NULL;
CREATE UNIQUE INDEX "careers_slug_key" ON "careers"("slug");
