// import {EntityType} from "./schema";
// import * as abstracts from '@razomy/abstracts';
// import type {U64} from "@razomy/abstracts/primitives";
//
// export enum DifferenceType {
//   CREATED = 'CREATED',
//   UPDATED = 'UPDATED',
//   DELETED = 'DELETED',
// }
//
// model Event {
//   entityId   String     @db.Uuid
//
//   differenceType DifferenceType
//   difference     Json?
//   commitHash     String         @unique @default(dbgenerated("encode(digest(gen_random_uuid()::text, 'sha256'), 'hex')")) // Генерируем хэш как в Git
//   previousId     String?        @unique @db.Uuid
//
//   userId    String    @db.Uuid
//   createdAt DateTime  @default(now())
//   deletedAt DateTime?
//
//   user User @relation(fields: [userId], references: [userId], onDelete: Cascade)
//
//   @@index([entityId, createdAt(sort: Desc)])
//   @@index([createdAt])
//   @@schema("events_db")
// }
//
// export type EventId = abstracts.domains.EntityId<'Event', U64>;
//
// export interface Event {
//   eventId: EventId;
//   entityType: EntityType;
//   entityId: string;
//   differenceType: DifferenceType;
//   difference: any;
//   commitHash: string;
//   previousId: string;
//   userId: string;
//   createdAt: Date;
//   deletedAt: Date;
// }
//
// export const EventSchema: ModelMetadata = {
//   schema: 'events_db',
//   uniqueConstraints: {
//     commitHash_unique: ['commitHash'],
//     previousId_unique: ['previousId'],
//   },
//   indexes: {
//     entity_time_index: {fields: ['entityId', 'createdAt'], order: 'DESC'},
//     createdAt_index: {fields: ['createdAt']},
//   },
// };
