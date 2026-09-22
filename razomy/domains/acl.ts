// import {EntityType} from "./schema";
//
// enum AccessLevel {
//   DENIED
//   VIEWER
//   EDITOR
//   OWNER
//
//   @@schema("acls_db")
// }
//
// model AccessPolicy {
//   accessPolicyId String @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
//
//   resourceType EntityType
//   resourceId   String     @db.Uuid
//
//   subjectType EntityType
//   subjectId   String     @db.Uuid
//
//   accessLevel AccessLevel
//
//   expiresAt DateTime?
//   deletedAt DateTime?
//
//   @@unique([resourceId, subjectId])
//   @@index([subjectId])
//   @@schema("acls_db")
// }
//
// // ==========================================
// // ACLS DB
// // ==========================================
//
// export enum AccessLevel {
//   DENIED = 'DENIED',
//   VIEWER = 'VIEWER',
//   EDITOR = 'EDITOR',
//   OWNER = 'OWNER',
// }
//
// export interface AccessPolicy {
//   accessPolicyId: string;
//   resourceType: EntityType;
//   resourceId: string;
//   subjectType: EntityType;
//   subjectId: string;
//   accessLevel: AccessLevel;
//   expiresAt?: Date;
//   deletedAt?: Date;
// }
//
// export const AccessPolicySchema: ModelMetadata = {
//   schema: 'acls_db',
//   uniqueConstraints: {
//     resource_subject_unique: ['resourceId', 'subjectId'],
//   },
//   indexes: {
//     subject_index: {fields: ['subjectId']},
//   },
// };
//
// // ---
//
// import {
//   Event, EntityType, DifferenceType,
//   Edge, FsNode, User
// } from './types';
// import { v4 as uuidv4 } from 'uuid';
//
// /**
//  * Типизация для вычисления разницы между объектами (JSON Diff)
//  */
// type JsonDiff = Record<string, any>;
//
// /**
//  * СЕРВИС ЛОГИРОВАНИЯ СОБЫТИЙ (Core Log Event)
//  */
// export class EventLoggingService {
//   // Имитация получения текущего пользователя из контекста/сессии
//   private getCurrentUserId(): string | null {
//     return process.env.CURRENT_USER_ID || null;
//   }
//
//   /**
//    * Основная функция логирования (Аналог fn_core_log_event)
//    */
//   async logEvent(
//     entityId: string,
//     entityType: EntityType,
//     oldData: any,
//     newData: any,
//     operation: 'INSERT' | 'UPDATE' | 'DELETE'
//   ): Promise<void> {
//     const userId = this.getCurrentUserId();
//
//     // 1. Поиск предыдущего события (аналог SELECT eventId FROM Event ...)
//     const previousEventId = await this.getLastEventId(entityId);
//
//     if (operation === 'INSERT') {
//       await this.createEvent(entityId, entityType, 'CREATED', newData, userId, previousEventId);
//     }
//     else if (operation === 'UPDATE') {
//       // Проверка на "Мягкое удаление" (Soft Delete)
//       const isDeleted = !oldData.deletedAt && newData.deletedAt;
//
//       if (isDeleted) {
//         // 1. Логируем событие удаления
//         await this.createEvent(entityId, entityType, 'DELETED', newData, userId, previousEventId);
//
//         // 2. КАСКАДНЫЕ ЭФФЕКТЫ (Самая важная часть SQL кода)
//         await this.handleCascadeDeletion(entityId, entityType, newData.deletedAt);
//       }
//       else {
//         // Вычисляем разницу (diff) между старым и новым состоянием
//         const diff = this.calculateDiff(oldData, newData);
//
//         if (Object.keys(diff).length > 0) {
//           await this.createEvent(entityId, entityType, 'UPDATED', diff, userId, previousEventId);
//         }
//       }
//     }
//   }
//
//   /**
//    * Обработка каскадов (Аналог блоков IF p_entity_type IN ...)
//    */
//   private async handleCascadeDeletion(entityId: string, entityType: EntityType, deletedAt: Date) {
//     // Каскад для Edge (Графовая модель)
//     if (entityType === 'FS_NODE' || entityType === 'USER') {
//       console.log(`Cascading delete to Edges for entity ${entityId}`);
//       // SQL: UPDATE graphs_db."Edge" SET "deletedAt" = ... WHERE sourceId = id OR targetId = id
//       await this.dbUpdateEdges(entityId, deletedAt);
//     }
//
//     // Каскад для детей ФС (Иерархическая модель)
//     if (entityType === 'FS_NODE') {
//       console.log(`Cascading delete to Child FsNodes for entity ${entityId}`);
//       // SQL: UPDATE fss_db."FsNode" SET "deletedAt" = ... WHERE p_entity_id = ANY ("ancestors")
//       await this.dbUpdateFsChildren(entityId, deletedAt);
//     }
//   }
//
//   /**
//    * Вычисление разницы полей (Аналог jsonb_object_agg)
//    */
//   private calculateDiff(oldData: any, newData: any): JsonDiff {
//     const diff: JsonDiff = {};
//     const ignoredFields = ['updatedAt', 'deletedAt'];
//
//     for (const key in newData) {
//       if (ignoredFields.includes(key)) continue;
//
//       if (newData[key] !== oldData[key]) {
//         diff[key] = newData[key];
//       }
//     }
//     return diff;
//   }
//
//   // --- Вспомогательные методы работы с БД (заглушки) ---
//
//   private async getLastEventId(entityId: string): Promise<string | null> {
//     // SELECT "eventId" FROM events_db."Event" WHERE "entityId" = entityId ORDER BY "createdAt" DESC LIMIT 1
//     return null;
//   }
//
//   private async createEvent(
//     entityId: string,
//     entityType: EntityType,
//     diffType: DifferenceType,
//     difference: any,
//     userId: string | null,
//     previousId: string | null
//   ) {
//     const event: Event = {
//       eventId: uuidv4(),
//       entityId,
//       entityType,
//       differenceType: diffType,
//       difference,
//       userId,
//       previousId,
//       commitHash: 'generated_hash', // Здесь вызвать вашу функцию хеширования
//       createdAt: new Date(),
//       deletedAt: undefined,
//     };
//     console.log('Saving Event to DB:', event);
//   }
//
//   private async dbUpdateEdges(entityId: string, deletedAt: Date) {
//     // Имитация UPDATE graphs_db."Edge"
//   }
//
//   private async dbUpdateFsChildren(entityId: string, deletedAt: Date) {
//     // Имитация UPDATE fss_db."FsNode" WHERE entityId = ANY(ancestors)
//   }
// }
//
// /**
//  * Обертки-триггеры для каждой модели
//  */
// export class AuditService {
//   private logService = new EventLoggingService();
//
//   async auditFsNode(oldNode: FsNode, newNode: FsNode) {
//     await this.logService.logEvent(newNode.fsNodeId, EntityType.FS_NODE, oldNode, newNode, 'UPDATE');
//   }
//
//   async auditAccessPolicy(oldPolicy: any, newPolicy: any) {
//     await this.logService.logEvent(newPolicy.accessPolicyId, EntityType.ACL_ACCESS_POLICY, oldPolicy, newPolicy, 'UPDATE');
//   }
//
//   async auditUser(oldUser: User, newUser: User) {
//     await this.logService.logEvent(newUser.userId, EntityType.USER, oldUser, newUser, 'UPDATE');
//   }
//
//   async auditEdge(oldEdge: Edge, newEdge: Edge) {
//     await this.logService.logEvent(newEdge.edgeId, EntityType.EDGE, oldEdge, newEdge, 'UPDATE');
//   }
// }
//  // --
//
// // ==========================================
// // USERS DB
// // ==========================================
//
//
//
//
// // .. ---
// export enum AccessLevel {
//   DENIED = 0,
//   VIEWER = 1,
//   EDITOR = 2,
//   OWNER = 3,
// }
//
// export type Action = 'SELECT' | 'UPDATE' | 'INSERT' | 'DELETE';
//
// 2. ACL Engine (Сердце системы безопасности)
// Этот сервис реализует всю логику ваших SQL-политик.
//
//   import { AccessLevel, Action } from './types';
// import { AccessPolicy } from './models';
// import type {U64} from "@razomy/abstracts/primitives";
// import type {AuthEvent, UserAuth} from "./auth";
// import type { ModelMetadata } from "./schema";
// import type {IdRef} from "../abstracts/domains/i_has_ref";
//
// export class AclEngine {
//   /**
//    * Главный метод проверки доступа.
//    * Аналог: EXISTS (SELECT 1 FROM acls_db."AccessPolicy" ...)
//    */
//   async canUserPerform(
//     userId: string,
//     resourceId: string,
//     requiredLevel: AccessLevel,
//     currentPolicy?: AccessPolicy
//   ): Promise<boolean> {
//     // Если политика уже передана (например, при итерации по списку), используем её
//     if (currentPolicy) {
//       return currentPolicy.subjectId === userId &&
//         this.compareLevels(currentPolicy.accessLevel, requiredLevel) &&
//         !currentPolicy.deletedAt;
//     }
//
//     // Иначе запрашиваем актуальную политику из БД
//     const policy = await this.fetchPolicy(userId, resourceId);
//     if (!policy) return false;
//
//     return this.compareLevels(policy.accessLevel, requiredLevel) && !policy.deletedAt;
//   }
//
//   private compareLevels(userLevel: AccessLevel, requiredLevel: AccessLevel): boolean {
//     // В TS перечисления — это числа, поэтому можно использовать оператор >=
//     return userLevel >= requiredLevel;
//   }
//
//   private async fetchPolicy(userId: string, resourceId: string): Promise<AccessPolicy | null> {
//     // Имитация: SELECT * FROM acls_db."AccessPolicy" WHERE subjectId = userId AND resourceId = resourceId
//     return null;
//   }
// }
//
// 3. Политики доступа по моделям (Policy Mapper)
// Теперь перепишем ваши конкретные SQL-политики в виде функций-проверок.
//
//   export class SecurityService {
//   private acl = new AclEngine();
//
//   /**
//    * 1. FSS_DB: FsNode
//    */
//   async checkFsNodeAccess(userId: string, node: any, action: Action): Promise<boolean> {
//     if (action === 'DELETE') return false; // Заблокировано для всех
//
//     const requiredLevel = action === 'UPDATE' ? AccessLevel.EDITOR : AccessLevel.VIEWER;
//
//     // Логика: доступ к самой ноде ИЛИ к любому из её предков (ancestors)
//     const targetIds = [node.fsNodeId, ...node.ancestors];
//
//     for (const id of targetIds) {
//       if (await this.acl.canUserPerform(userId, id, requiredLevel)) return true;
//     }
//     return false;
//   }
//
//   /**
//    * 2. GRAPHS_DB: Edge
//    */
//   async checkEdgeAccess(userId: string, edge: any, action: Action): Promise<boolean> {
//     if (action === 'DELETE') return false;
//
//     if (action === 'SELECT') {
//       // Доступ к ребру, источнику или цели
//       const targetIds = [edge.edgeId, edge.sourceId, edge.targetId];
//       for (const id of targetIds) {
//         if (await this.acl.canUserPerform(userId, id, AccessLevel.VIEWER)) return true;
//       }
//       return false;
//     }
//
//     if (action === 'UPDATE') {
//       // Только доступ к самому ребру (EDITOR+)
//       return await this.acl.canUserPerform(userId, edge.edgeId, AccessLevel.EDITOR);
//     }
//     return false;
//   }
//
//   /**
//    * 3. EVENTS_DB: Event
//    */
//   async checkEventAccess(userId: string, event: any, action: Action): Promise<boolean> {
//     if (action === 'INSERT' || action === 'UPDATE' || action === 'DELETE') return false;
//
//     // Чтение: если есть доступ к сущности, к которой относится событие
//     return await this.acl.canUserPerform(userId, event.entityId, AccessLevel.VIEWER);
//   }
//
//   /**
//    * 4. USERS_DB: User
//    */
//   async checkUserAccess(userId: string, targetUserId: string, action: Action): Promise<boolean> {
//     if (action === 'DELETE') return false;
//
//     // Сам себя (Всегда разрешено)
//     if (userId === targetUserId) return true;
//
//     const requiredLevel = action === 'UPDATE' ? AccessLevel.EDITOR : AccessLevel.VIEWER;
//     return await this.acl.canUserPerform(userId, targetUserId, requiredLevel);
//   }
//
//   /**
//    * 5. ACLS_DB: AccessPolicy
//    */
//   async checkPolicyAccess(userId: string, policy: any, action: Action): Promise<boolean> {
//     if (action === 'DELETE') return false;
//
//     if (action === 'SELECT') {
//       // Свои права ИЛИ права на ресурс, где ты EDITOR+
//       if (policy.subjectId === userId) return true;
//       return await this.acl.canUserPerform(userId, policy.resourceId, AccessLevel.EDITOR);
//     }
//
//     if (action === 'INSERT') {
//       // Только OWNER ресурса может раздавать права
//       return await this.acl.canUserPerform(userId, policy.resourceId, AccessLevel.OWNER);
//     }
//
//     if (action === 'UPDATE') {
//       // Только EDITOR+ ресурса может менять права
//       return await this.acl.canUserPerform(userId, policy.resourceId, AccessLevel.EDITOR);
//     }
//
//     return false;
//   }
// }
//
// Как это использовать в приложении (Middleware/Controller):
// Вместо того чтобы надеяться на БД, вы вызываете проверку в начале функции:
//
//   async function updateFsNode(userId: string, nodeId: string, data: any) {
//     const node = await db.fsNode.findUnique({ where: { id: nodeId } });
//
//     // Эмуляция RLS Политики
//     const hasAccess = await securityService.checkFsNodeAccess(userId, node, 'UPDATE');
//
//     if (!hasAccess) {
//       throw new Error('Forbidden: Insufficient permissions');
//     }
//
//     return await db.fsNode.update({ where: { id: nodeId }, data });
//   }
