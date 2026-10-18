// Imports
import { detectEdges } from './detect_edges';
import { dilate } from './dilate';
import { erode } from './erode';
import { getHistogram } from './get_histogram';
import { getMetadata } from './get_metadata';
import type { ImageMetadata } from './get_metadata';
import { getStats } from './get_stats';
import type { ImageStats } from './get_stats';
import { threshold } from './threshold';

// Named exports
export {
  detectEdges,
  dilate,
  erode,
  getHistogram,
  getMetadata,
  getStats,
  threshold
};
export type {
  ImageMetadata,
  ImageStats
};

// Default export
const advanced = {
  detectEdges,
  dilate,
  erode,
  getHistogram,
  getMetadata,
  getStats,
  threshold,
};


export default advanced;
