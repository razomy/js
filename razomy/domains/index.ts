// Imports
import { addDeleteAt } from './add_delete_at';
import { createAt } from './create_at';
import type { HasDisplayName, HasFamilyName, HasFirstName, HasFullName, HasGenerationalSuffix, HasHonorificPrefix, HasLastName, HasLegalName, HasMaidenName, HasMiddleName, HasName, HasNamingConvention, HasNickName, HasParentName, HasPatronymic, HasSortingName, NamingConventionType } from './has_name';
import { EntityType } from './schema';
import type { ModelMetadata } from './schema';
import { updateAt } from './update_at';

// Named exports
export {
  EntityType,
  addDeleteAt,
  createAt,
  updateAt
};
export type {
  HasDisplayName,
  HasFamilyName,
  HasFirstName,
  HasFullName,
  HasGenerationalSuffix,
  HasHonorificPrefix,
  HasLastName,
  HasLegalName,
  HasMaidenName,
  HasMiddleName,
  HasName,
  HasNamingConvention,
  HasNickName,
  HasParentName,
  HasPatronymic,
  HasSortingName,
  ModelMetadata,
  NamingConventionType
};

// Default export
const domains = {
  addDeleteAt,
  createAt,
  EntityType,
  updateAt,
};


export default domains;
