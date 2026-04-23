---------------------------------------------------------------------
-- 1. FSS_DB: Файлы и Папки (FsNode)
---------------------------------------------------------------------
ALTER TABLE fss_db."FsNode"
  ENABLE ROW LEVEL SECURITY;

-- Чтение: если есть доступ к ноде или предкам (VIEWER+)
CREATE POLICY fsnode_select_policy ON fss_db."FsNode" FOR SELECT USING (
  EXISTS (SELECT 1
          FROM acls_db."AccessPolicy" ap
          WHERE ap."subjectId" = NULLIF(current_setting('app.current_user_id', true), '')::uuid
            AND (ap."resourceId" = "FsNode"."fsNodeId" OR ap."resourceId" = ANY ("FsNode".ancestors))
            AND ap."accessLevel" >= 'VIEWER'::acls_db."AccessLevel"
            AND ap."deletedAt" IS NULL)
  );

-- Обновление: если есть доступ к ноде или предкам (EDITOR+)
CREATE POLICY fsnode_update_policy ON fss_db."FsNode" FOR UPDATE USING (
  EXISTS (SELECT 1
          FROM acls_db."AccessPolicy" ap
          WHERE ap."subjectId" = NULLIF(current_setting('app.current_user_id', true), '')::uuid
            AND (ap."resourceId" = "FsNode"."fsNodeId" OR ap."resourceId" = ANY ("FsNode".ancestors))
            AND ap."accessLevel" >= 'EDITOR'::acls_db."AccessLevel"
            AND ap."deletedAt" IS NULL)
  );

-- Удаление: заблокировано для всех
CREATE POLICY fsnode_delete_policy ON fss_db."FsNode" FOR DELETE USING (false);


---------------------------------------------------------------------
-- 2. GRAPHS_DB: Графы (Edge)
---------------------------------------------------------------------
ALTER TABLE graphs_db."Edge"
  ENABLE ROW LEVEL SECURITY;

-- Чтение: доступ к ребру, источнику или цели (VIEWER+)
CREATE POLICY edge_select_policy ON graphs_db."Edge" FOR SELECT USING (
  EXISTS (SELECT 1
          FROM acls_db."AccessPolicy" ap
          WHERE ap."subjectId" = NULLIF(current_setting('app.current_user_id', true), '')::uuid
            AND (ap."resourceId" = "Edge"."edgeId" OR ap."resourceId" = "Edge"."sourceId" OR
                 ap."resourceId" = "Edge"."targetId")
            AND ap."accessLevel" >= 'VIEWER'::acls_db."AccessLevel"
            AND ap."deletedAt" IS NULL)
  );

-- Обновление: доступ к ребру (EDITOR+)
CREATE POLICY edge_update_policy ON graphs_db."Edge" FOR UPDATE USING (
  EXISTS (SELECT 1
          FROM acls_db."AccessPolicy" ap
          WHERE ap."subjectId" = NULLIF(current_setting('app.current_user_id', true), '')::uuid
            AND ap."resourceId" = "Edge"."edgeId"
            AND ap."accessLevel" >= 'EDITOR'::acls_db."AccessLevel"
            AND ap."deletedAt" IS NULL)
  );

-- Удаление: заблокировано
CREATE POLICY edge_delete_policy ON graphs_db."Edge" FOR DELETE USING (false);


---------------------------------------------------------------------
-- 3. EVENTS_DB: События (Event)
---------------------------------------------------------------------
ALTER TABLE events_db."Event"
  ENABLE ROW LEVEL SECURITY;

-- Чтение: если есть доступ к сущности, к которой относится событие
CREATE POLICY event_select_policy ON events_db."Event" FOR SELECT USING (
  EXISTS (SELECT 1
          FROM acls_db."AccessPolicy" ap
          WHERE ap."subjectId" = NULLIF(current_setting('app.current_user_id', true), '')::uuid
            AND ap."resourceId" = "Event"."entityId"
            AND ap."accessLevel" >= 'VIEWER'::acls_db."AccessLevel"
            AND ap."deletedAt" IS NULL)
  );

-- Обновление: обычно логи неизменяемы, но по запросу (EDITOR+)
-- Удаление: заблокировано
CREATE POLICY event_insert_policy ON events_db."Event" FOR INSERT WITH CHECK (false);
CREATE POLICY event_update_policy ON events_db."Event" FOR UPDATE USING (false);
CREATE POLICY event_delete_policy ON events_db."Event" FOR DELETE USING (false);


---------------------------------------------------------------------
-- 4. USERS_DB: Пользователи (User)
---------------------------------------------------------------------
ALTER TABLE users_db."User"
  ENABLE ROW LEVEL SECURITY;

