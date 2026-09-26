// Imports
import { ContextPipeline, cpl } from './context_pipeline';
import type { ChildCb, ChildMethod, Field, NextChild, NextCtx } from './context_pipeline';
import { EventSourcing } from './event_sourcing';
import type { ActionType, ConfigEvent } from './event_sourcing';

// Named exports
export {
  ContextPipeline,
  EventSourcing,
  cpl
};
export type {
  ActionType,
  ChildCb,
  ChildMethod,
  ConfigEvent,
  Field,
  NextChild,
  NextCtx
};

// Default export
const context = {
  ContextPipeline,
  cpl,
  EventSourcing,
};


export default context;
