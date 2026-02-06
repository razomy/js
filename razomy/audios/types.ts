import {type FileExtension} from '@razomy/fs.extension';

export const allAudioTargets = [
  'mp3', 'wav', 'ogg', 'm4a', 'aac', 'flac', 'wma', 'opus', 'aiff', 'ac3', 'dts', 'amr', 'voc'
];

export const audioConversions = [...allAudioTargets];

export const audios: FileExtension[] = [
  // --- COMMON ---
  {ext: 'mp3', mime: 'audio/mpeg', category: 'audio', icon: 'mdi-music', conversions: audioConversions.filter(c => c !== 'mp3')},
  {ext: 'wav', mime: 'audio/wav', category: 'audio', icon: 'mdi-waveform', conversions: audioConversions.filter(c => c !== 'wav')},
  {ext: 'aac', mime: 'audio/aac', category: 'audio', icon: 'mdi-music-note', conversions: audioConversions.filter(c => c !== 'aac')},
  {ext: 'm4a', mime: 'audio/mp4', category: 'audio', icon: 'mdi-apple', conversions: audioConversions.filter(c => c !== 'm4a')},
  {ext: 'ogg', mime: 'audio/ogg', category: 'audio', icon: 'mdi-music-circle', conversions: audioConversions.filter(c => c !== 'ogg')},

  // --- HIGH QUALITY / PRO ---
  {ext: 'flac', mime: 'audio/flac', category: 'audio', icon: 'mdi-diamond-stone', conversions: audioConversions.filter(c => c !== 'flac')},
  {ext: 'aiff', mime: 'audio/x-aiff', category: 'audio', icon: 'mdi-music-clef-treble', conversions: audioConversions.filter(c => c !== 'aiff')}, // Apple Lossless (старый)
  {ext: 'alac', mime: 'audio/mp4', category: 'audio', icon: 'mdi-apple', conversions: audioConversions.filter(c => c !== 'alac')}, // Apple Lossless

  // --- CINEMA / SURROUND ---
  {ext: 'ac3', mime: 'audio/ac3', category: 'audio', icon: 'mdi-speaker', conversions: audioConversions.filter(c => c !== 'ac3')}, // Dolby Digital
  {ext: 'dts', mime: 'audio/vnd.dts', category: 'audio', icon: 'mdi-speaker-wireless', conversions: audioConversions.filter(c => c !== 'dts')}, // Digital Theater Systems

  // --- SPECIFIC ---
  {ext: 'wma', mime: 'audio/x-ms-wma', category: 'audio', icon: 'mdi-windows', conversions: audioConversions.filter(c => c !== 'wma')},
  {ext: 'opus', mime: 'audio/opus', category: 'audio', icon: 'mdi-access-point', conversions: audioConversions.filter(c => c !== 'opus')},
  {ext: 'amr', mime: 'audio/amr', category: 'audio', icon: 'mdi-cellphone', conversions: audioConversions.filter(c => c !== 'amr')}, // Nokia / Voice Recorders
  {ext: 'voc', mime: 'audio/x-voc', category: 'audio', icon: 'mdi-gamepad-variant', conversions: audioConversions.filter(c => c !== 'voc')}, // Creative SoundBlaster (DOS Games)
  {ext: 'au', mime: 'audio/basic', category: 'audio', icon: 'mdi-server', conversions: audioConversions.filter(c => c !== 'au')}, // Sun Microsystems / Java
] as const;

export const audioExtensions = new Set(audios.map(i => i.ext));
