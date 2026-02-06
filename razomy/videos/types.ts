import {type FileExtension} from '@razomy/fs.extension';
import {allAudioTargets} from '@razomy/audios';

// Списки целевых форматов (куда мы можем кодировать)
// Внимание: кодировать В realmedia (.rm) или swf ffmpeg делает плохо, поэтому их лучше оставить только на вход.
export const allVideoTargets = [
  'mp4', 'webm', 'mov', 'mkv', 'avi', 'wmv', 'flv', 'm4v', '3gp', 'mpg', 'mpeg', 'ogv', 'gif',
  'vob', 'm2ts', 'mts', 'ts', 'asf', 'dv', 'mxf'
];

export const videoConversions = [...allVideoTargets, ...allAudioTargets];

export const videos: FileExtension[] = [
  // --- WEB & MODERN ---
  {ext: 'mp4', mime: 'video/mp4', category: 'video', icon: 'mdi-video', conversions: videoConversions.filter(c => c !== 'mp4')},
  {ext: 'webm', mime: 'video/webm', category: 'video', icon: 'mdi-video', conversions: videoConversions.filter(c => c !== 'webm')},
  {ext: 'mov', mime: 'video/quicktime', category: 'video', icon: 'mdi-filmstrip', conversions: videoConversions.filter(c => c !== 'mov')},
  {ext: 'mkv', mime: 'video/x-matroska', category: 'video', icon: 'mdi-video-outline', conversions: videoConversions.filter(c => c !== 'mkv')},

  // --- PC & LEGACY ---
  {ext: 'avi', mime: 'video/x-msvideo', category: 'video', icon: 'mdi-video-outline', conversions: videoConversions.filter(c => c !== 'avi')},
  {ext: 'wmv', mime: 'video/x-ms-wmv', category: 'video', icon: 'mdi-windows', conversions: videoConversions.filter(c => c !== 'wmv')},
  {ext: 'asf', mime: 'video/x-ms-asf', category: 'video', icon: 'mdi-windows', conversions: videoConversions.filter(c => c !== 'asf')}, // Предшественник WMV
  {ext: 'flv', mime: 'video/x-flv', category: 'video', icon: 'mdi-flash', conversions: videoConversions.filter(c => c !== 'flv')},
  {ext: 'swf', mime: 'application/x-shockwave-flash', category: 'video', icon: 'mdi-flash-outline', conversions: videoConversions.filter(c => c !== 'swf')}, // Flash

  // --- MOBILE & APPLE ---
  {ext: 'm4v', mime: 'video/x-m4v', category: 'video', icon: 'mdi-apple', conversions: videoConversions.filter(c => c !== 'm4v')},
  {ext: '3gp', mime: 'video/3gpp', category: 'video', icon: 'mdi-cellphone', conversions: videoConversions.filter(c => c !== '3gp')},
  {ext: '3g2', mime: 'video/3gpp2', category: 'video', icon: 'mdi-cellphone', conversions: videoConversions.filter(c => c !== '3g2')},

  // --- DISC & BROADCAST (DVD, BluRay, TV) ---
  {ext: 'vob', mime: 'video/mpeg', category: 'video', icon: 'mdi-disc', conversions: videoConversions.filter(c => c !== 'vob')}, // DVD
  {ext: 'mpg', mime: 'video/mpeg', category: 'video', icon: 'mdi-disc', conversions: videoConversions.filter(c => c !== 'mpg')},
  {ext: 'mpeg', mime: 'video/mpeg', category: 'video', icon: 'mdi-disc', conversions: videoConversions.filter(c => c !== 'mpeg')},
  {ext: 'm2ts', mime: 'video/mp2t', category: 'video', icon: 'mdi-disc-player', conversions: videoConversions.filter(c => c !== 'm2ts')}, // Blu-ray
  {ext: 'mts', mime: 'video/mp2t', category: 'video', icon: 'mdi-camcorder', conversions: videoConversions.filter(c => c !== 'mts')}, // AVCHD Camcorders
  {ext: 'ts', mime: 'video/mp2t', category: 'video', icon: 'mdi-satellite-uplink', conversions: videoConversions.filter(c => c !== 'ts')}, // IPTV Stream
  {ext: 'mxf', mime: 'application/mxf', category: 'video', icon: 'mdi-television-box', conversions: videoConversions.filter(c => c !== 'mxf')}, // Профессиональное ТВ

  // --- OTHERS ---
  {ext: 'ogv', mime: 'video/ogg', category: 'video', icon: 'mdi-video', conversions: videoConversions.filter(c => c !== 'ogv')},
  {ext: 'rm', mime: 'application/vnd.rn-realmedia', category: 'video', icon: 'mdi-history', conversions: videoConversions.filter(c => c !== 'rm')}, // RealMedia (90s)
  {ext: 'rmvb', mime: 'application/vnd.rn-realmedia-vbr', category: 'video', icon: 'mdi-history', conversions: videoConversions.filter(c => c !== 'rmvb')},
  {ext: 'dv', mime: 'video/x-dv', category: 'video', icon: 'mdi-camcorder-off', conversions: videoConversions.filter(c => c !== 'dv')}, // Digital Video (MiniDV cassettes)
] as const;

export const videoExtensions = new Set(videos.map(i => i.ext));
