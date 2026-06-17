// import type {AuthEvent, UserAuth} from "./auth";
// import type {ModelMetadata} from "./schema";
// import type {HasCreatedAt, HasDeletedAt, HasId, HasUpdatedAt, IdRef} from "@razomy/abstracts/domains";
// import {createId} from "@razomy/random";
// import {addDeleteAt, createAt, updateAt} from "./domains";
//
// export interface HasProfile {
//   name: string;
//   avatar: string;
//   contactEmail: string;
// }
//
// export interface HasOther {
//   userProfile: IdRef<UserProfile>;
//   userAuth: IdRef<UserAuth>;
//   authEvents: IdRef<AuthEvent>[];
// }
//
// export type Profile = HasProfile & HasId & HasCreatedAt & HasUpdatedAt;
// export type UserProfile = { user: IdRef<User> } & Profile;
//
// export type User = HasId & HasCreatedAt & HasUpdatedAt;
// export type DeletedUser = User & HasDeletedAt;
//
// export const UserSchema: ModelMetadata = {
//   schema: 'user',
//   uniqueConstraints: {},
//   indexes: {
//     userId: {fields: ['userId'], order: 'ASC', type: 'Gin'}
//   },
//   onCreate: [createAt, createEntityId],
//   onUpdate: [updateAt],
//   onDelete: [addDeleteAt],
// };
//
//
// export const UserProfileSchema: ModelMetadata = {
//   schema: 'user',
//   uniqueConstraints: {
//     userId: ['userId'],
//   },
//   indexes: {
//     profileId: {fields: ['profileId'], order: 'ASC', type: 'Gin'}
//   },
//   onCreate: [createAt, createId, cascadeOnDeleteUser],
//   onUpdate: [updateAt],
//   onDelete: [addDeleteAt],
// };
//
// export function createEntityId(ctx: HasId) {
//   ctx.id = createId() as any;
// }
//
// export function cascadeOnDeleteUser(db: { schemas: {user:ModelMetadata} }) {
//   db.schemas.user.onDelete.push((u) => {
//     db.get('profile').delete.createQuery().where(i => i.userId === u.id);
//   });
// }
