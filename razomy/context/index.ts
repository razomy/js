// Imports
import { assignPipelineChild } from './assign_pipeline_child';
import { assignPipelineMount } from './assign_pipeline_mount';
import { assignPipelineNext } from './assign_pipeline_next';
import type { MergeHasValueGet } from './assign_pipeline_next';
import { assignPipelineSwitch } from './assign_pipeline_switch';
import { cPl } from './c_pl';
import { ContextPipeline } from './context_pipeline';
import { createPipelineGetter } from './create_pipeline_getter';
import type { AsChildContext, Line, WithChild, WithNext } from './mutations';
import type { DefaultPipelineDef, PipelineDef, PipelineState } from './pipeline_def';

// Named exports
export {
  ContextPipeline,
  assignPipelineChild,
  assignPipelineMount,
  assignPipelineNext,
  assignPipelineSwitch,
  cPl,
  createPipelineGetter
};
export type {
  AsChildContext,
  DefaultPipelineDef,
  Line,
  MergeHasValueGet,
  PipelineDef,
  PipelineState,
  WithChild,
  WithNext
};

// Default export
const context = {
  assignPipelineChild,
  assignPipelineMount,
  assignPipelineNext,
  assignPipelineSwitch,
  cPl,
  ContextPipeline,
  createPipelineGetter,
};


export default context;
