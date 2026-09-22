// model FsNode {
//   fsNodeId   String     @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
//   fsNodeType FsNodeType
//   name       String     @db.VarChar(255)
//
//   contentJson   Json?
//   contentBinary Bytes?
//
//   parentId  String?  @db.Uuid
//   ancestors String[] @db.Uuid
//
//   createdAt DateTime  @default(now())
//   updatedAt DateTime  @updatedAt
//   deletedAt DateTime?
//
//   @@unique([name, parentId], name: "unique_name_in_folder")
//   @@index([ancestors], type: Gin)
//   @@index([contentJson], type: Gin)
//   @@schema("fss_db")
// }
//
// export enum FsNodeType {
//   DIRECTORY = 'DIRECTORY',
//   FILE_RN = 'FILE_RN',
//   FILE_STORAGE_URL = 'FILE_STORAGE_URL',
//   FILE_BINARY = 'FILE_BINARY',
// }
//
// export interface FsNode {
//   fsNodeId: string;
//   fsNodeType: FsNodeType;
//   name: string;
//   contentJson?: any;
//   contentBinary?: Buffer;
//   parentId?: string;
//   ancestors: string[];
//   createdAt: Date;
//   updatedAt: Date;
//   deletedAt?: Date;
// }
//
// export const FsNodeSchema: ModelMetadata = {
//   schema: 'fss_db',
//   uniqueConstraints: {
//     name_parent_unique: ['name', 'parentId'],
//   },
//   indexes: {
//     ancestors_gin: {fields: ['ancestors'], type: 'Gin'},
//     content_json_gin: {fields: ['contentJson'], type: 'Gin'},
//   },
// };
//
// /**
//  * Ошибки валидации структуры ФС
//  */
// export class CycleDetectedError extends Error {
//   constructor(nodeId: string, parentId: string) {
//     super(`Cycle detected: Node ${nodeId} cannot be a child of its own descendant ${parentId}`);
//     this.name = 'CycleDetectedError';
//   }
// }
//
// /**
//  * Логика функции prevent_fsnode_cycles
//  * Проверяет, не создает ли смена родителя циклическую зависимость
//  */
// export function validateFsNodeCycle(oldNode: FsNode, newNode: FsNode): void {
//   // SQL: IF NEW."parentId" = ANY(OLD."ancestors")
//   // Проверяем, входит ли новый родитель в список предков текущего узла
//   if (newNode.parentId && oldNode.ancestors.includes(newNode.parentId)) {
//     throw new CycleDetectedError(newNode.fsNodeId, newNode.parentId);
//   }
// }
//
// // Пример использования в сервисе:
// async function updateFsNodeParent(nodeId: string, newParentId: string) {
//   const oldNode = await db.fsNode.findUnique({ where: { fsNodeId: nodeId } });
//
//   const newNode = { ...oldNode, parentId: newParentId };
//
//   // Эмуляция работы триггера BEFORE UPDATE
//   validateFsNodeCycle(oldNode!, newNode);
//
//   return await db.fsNode.update({
//     where: { fsNodeId: nodeId },
//     data: { parentId: newParentId }
//   });
// }
