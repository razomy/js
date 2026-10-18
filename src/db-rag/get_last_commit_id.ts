export async function getLastCommitId(db, projectPath: string) {
  const session = db.session();

  const result = await session.run(
    `
        MATCH (r:Repository {name: $projectPath})
        RETURN r.lastCommitId AS lastCommitId
      `,
    { projectPath: projectPath },
  );
  await session.close();

  // If no repository is found, return null
  if (result.records.length === 0) {
    return null;
  }

  // Extract and return the lastCommitId from the first record
  return result.records[0].get('lastCommitId') as string;
}

export interface ChunkFile {
  chunks: { id: string; text: string }[];
  filePath: string;
}
