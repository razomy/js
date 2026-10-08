// Imports
import { assignPipelineChild } from './assign_pipeline_child';
import { assignPipelineMount } from './assign_pipeline_mount';
import { assignPipelineNext } from './assign_pipeline_next';
import type { MergeHasValueGet } from './assign_pipeline_next';
import { assignPipelineSwitch } from './assign_pipeline_switch';
import { cPl } from './c_pl';
import { ContextPipeline } from './context_pipeline';
import type { AsChildContext, Line, WithChild, WithNext } from './Mutations';
import type { PipelineState } from './PipelineDef';
import { createPipelineGetter } from './create_pipeline_getter';

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
  MergeHasValueGet,
  PipelineState,
  WithChild,
  WithNext,
  Line
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
