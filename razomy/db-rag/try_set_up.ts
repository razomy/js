import neo4j from 'neo4j-driver';

const vectorDimensions = 768;

export async function trySetUp(db) {
  const session = db.session();
  try {
    // We DO NOT drop the index here.
    // IF NOT EXISTS handles the "check and skip" logic natively.
    await session.run(
      `
      CREATE VECTOR INDEX code_embeddings IF NOT EXISTS
      FOR (c:CodeChunk) ON (c.embedding)
      OPTIONS { indexConfig: {
        \`vector.dimensions\`: $dimensions,
        \`vector.similarity_function\`: 'cosine'
      }}
    `,
      {
        dimensions: neo4j.int(vectorDimensions),
      },
    );

    // IF NOT EXISTS ensures these are skipped if they are already created
    await session.run(`CREATE CONSTRAINT repo_name IF NOT EXISTS FOR (r:Repository) REQUIRE r.name IS UNIQUE;`);
    await session.run(`CREATE CONSTRAINT file_path IF NOT EXISTS FOR (f:File) REQUIRE f.path IS UNIQUE;`);
    await session.run(`CREATE CONSTRAINT chunk_id IF NOT EXISTS FOR (c:CodeChunk) REQUIRE c.id IS UNIQUE;`);

    console.log(`✅ База данных проверена: индексы и констрейнты существуют или успешно созданы.`);
  } catch (error) {
    console.error('⚠️ Ошибка при проверке/создании схемы БД:', error);
    throw error;
  } finally {
    await session.close();
  }
}
