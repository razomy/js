// Imports
import { assignPipelineChild } from './assign_pipeline_child';
import { assignPipelineMount } from './assign_pipeline_mount';
import { assignPipelineNext } from './assign_pipeline_next';
import { assignPipelineSwitch } from './assign_pipeline_switch';
import { cPl } from './c_pl';
import { ContextFactory } from './context_factory';
import type { ApplyPipeline, ContextFactoryKey, ContextFactoryMap } from './context_factory';
import { ContextPipeline } from './context_pipeline';
import type { ChildPipe, ChildPipeCbGenerics, ChildPipeGenerics, NextPipe, NextPipeGenerics, PipelineGenerics, PipelineState } from './context_pipeline';
import { createPipelineGetter } from './create_pipeline_getter';

// Named exports
export {
  ContextFactory,
  ContextPipeline,
  assignPipelineChild,
  assignPipelineMount,
  assignPipelineNext,
  assignPipelineSwitch,
  cPl,
  createPipelineGetter
};
export type {
  ApplyPipeline,
  ChildPipe,
  ChildPipeCbGenerics,
  ChildPipeGenerics,
  ContextFactoryKey,
  ContextFactoryMap,
  NextPipe,
  NextPipeGenerics,
  PipelineGenerics,
  PipelineState
};

// Default export
const context = {
  assignPipelineChild,
  assignPipelineMount,
  assignPipelineNext,
  assignPipelineSwitch,
  cPl,
  ContextFactory,
  ContextPipeline,
  createPipelineGetter,
};


export default context;
