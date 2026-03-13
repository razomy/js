import neo4j from 'neo4j-driver';

const vectorDimensions = 768;

export async function setup(db) {
  const session = db.session();
  try {
    // 1. На всякий случай удаляем старый индекс, чтобы не было конфликтов
    await session.run(`DROP INDEX code_embeddings IF EXISTS`);

    // 2. Создаем новый, оборачивая число в neo4j.int()
    await session.run(`
      CREATE VECTOR INDEX code_embeddings IF NOT EXISTS
      FOR (c:CodeChunk) ON (c.embedding)
      OPTIONS { indexConfig: {
        \`vector.dimensions\`: $dimensions,
        \`vector.similarity_function\`: 'cosine'
      }}
    `, {
      // Вот здесь магия: заставляем JS передать целое число!
      dimensions: neo4j.int(vectorDimensions)
    });

    await session.run(`

        // 1. Быстрый поиск репозитория
        CREATE CONSTRAINT repo_name IF NOT EXISTS FOR (r:Repository) REQUIRE r.name IS UNIQUE;
       `);
    await session.run(`
// 2. Быстрый поиск файлов (чтобы не плодить дубликаты и мгновенно делать MERGE)
        CREATE CONSTRAINT file_path IF NOT EXISTS FOR (f:File) REQUIRE f.path IS UNIQUE;
        `);
    await session.run(`
// 3. Быстрый поиск чанков
        CREATE CONSTRAINT chunk_id IF NOT EXISTS FOR (c:CodeChunk) REQUIRE c.id IS UNIQUE;
        `);

    console.log(`✅ Векторный индекс готов (размерность: ${vectorDimensions}).`);
  } catch (error) {
    console.error('⚠️ Ошибка создания индекса:', error);
    throw error;
  } finally {
    await session.close();
  }
}