-- Чтение: сам себя или по ACL (VIEWER+)
CREATE POLICY user_select_policy ON users_db."User" FOR SELECT USING (
  "userId" = NULLIF(current_setting('app.current_user_id', true), '')::uuid
    OR EXISTS (SELECT 1
               FROM acls_db."AccessPolicy" ap
               WHERE ap."subjectId" = NULLIF(current_setting('app.current_user_id', true), '')::uuid
                 AND ap."resourceId" = "User"."userId"
                 AND ap."accessLevel" >= 'VIEWER'::acls_db."AccessLevel"
                 AND ap."deletedAt" IS NULL)
  );

-- Обновление: сам себя или по ACL (EDITOR+)
CREATE POLICY user_update_policy ON users_db."User" FOR UPDATE USING (
  "userId" = NULLIF(current_setting('app.current_user_id', true), '')::uuid
    OR EXISTS (SELECT 1
               FROM acls_db."AccessPolicy" ap
               WHERE ap."subjectId" = NULLIF(current_setting('app.current_user_id', true), '')::uuid
                 AND ap."resourceId" = "User"."userId"
                 AND ap."accessLevel" >= 'EDITOR'::acls_db."AccessLevel"
                 AND ap."deletedAt" IS NULL)
  );

-- Удаление: заблокировано
CREATE POLICY user_delete_policy ON users_db."User" FOR DELETE USING (false);


---------------------------------------------------------------------
-- 5. AUTHS_DB: Провайдеры и Сессии
---------------------------------------------------------------------
-- Provider
ALTER TABLE auths_db."Provider"
  ENABLE ROW LEVEL SECURITY;
CREATE POLICY provider_select_policy ON auths_db."Provider" FOR SELECT USING ("userId" =
                                                                              NULLIF(current_setting('app.current_user_id', true), '')::uuid);
CREATE POLICY provider_update_policy ON auths_db."Provider" FOR UPDATE USING ("userId" =
                                                                              NULLIF(current_setting('app.current_user_id', true), '')::uuid);
CREATE POLICY provider_delete_policy ON auths_db."Provider" FOR DELETE USING (false);

-- Session
ALTER TABLE auths_db."Session"
  ENABLE ROW LEVEL SECURITY;
CREATE POLICY session_select_policy ON auths_db."Session" FOR SELECT USING ("userId" =
                                                                            NULLIF(current_setting('app.current_user_id', true), '')::uuid);
CREATE POLICY session_update_policy ON auths_db."Session" FOR UPDATE USING ("userId" =
                                                                            NULLIF(current_setting('app.current_user_id', true), '')::uuid);
CREATE POLICY session_delete_policy ON auths_db."Session" FOR DELETE USING (false);


---------------------------------------------------------------------
-- 6. ACLS_DB: Права доступа (AccessPolicy)
---------------------------------------------------------------------
ALTER TABLE acls_db."AccessPolicy"
  ENABLE ROW LEVEL SECURITY;

-- Чтение: свои права или права на ресурс, где ты EDITOR+
CREATE POLICY accesspolicy_select_policy ON acls_db."AccessPolicy" FOR SELECT USING (
  "subjectId" = NULLIF(current_setting('app.current_user_id', true), '')::uuid
    OR EXISTS (SELECT 1
               FROM acls_db."AccessPolicy" ap
               WHERE ap."subjectId" = NULLIF(current_setting('app.current_user_id', true), '')::uuid
                 AND ap."resourceId" = "AccessPolicy"."resourceId"
                 AND ap."accessLevel" >= 'EDITOR'::acls_db."AccessLevel"
                 AND ap."deletedAt" IS NULL)
  );

CREATE POLICY accesspolicy_insert_policy ON acls_db."AccessPolicy" FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM acls_db."AccessPolicy" ap
    WHERE ap."subjectId" = NULLIF(current_setting('app.current_user_id', true), '')::uuid
      AND ap."resourceId" = "AccessPolicy"."resourceId" -- Ресурс, к которому дают доступ
      AND ap."accessLevel" >= 'OWNER'::acls_db."AccessLevel" -- Только Владелец может раздавать права!
      AND ap."deletedAt" IS NULL
  )
);

-- Обновление: только если ты EDITOR+ этого ресурса
CREATE POLICY accesspolicy_update_policy ON acls_db."AccessPolicy" FOR UPDATE USING (
  EXISTS (SELECT 1
          FROM acls_db."AccessPolicy" ap
          WHERE ap."subjectId" = NULLIF(current_setting('app.current_user_id', true), '')::uuid
            AND ap."resourceId" = "AccessPolicy"."resourceId"
            AND ap."accessLevel" >= 'EDITOR'::acls_db."AccessLevel"
            AND ap."deletedAt" IS NULL)
  );

-- Удаление: заблокировано (даже для админа ресурса, если следовать правилу "всем")
CREATE POLICY accesspolicy_delete_policy ON acls_db."AccessPolicy" FOR DELETE USING (false);
