// Imports
import { create } from './create';
import { deleteFiles } from './delete_files';
import { getEmbedding } from './get_embedding';
import { getLastCommitId } from './get_last_commit_id';
import type { ChunkFile } from './get_last_commit_id';
import { indexFs } from './index_fs';
import { reset } from './reset';
import { search } from './search';
import { trySetUp } from './try_set_up';

// Named exports
export {
  create,
  deleteFiles,
  getEmbedding,
  getLastCommitId,
  indexFs,
  reset,
  search,
  trySetUp
};
export type {
  ChunkFile
};

// Default export
const dbRag = {
  create,
  deleteFiles,
  getEmbedding,
  getLastCommitId,
  indexFs,
  reset,
  search,
  trySetUp,
};


export default dbRag;
