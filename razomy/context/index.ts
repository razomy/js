// Imports
import {
  type ApplyPipeline,
  type ChildPipe,
  type ChildPipeGenerics,
  ContextPipeline,
  cpl,
  type NextPipe,
  type NextPipeGenerics,
  type PipelineGenerics,
  type PipelineKindMap,
  type PipelineURI
} from './context_pipeline';

import {DockerPipeline, dockerPipeline,} from '../container/docker_pipeline';
import type {ActionType, ConfigEvent} from '../db/event_sourcing';
import {EventSourcing} from '../db/event_sourcing';

// Named exports
export { ContextPipeline, EventSourcing, cpl, dockerPipeline };
export type { ActionType,
  ApplyPipeline,
  PipelineKindMap,
  PipelineURI,
  ChildPipeGenerics, ConfigEvent, NextPipeGenerics, NextPipe, PipelineGenerics, ChildPipe };

// Default export
const context = {
  ContextPipeline,
  DockerPipeline,
  cpl,
  EventSourcing,
};

export default context;
