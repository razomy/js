// Imports
import { createEventsContext } from './create_events_context';
import type { EventsContext } from './event';
import { flushEvents } from './flush_events';
import { markDirty } from './mark_dirty';

// Named exports
export {
  createEventsContext,
  flushEvents,
  markDirty
};
export type {
  EventsContext
};

// Default export
const event = {
  createEventsContext,
  flushEvents,
  markDirty,
};


export default event;
