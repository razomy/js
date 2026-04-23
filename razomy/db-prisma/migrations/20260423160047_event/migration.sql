-- 1. Создаем ядро логирования (с правильными $$ и SECURITY DEFINER)
CREATE OR REPLACE FUNCTION events_db.fn_core_log_event(
  p_entity_id uuid,
  p_entity_type events_db."DifferenceType",
  p_old_json jsonb,
  p_new_json jsonb,
  p_tg_op text
) RETURNS void AS
$$
DECLARE
  v_prev_event_id uuid;
  v_user_id       uuid;
  v_diff          jsonb;
BEGIN
  v_user_id := NULLIF(current_setting('app.current_user_id', true), '')::uuid;

  -- Ищем предыдущий коммит
  SELECT "eventId"
  INTO v_prev_event_id
  FROM events_db."Event"
  WHERE "entityId" = p_entity_id
  ORDER BY "createdAt" DESC
  LIMIT 1;

  IF (p_tg_op = 'INSERT') THEN
    INSERT INTO events_db."Event" ("entityId", "entityType", "differenceType", "difference", "userId", "previousId")
    VALUES (p_entity_id, p_entity_type, 'CREATED', p_new_json, v_user_id, v_prev_event_id);

  ELSIF (p_tg_op = 'UPDATE') THEN
    IF (p_old_json ->> 'deletedAt' IS NULL AND p_new_json ->> 'deletedAt' IS NOT NULL) THEN
      INSERT INTO events_db."Event" ("entityId", "entityType", "differenceType", "difference", "userId",
                                     "previousId")
      VALUES (p_entity_id, p_entity_type, 'DELETED', p_new_json, v_user_id, v_prev_event_id);

      -- Каскадное удаление Edge
      IF p_entity_type IN ('FS_NODE', 'USER') THEN
        UPDATE graphs_db."Edge"
        SET "deletedAt" = (p_new_json ->> 'deletedAt')::timestamp with time zone
        WHERE ("sourceId" = p_entity_id OR "targetId" = p_entity_id)
          AND "deletedAt" IS NULL;
      END IF;

      -- Каскадное удаление детей для папок
      IF p_entity_type = 'FS_NODE' THEN
        UPDATE fss_db."FsNode"
        SET "deletedAt" = (p_new_json ->> 'deletedAt')::timestamp with time zone
        WHERE p_entity_id = ANY ("ancestors")
          AND "deletedAt" IS NULL;
      END IF;

    ELSIF (p_old_json IS DISTINCT FROM p_new_json) THEN
      SELECT jsonb_object_agg(key, value)
      INTO v_diff
      FROM jsonb_each(p_new_json)
      WHERE p_new_json -> key <> p_old_json -> key
        AND key NOT IN ('updatedAt', 'deletedAt');

      IF v_diff IS NOT NULL THEN
        INSERT INTO events_db."Event" ("entityId", "entityType", "differenceType", "difference", "userId",
                                       "previousId")
        VALUES (p_entity_id, p_entity_type, 'UPDATED', v_diff, v_user_id, v_prev_event_id);
      END IF;
    END IF;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- 2. Создаем функции-обертки для каждой таблицы
CREATE OR REPLACE FUNCTION fss_db.fn_audit_fs_node() RETURNS TRIGGER AS
$$
BEGIN
  PERFORM events_db.fn_core_log_event(
    COALESCE(NEW."fsNodeId", OLD."fsNodeId"),
    'FS_NODE', to_jsonb(OLD), to_jsonb(NEW), TG_OP
          );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION acls_db.fn_audit_access_policy() RETURNS TRIGGER AS
$$
BEGIN
  PERFORM events_db.fn_core_log_event(
    COALESCE(NEW."accessPolicyId", OLD."accessPolicyId"),
    'ACL_ACCESS_POLICY', to_jsonb(OLD), to_jsonb(NEW), TG_OP
          );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION users_db.fn_audit_user() RETURNS TRIGGER AS
$$
BEGIN
  PERFORM events_db.fn_core_log_event(
    COALESCE(NEW."userId", OLD."userId"),
    'USER', to_jsonb(OLD), to_jsonb(NEW), TG_OP
          );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION graphs_db.fn_audit_edge() RETURNS TRIGGER AS
$$
BEGIN
  PERFORM events_db.fn_core_log_event(
    COALESCE(NEW."edgeId", OLD."edgeId"),
    'EDGE', to_jsonb(OLD), to_jsonb(NEW), TG_OP
          );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- 3. Вешаем триггеры
DROP TRIGGER IF EXISTS trg_fsnode_audit ON fss_db."FsNode";
CREATE TRIGGER trg_fsnode_audit
  AFTER INSERT OR UPDATE
  ON fss_db."FsNode"
  FOR EACH ROW
EXECUTE FUNCTION fss_db.fn_audit_fs_node();

DROP TRIGGER IF EXISTS trg_acl_audit ON acls_db."AccessPolicy";
CREATE TRIGGER trg_acl_audit
  AFTER INSERT OR UPDATE
  ON acls_db."AccessPolicy"
  FOR EACH ROW
EXECUTE FUNCTION acls_db.fn_audit_access_policy();

DROP TRIGGER IF EXISTS trg_user_audit ON users_db."User";
CREATE TRIGGER trg_user_audit
  AFTER INSERT OR UPDATE
  ON users_db."User"
  FOR EACH ROW
EXECUTE FUNCTION users_db.fn_audit_user();

DROP TRIGGER IF EXISTS trg_edge_audit ON graphs_db."Edge";
CREATE TRIGGER trg_edge_audit
  AFTER INSERT OR UPDATE
  ON graphs_db."Edge"
  FOR EACH ROW
EXECUTE FUNCTION graphs_db.fn_audit_edge();
