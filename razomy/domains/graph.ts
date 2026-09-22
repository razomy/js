// enum EntityType {
//   EDGE
//   ACL_ACCESS_POLICY
//   USER
//   FS_NODE
//   EVENT_LOG
//   AUTH_PROVIDER
//   AUTH_SESSION
//
//   @@schema("graphs_db")
// }
//
// model Edge {
//   edgeId String @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
//
//   sourceType EntityType
//   sourceId   String     @db.Uuid
//
//   targetType EntityType
//   targetId   String     @db.Uuid
//
//   relation String @db.VarChar(50) // 'OWNS', 'FAVORITED', 'ATTACHED_TO'
//   metadata Json? // Вес ребра, доп. параметры (графовая модель)
//
//   createdAt DateTime  @default(now())
//   deletedAt DateTime?
// }
//
// // ==========================================
// // GRAPHS DB
// // ==========================================
//
// export interface Edge {
// edgeId: string;
// sourceType: EntityType;
// sourceId: string;
// targetType: EntityType;
// targetId: string;
// relation: string;
// metadata?: any;
// createdAt: Date;
// deletedAt?: Date;
// }
//
// export const EdgeSchema: ModelMetadata = {
// schema: 'graph',
// uniqueConstraints: {
// edge_unique_relation: ['sourceId', 'targetId', 'relation'],
// },
// indexes: {
// source_lookup: {fields: ['sourceType', 'sourceId', 'relation']},
// target_lookup: {fields: ['targetType', 'targetId', 'relation']},
// metadata_gin: {fields: ['metadata'], type: 'Gin'},
// },
// };
