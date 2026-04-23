-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "acls_db";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auths_db";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "events_db";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "fss_db";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "graphs_db";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "users_db";

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateEnum
CREATE TYPE "acls_db"."AccessLevel" AS ENUM ('DENIED', 'VIEWER', 'EDITOR', 'OWNER');

-- CreateEnum
CREATE TYPE "events_db"."DifferenceType" AS ENUM ('CREATED', 'UPDATED', 'DELETED');

-- CreateEnum
CREATE TYPE "fss_db"."FsNodeType" AS ENUM ('DIRECTORY', 'FILE_RN', 'FILE_STORAGE_URL', 'FILE_BINARY');

-- CreateEnum
CREATE TYPE "graphs_db"."EntityType" AS ENUM ('EDGE', 'ACL_ACCESS_POLICY', 'USER', 'FS_NODE', 'EVENT_LOG', 'AUTH_PROVIDER', 'AUTH_SESSION');

-- CreateTable
CREATE TABLE "acls_db"."AccessPolicy" (
                                        "accessPolicyId" UUID NOT NULL DEFAULT gen_random_uuid(),
                                        "resourceType" "graphs_db"."EntityType" NOT NULL,
                                        "resourceId" UUID NOT NULL,
                                        "subjectType" "graphs_db"."EntityType" NOT NULL,
                                        "subjectId" UUID NOT NULL,
                                        "accessLevel" "acls_db"."AccessLevel" NOT NULL,
                                        "expiresAt" TIMESTAMP(3),
                                        "deletedAt" TIMESTAMP(3),

                                        CONSTRAINT "AccessPolicy_pkey" PRIMARY KEY ("accessPolicyId")
);

-- CreateTable
CREATE TABLE "auths_db"."Provider" (
                                     "providerId" UUID NOT NULL DEFAULT gen_random_uuid(),
                                     "userId" UUID NOT NULL,
                                     "provider" TEXT NOT NULL,
                                     "providerAccountId" TEXT NOT NULL,
                                     "email" TEXT,
                                     "accessToken" TEXT,
                                     "refreshToken" TEXT,
                                     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                     "deletedAt" TIMESTAMP(3),

                                     CONSTRAINT "Provider_pkey" PRIMARY KEY ("providerId")
);

-- CreateTable
CREATE TABLE "auths_db"."Session" (
                                    "sessionId" UUID NOT NULL DEFAULT gen_random_uuid(),
                                    "userId" UUID NOT NULL,
                                    "sessionToken" TEXT NOT NULL,
                                    "expiresAt" TIMESTAMP(3) NOT NULL,
                                    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                    "deletedAt" TIMESTAMP(3),
                                    "userAgent" TEXT,

                                    CONSTRAINT "Session_pkey" PRIMARY KEY ("sessionId")
);

-- CreateTable
CREATE TABLE "events_db"."Event" (
                                   "eventId" UUID NOT NULL DEFAULT gen_random_uuid(),
                                   "entityType" "graphs_db"."EntityType" NOT NULL,
                                   "entityId" UUID NOT NULL,
                                   "differenceType" "events_db"."DifferenceType" NOT NULL,
                                   "difference" JSONB,
                                   "commitHash" TEXT NOT NULL DEFAULT encode(digest(gen_random_uuid()::text, 'sha256'), 'hex'),
                                   "previousId" UUID,
                                   "userId" UUID NOT NULL,
                                   "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                   "deletedAt" TIMESTAMP(3),

                                   CONSTRAINT "Event_pkey" PRIMARY KEY ("eventId")
);

