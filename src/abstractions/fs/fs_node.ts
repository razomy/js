import * as abstractions from "@razomy/abstractions";

export enum FsNodeType {
  DIRECTORY = 'DIRECTORY',
  FILE_JSON = 'FILE_JSON',
  FILE_STORAGE_URL = 'FILE_STORAGE_URL',
  FILE_BINARY = 'FILE_BINARY',
}

export interface FsNode extends abstractions.patterns.HasPrimaryId, abstractions.patterns.CrudDateTime {
  fsNodeType: FsNodeType;
  name: abstractions.primitive.Char256;
  /*
   * @index
   */
  contentJson?: abstractions.patterns.Json | abstractions.patterns.Json<{ url: abstractions.path.Url }>;
  contentBinary?: abstractions.array.RawBuffer;
  /*
   * @index
   */
  parentId?: abstractions.patterns.IdRef<FsNode>;
  /*
   * @index
   */
  ancestors: abstractions.patterns.IdRef<FsNode>[];
}
