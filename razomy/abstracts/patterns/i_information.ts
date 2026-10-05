import * as abstracts from '@razomy/abstracts';

/**
 * The architecture combines the principles of USD (hierarchy, LIVRPS layer composition)
 * and ECS + CQRS (flat data, runtime mutations, event-driven model).
 *
 * Ontology Axes:
 * [Space / Structure]:        Attribute -> Component -> Entity:Shape -> Context
 * [Topology]:         Edge
 * [Time / Process]:           Command -> Pipeline -> Event
 * [External World / I/O]:     Infrastructure
 * ============================================================================
 */

export interface IInformation extends abstracts.meta.IHas {}

// data type extends IInformation
export type IAttribute = any;

// identified property name extends key = IAttribute
export interface IProperty extends IInformation {}
// struct object entity extends IProperty[]
export interface IComponent extends IInformation {}

// business model join has extends Record<any, IComponent | IEntity>
export interface IEntity extends IInformation, abstracts.patterns.HasId, abstracts.patterns.HasKind {}

// code text
export type ISyntax = IEntity;
// abstract template class
export type IShape = IEntity;

// delta entity in time
export type IEvent = abstracts.patterns.IEntity

// entity join
export type  IEdge = abstracts.patterns.IEntity

// getting data from space
export type  IQuery = abstracts.patterns.IEntity

// setting data to space
export type  ICommand = abstracts.patterns.IEntity

// map data different types
export type IAdapter = IEntity;

// runtime setup
export type IInfrastructure = IEntity;

export type EntityId<EntityName extends string, Type = string> = abstracts.meta.Brand<Type, EntityName>;
