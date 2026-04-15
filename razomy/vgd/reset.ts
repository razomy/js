export async function reset(db) {
  const session = db.session();
  await session.run(`DROP INDEX code_embeddings IF EXISTS`);
  await session.run(`DROP CONSTRAINT repo_name IF EXISTS`);
  await session.run(`DROP CONSTRAINT file_path IF EXISTS`);
  await session.run(`DROP CONSTRAINT chunk_id IF EXISTS`);
  await session.run(`MATCH (n) DETACH DELETE n;`);
  await session.close();
}
