// Imports
import { toAudioByFormat } from './to_audio_by_format.node';
import { ALL_AUDIO_TARGETS, AUDIOS, AUDIO_CONVERSIONS, AUDIO_EXTENSIONS } from './types';

// Named exports
export {
  ALL_AUDIO_TARGETS,
  AUDIOS,
  AUDIO_CONVERSIONS,
  AUDIO_EXTENSIONS,
  toAudioByFormat
};

// Default export
const audios = {
  toAudioByFormat,
  ALL_AUDIO_TARGETS,
  AUDIOS,
  AUDIO_CONVERSIONS,
  AUDIO_EXTENSIONS,
};

export default audios;
