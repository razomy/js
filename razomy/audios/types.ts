import {type FileFormat} from '@razomy/fs-file-format';

export const allAudioTargets = [
  'mp3', 'wav', 'ogg', 'm4a', 'aac', 'flac', 'wma', 'opus', 'aiff', 'ac3', 'dts', 'amr', 'voc'
];

export const audioConversions = [...allAudioTargets];

export const audios: FileFormat[] = [
  // --- COMMON ---
  {fileExtensionType: 'mp3', mediaType: 'audio/mpeg', fileCategory: 'audio', iconUrl: 'mdi-music', conversions: audioConversions.filter(c => c !== 'mp3')},
  {fileExtensionType: 'wav', mediaType: 'audio/wav', fileCategory: 'audio', iconUrl: 'mdi-waveform', conversions: audioConversions.filter(c => c !== 'wav')},
  {fileExtensionType: 'aac', mediaType: 'audio/aac', fileCategory: 'audio', iconUrl: 'mdi-music-note', conversions: audioConversions.filter(c => c !== 'aac')},
  {fileExtensionType: 'm4a', mediaType: 'audio/mp4', fileCategory: 'audio', iconUrl: 'mdi-apple', conversions: audioConversions.filter(c => c !== 'm4a')},
  {fileExtensionType: 'ogg', mediaType: 'audio/ogg', fileCategory: 'audio', iconUrl: 'mdi-music-circle', conversions: audioConversions.filter(c => c !== 'ogg')},

  // --- HIGH QUALITY / PRO ---
  {fileExtensionType: 'flac', mediaType: 'audio/flac', fileCategory: 'audio', iconUrl: 'mdi-diamond-stone', conversions: audioConversions.filter(c => c !== 'flac')},
  {fileExtensionType: 'aiff', mediaType: 'audio/x-aiff', fileCategory: 'audio', iconUrl: 'mdi-music-clef-treble', conversions: audioConversions.filter(c => c !== 'aiff')}, // Apple Lossless (старый)
  {fileExtensionType: 'alac', mediaType: 'audio/mp4', fileCategory: 'audio', iconUrl: 'mdi-apple', conversions: audioConversions.filter(c => c !== 'alac')}, // Apple Lossless

  // --- CINEMA / SURROUND ---
  {fileExtensionType: 'ac3', mediaType: 'audio/ac3', fileCategory: 'audio', iconUrl: 'mdi-speaker', conversions: audioConversions.filter(c => c !== 'ac3')}, // Dolby Digital
  {fileExtensionType: 'dts', mediaType: 'audio/vnd.dts', fileCategory: 'audio', iconUrl: 'mdi-speaker-wireless', conversions: audioConversions.filter(c => c !== 'dts')}, // Digital Theater Systems

  // --- SPECIFIC ---
  {fileExtensionType: 'wma', mediaType: 'audio/x-ms-wma', fileCategory: 'audio', iconUrl: 'mdi-windows', conversions: audioConversions.filter(c => c !== 'wma')},
  {fileExtensionType: 'opus', mediaType: 'audio/opus', fileCategory: 'audio', iconUrl: 'mdi-access-point', conversions: audioConversions.filter(c => c !== 'opus')},
  {fileExtensionType: 'amr', mediaType: 'audio/amr', fileCategory: 'audio', iconUrl: 'mdi-cellphone', conversions: audioConversions.filter(c => c !== 'amr')}, // Nokia / Voice Recorders
  {fileExtensionType: 'voc', mediaType: 'audio/x-voc', fileCategory: 'audio', iconUrl: 'mdi-gamepad-variant', conversions: audioConversions.filter(c => c !== 'voc')}, // Creative SoundBlaster (DOS Games)
  {fileExtensionType: 'au', mediaType: 'audio/basic', fileCategory: 'audio', iconUrl: 'mdi-server', conversions: audioConversions.filter(c => c !== 'au')}, // Sun Microsystems / Java
] as const;

export const audioExtensions = new Set(audios.map(i => i.fileExtensionType));
