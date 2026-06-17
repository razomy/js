// Imports
import { toVideoByFormat } from './to_video_by_format.node';
import { ALL_VIDEO_TARGETS, VIDEOS, VIDEO_CONVERSIONS, VIDEO_EXTENSIONS } from './types';

// Named exports
export {
  ALL_VIDEO_TARGETS,
  VIDEOS,
  VIDEO_CONVERSIONS,
  VIDEO_EXTENSIONS,
  toVideoByFormat
};

// Default export
const videos = {
  toVideoByFormat,
  ALL_VIDEO_TARGETS,
  VIDEOS,
  VIDEO_CONVERSIONS,
  VIDEO_EXTENSIONS,
};

export default videos;
