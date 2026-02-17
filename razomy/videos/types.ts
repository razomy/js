import {type FileFormat} from '@razomy/fs-file-format';
import {allAudioTargets} from '@razomy/audios';

// Списки целевых форматов (куда мы можем кодировать)
// Внимание: кодировать В realmedia (.rm) или swf ffmpeg делает плохо, поэтому их лучше оставить только на вход.
export const allVideoTargets = [
  'mp4', 'webm', 'mov', 'mkv', 'avi', 'wmv', 'flv', 'm4v', '3gp', 'mpg', 'mpeg', 'ogv', 'gif',
  'vob', 'm2ts', 'mts', 'ts', 'asf', 'dv', 'mxf'
];

export const videoConversions = [...allVideoTargets, ...allAudioTargets];

export const videos: FileFormat[] = [
  // --- WEB & MODERN ---
  {fileExtensionType: 'mp4', mediaType: 'video/mp4', fileCategory: 'video', iconUrl: 'mdi-video', conversions: videoConversions.filter(c => c !== 'mp4')},
  {fileExtensionType: 'webm', mediaType: 'video/webm', fileCategory: 'video', iconUrl: 'mdi-video', conversions: videoConversions.filter(c => c !== 'webm')},
  {fileExtensionType: 'mov', mediaType: 'video/quicktime', fileCategory: 'video', iconUrl: 'mdi-filmstrip', conversions: videoConversions.filter(c => c !== 'mov')},
  {fileExtensionType: 'mkv', mediaType: 'video/x-matroska', fileCategory: 'video', iconUrl: 'mdi-video-outline', conversions: videoConversions.filter(c => c !== 'mkv')},

  // --- PC & LEGACY ---
  {fileExtensionType: 'avi', mediaType: 'video/x-msvideo', fileCategory: 'video', iconUrl: 'mdi-video-outline', conversions: videoConversions.filter(c => c !== 'avi')},
  {fileExtensionType: 'wmv', mediaType: 'video/x-ms-wmv', fileCategory: 'video', iconUrl: 'mdi-windows', conversions: videoConversions.filter(c => c !== 'wmv')},
  {fileExtensionType: 'asf', mediaType: 'video/x-ms-asf', fileCategory: 'video', iconUrl: 'mdi-windows', conversions: videoConversions.filter(c => c !== 'asf')}, // Предшественник WMV
  {fileExtensionType: 'flv', mediaType: 'video/x-flv', fileCategory: 'video', iconUrl: 'mdi-flash', conversions: videoConversions.filter(c => c !== 'flv')},
  {fileExtensionType: 'swf', mediaType: 'application/x-shockwave-flash', fileCategory: 'video', iconUrl: 'mdi-flash-outline', conversions: videoConversions.filter(c => c !== 'swf')}, // Flash

  // --- MOBILE & APPLE ---
  {fileExtensionType: 'm4v', mediaType: 'video/x-m4v', fileCategory: 'video', iconUrl: 'mdi-apple', conversions: videoConversions.filter(c => c !== 'm4v')},
  {fileExtensionType: '3gp', mediaType: 'video/3gpp', fileCategory: 'video', iconUrl: 'mdi-cellphone', conversions: videoConversions.filter(c => c !== '3gp')},
  {fileExtensionType: '3g2', mediaType: 'video/3gpp2', fileCategory: 'video', iconUrl: 'mdi-cellphone', conversions: videoConversions.filter(c => c !== '3g2')},

  // --- DISC & BROADCAST (DVD, BluRay, TV) ---
  {fileExtensionType: 'vob', mediaType: 'video/mpeg', fileCategory: 'video', iconUrl: 'mdi-disc', conversions: videoConversions.filter(c => c !== 'vob')}, // DVD
  {fileExtensionType: 'mpg', mediaType: 'video/mpeg', fileCategory: 'video', iconUrl: 'mdi-disc', conversions: videoConversions.filter(c => c !== 'mpg')},
  {fileExtensionType: 'mpeg', mediaType: 'video/mpeg', fileCategory: 'video', iconUrl: 'mdi-disc', conversions: videoConversions.filter(c => c !== 'mpeg')},
  {fileExtensionType: 'm2ts', mediaType: 'video/mp2t', fileCategory: 'video', iconUrl: 'mdi-disc-player', conversions: videoConversions.filter(c => c !== 'm2ts')}, // Blu-ray
  {fileExtensionType: 'mts', mediaType: 'video/mp2t', fileCategory: 'video', iconUrl: 'mdi-camcorder', conversions: videoConversions.filter(c => c !== 'mts')}, // AVCHD Camcorders
  {fileExtensionType: 'ts', mediaType: 'video/mp2t', fileCategory: 'video', iconUrl: 'mdi-satellite-uplink', conversions: videoConversions.filter(c => c !== 'ts')}, // IPTV Stream
  {fileExtensionType: 'mxf', mediaType: 'application/mxf', fileCategory: 'video', iconUrl: 'mdi-television-box', conversions: videoConversions.filter(c => c !== 'mxf')}, // Профессиональное ТВ

  // --- OTHERS ---
  {fileExtensionType: 'ogv', mediaType: 'video/ogg', fileCategory: 'video', iconUrl: 'mdi-video', conversions: videoConversions.filter(c => c !== 'ogv')},
  {fileExtensionType: 'rm', mediaType: 'application/vnd.rn-realmedia', fileCategory: 'video', iconUrl: 'mdi-history', conversions: videoConversions.filter(c => c !== 'rm')}, // RealMedia (90s)
  {fileExtensionType: 'rmvb', mediaType: 'application/vnd.rn-realmedia-vbr', fileCategory: 'video', iconUrl: 'mdi-history', conversions: videoConversions.filter(c => c !== 'rmvb')},
  {fileExtensionType: 'dv', mediaType: 'video/x-dv', fileCategory: 'video', iconUrl: 'mdi-camcorder-off', conversions: videoConversions.filter(c => c !== 'dv')}, // Digital Video (MiniDV cassettes)
] as const;

export const videoExtensions = new Set(videos.map(i => i.fileExtensionType));
