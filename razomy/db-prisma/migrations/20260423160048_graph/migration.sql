CREATE OR REPLACE FUNCTION fss_db.prevent_fsnode_cycles() RETURNS TRIGGER AS $$
BEGIN
  -- Если новый ID родителя уже есть в нашем массиве предков — это цикл!
  IF NEW."parentId" = ANY(OLD."ancestors") THEN
    RAISE EXCEPTION 'Cycle detected: Node % cannot be a child of its own descendant %', NEW."fsNodeId", NEW."parentId";
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_prevent_cycles
  BEFORE UPDATE OF "parentId" ON fss_db."FsNode"
  FOR EACH ROW EXECUTE FUNCTION fss_db.prevent_fsnode_cycles();