-- CreateTable
CREATE TABLE "fss_db"."FsNode" (
                                 "fsNodeId" UUID NOT NULL DEFAULT gen_random_uuid(),
                                 "fsNodeType" "fss_db"."FsNodeType" NOT NULL,
                                 "name" VARCHAR(255) NOT NULL,
                                 "contentJson" JSONB,
                                 "contentBinary" BYTEA,
                                 "parentId" UUID,
                                 "ancestors" UUID[],
                                 "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                 "updatedAt" TIMESTAMP(3) NOT NULL,
                                 "deletedAt" TIMESTAMP(3),

                                 CONSTRAINT "FsNode_pkey" PRIMARY KEY ("fsNodeId")
);

-- CreateTable
CREATE TABLE "graphs_db"."Edge" (
                                  "edgeId" UUID NOT NULL DEFAULT gen_random_uuid(),
                                  "sourceType" "graphs_db"."EntityType" NOT NULL,
                                  "sourceId" UUID NOT NULL,
                                  "targetType" "graphs_db"."EntityType" NOT NULL,
                                  "targetId" UUID NOT NULL,
                                  "relation" VARCHAR(50) NOT NULL,
                                  "metadata" JSONB,
                                  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                  "deletedAt" TIMESTAMP(3),

                                  CONSTRAINT "Edge_pkey" PRIMARY KEY ("edgeId")
);

-- CreateTable
CREATE TABLE "users_db"."User" (
                                 "userId" UUID NOT NULL DEFAULT gen_random_uuid(),
                                 "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                 "updatedAt" TIMESTAMP(3) NOT NULL,
                                 "deletedAt" TIMESTAMP(3),

                                 CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "users_db"."Profile" (
                                    "profileId" UUID NOT NULL DEFAULT gen_random_uuid(),
                                    "userId" UUID NOT NULL,
                                    "name" TEXT,
                                    "avatar" TEXT,
                                    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                    "updatedAt" TIMESTAMP(3) NOT NULL,

                                    CONSTRAINT "Profile_pkey" PRIMARY KEY ("profileId")
);

-- CreateIndex
CREATE INDEX "AccessPolicy_subjectId_idx" ON "acls_db"."AccessPolicy"("subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "AccessPolicy_resourceId_subjectId_key" ON "acls_db"."AccessPolicy"("resourceId", "subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "Provider_provider_providerAccountId_key" ON "auths_db"."Provider"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "auths_db"."Session"("sessionToken");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "auths_db"."Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Event_commitHash_key" ON "events_db"."Event"("commitHash");

-- CreateIndex
CREATE UNIQUE INDEX "Event_previousId_key" ON "events_db"."Event"("previousId");

-- CreateIndex
CREATE INDEX "Event_entityId_createdAt_idx" ON "events_db"."Event"("entityId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "Event_createdAt_idx" ON "events_db"."Event"("createdAt");

-- CreateIndex
CREATE INDEX "FsNode_ancestors_idx" ON "fss_db"."FsNode" USING GIN ("ancestors");

-- CreateIndex
CREATE INDEX "FsNode_contentJson_idx" ON "fss_db"."FsNode" USING GIN ("contentJson");

-- CreateIndex
CREATE UNIQUE INDEX "FsNode_name_parentId_key" ON "fss_db"."FsNode"("name", "parentId");

-- CreateIndex
CREATE INDEX "Edge_sourceType_sourceId_relation_idx" ON "graphs_db"."Edge"("sourceType", "sourceId", "relation");

-- CreateIndex
CREATE INDEX "Edge_targetType_targetId_relation_idx" ON "graphs_db"."Edge"("targetType", "targetId", "relation");

-- CreateIndex
CREATE INDEX "Edge_metadata_idx" ON "graphs_db"."Edge" USING GIN ("metadata");

-- CreateIndex
CREATE UNIQUE INDEX "Edge_sourceId_targetId_relation_key" ON "graphs_db"."Edge"("sourceId", "targetId", "relation");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "users_db"."Profile"("userId");

-- AddForeignKey
ALTER TABLE "auths_db"."Provider" ADD CONSTRAINT "Provider_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users_db"."User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auths_db"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users_db"."User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events_db"."Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users_db"."User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_db"."Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users_db"."User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
