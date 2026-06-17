// Imports
import { AObjectResource } from './a_object_resource';
import { any } from './any';
import { AttributeResource } from './attribute_resource';
import { EntityResource } from './entity_resource';
import { fMutResult } from './f_mut_result';
import { NodeAlreadyProvidedException, NodeProvidedException } from './node_provided_exception';
import type { IEntityResource, IEntityResourceMap, IResourceMap } from './node_provided_exception';
import { optinal } from './optinal';
import type { Resource } from './resource';
import { ResourceCollection } from './resource_collection';
import type { INodeResourceCollection, IResourceCollection } from './resource_collection';
import type { FnResultNull, ResultNull, ResultNullFn, ResultNullRegistry } from './result';

// Named exports
export {
  AObjectResource,
  AttributeResource,
  EntityResource,
  NodeAlreadyProvidedException,
  NodeProvidedException,
  ResourceCollection,
  any,
  fMutResult,
  optinal
};
export type {
  FnResultNull,
  IEntityResource,
  IEntityResourceMap,
  INodeResourceCollection,
  IResourceCollection,
  IResourceMap,
  Resource,
  ResultNull,
  ResultNullFn,
  ResultNullRegistry
};

// Default export
const resources = {
  AObjectResource,
  any,
  AttributeResource,
  EntityResource,
  fMutResult,
  NodeAlreadyProvidedException,
  NodeProvidedException,
  optinal,
  ResourceCollection,
};


export default resources;
