import * as vgd from './';

export async function search(db, query: string) {
  const session = db.session();
  console.log(`\n🔍 Ищем: "${query}"...`);
  try {
    const queryVector = await vgd.getEmbedding(query);

    const result = await session.run(
      `
      CALL db.index.vector.queryNodes('code_embeddings', 2, $queryVector)
      YIELD node AS chunk, score
      MATCH (file:File)-[:CONTAINS]->(chunk)
      RETURN file.path AS filePath, chunk.text AS code, score
    `,
      {
        queryVector: queryVector,
      },
    );

    result.records.forEach((record) => {
      console.log(`\n📁 Файл: ${record.get('filePath')} (Совпадение: ${(record.get('score') * 100).toFixed(1)}%)`);
      console.log(`💻 Код:  ${record.get('code')}`);
    });
  } finally {
    await session.close();
  }
}
