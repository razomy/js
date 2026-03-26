import * as fsFileFormat from '@razomy/fs-file-format';
import * as audios from '@razomy/audios';

// Списки целевых форматов (куда мы можем кодировать)
// Внимание: кодировать В realmedia (.rm) или swf ffmpeg делает плохо, поэтому их лучше оставить только на вход.
export const ALL_VIDEO_TARGETS = [
  'mp4',
  'webm',
  'mov',
  'mkv',
  'avi',
  'wmv',
  'flv',
  'm4v',
  '3gp',
  'mpg',
  'mpeg',
  'ogv',
  'gif',
  'vob',
  'm2ts',
  'mts',
  'ts',
  'asf',
  'dv',
  'mxf',
];

export const VIDEO_CONVERSIONS = [...ALL_VIDEO_TARGETS, ...audios.ALL_AUDIO_TARGETS];

export const VIDEOS: fsFileFormat.FileFormat[] = [
  // --- WEB & MODERN ---
  {
    fileExtensionType: 'mp4',
    mediaType: 'video/mp4',
    fileCategory: 'video',
    iconUrl: 'mdi-video',
    conversions: VIDEO_CONVERSIONS.filter((c) => c !== 'mp4'),
  },
  {
    fileExtensionType: 'webm',
    mediaType: 'video/webm',
    fileCategory: 'video',
    iconUrl: 'mdi-video',
    conversions: VIDEO_CONVERSIONS.filter((c) => c !== 'webm'),
  },
  {
    fileExtensionType: 'mov',
    mediaType: 'video/quicktime',
    fileCategory: 'video',
    iconUrl: 'mdi-filmstrip',
    conversions: VIDEO_CONVERSIONS.filter((c) => c !== 'mov'),
  },
  {
    fileExtensionType: 'mkv',
    mediaType: 'video/x-matroska',
    fileCategory: 'video',
    iconUrl: 'mdi-video-outline',
    conversions: VIDEO_CONVERSIONS.filter((c) => c !== 'mkv'),
  },

  // --- PC & LEGACY ---
  {
    fileExtensionType: 'avi',
    mediaType: 'video/x-msvideo',
    fileCategory: 'video',
    iconUrl: 'mdi-video-outline',
    conversions: VIDEO_CONVERSIONS.filter((c) => c !== 'avi'),
  },
  {
    fileExtensionType: 'wmv',
    mediaType: 'video/x-ms-wmv',
    fileCategory: 'video',
    iconUrl: 'mdi-windows',
    conversions: VIDEO_CONVERSIONS.filter((c) => c !== 'wmv'),
  },
  {
    fileExtensionType: 'asf',
    mediaType: 'video/x-ms-asf',
    fileCategory: 'video',
    iconUrl: 'mdi-windows',
    conversions: VIDEO_CONVERSIONS.filter((c) => c !== 'asf'),
  }, // Предшественник WMV
  {
    fileExtensionType: 'flv',
    mediaType: 'video/x-flv',
    fileCategory: 'video',
    iconUrl: 'mdi-flash',
    conversions: VIDEO_CONVERSIONS.filter((c) => c !== 'flv'),
  },
  {
    fileExtensionType: 'swf',
    mediaType: 'application/x-shockwave-flash',
    fileCategory: 'video',
    iconUrl: 'mdi-flash-outline',
    conversions: VIDEO_CONVERSIONS.filter((c) => c !== 'swf'),
  }, // Flash

  // --- MOBILE & APPLE ---
  {
    fileExtensionType: 'm4v',
    mediaType: 'video/x-m4v',
    fileCategory: 'video',
    iconUrl: 'mdi-apple',
    conversions: VIDEO_CONVERSIONS.filter((c) => c !== 'm4v'),
  },
  {
    fileExtensionType: '3gp',
    mediaType: 'video/3gpp',
    fileCategory: 'video',
    iconUrl: 'mdi-cellphone',
    conversions: VIDEO_CONVERSIONS.filter((c) => c !== '3gp'),
  },
  {
    fileExtensionType: '3g2',
    mediaType: 'video/3gpp2',
    fileCategory: 'video',
    iconUrl: 'mdi-cellphone',
    conversions: VIDEO_CONVERSIONS.filter((c) => c !== '3g2'),
  },

  // --- DISC & BROADCAST (DVD, BluRay, TV) ---
  {
    fileExtensionType: 'vob',
    mediaType: 'video/mpeg',
    fileCategory: 'video',
    iconUrl: 'mdi-disc',
    conversions: VIDEO_CONVERSIONS.filter((c) => c !== 'vob'),
  }, // DVD
  {
    fileExtensionType: 'mpg',
    mediaType: 'video/mpeg',
    fileCategory: 'video',
    iconUrl: 'mdi-disc',
    conversions: VIDEO_CONVERSIONS.filter((c) => c !== 'mpg'),
  },
  {
    fileExtensionType: 'mpeg',
    mediaType: 'video/mpeg',
    fileCategory: 'video',
    iconUrl: 'mdi-disc',
    conversions: VIDEO_CONVERSIONS.filter((c) => c !== 'mpeg'),
  },
  {
    fileExtensionType: 'm2ts',
    mediaType: 'video/mp2t',
    fileCategory: 'video',
    iconUrl: 'mdi-disc-player',
    conversions: VIDEO_CONVERSIONS.filter((c) => c !== 'm2ts'),
  }, // Blu-ray
  {
    fileExtensionType: 'mts',
    mediaType: 'video/mp2t',
    fileCategory: 'video',
    iconUrl: 'mdi-camcorder',
    conversions: VIDEO_CONVERSIONS.filter((c) => c !== 'mts'),
  }, // AVCHD Camcorders
  {
    fileExtensionType: 'ts',
    mediaType: 'video/mp2t',
    fileCategory: 'video',
    iconUrl: 'mdi-satellite-uplink',
    conversions: VIDEO_CONVERSIONS.filter((c) => c !== 'ts'),
  }, // IPTV Stream
  {
    fileExtensionType: 'mxf',
    mediaType: 'application/mxf',
    fileCategory: 'video',
    iconUrl: 'mdi-television-box',
    conversions: VIDEO_CONVERSIONS.filter((c) => c !== 'mxf'),
  }, // Профессиональное ТВ

  // --- OTHERS ---
  {
    fileExtensionType: 'ogv',
    mediaType: 'video/ogg',
    fileCategory: 'video',
    iconUrl: 'mdi-video',
    conversions: VIDEO_CONVERSIONS.filter((c) => c !== 'ogv'),
  },
  {
    fileExtensionType: 'rm',
    mediaType: 'application/vnd.rn-realmedia',
    fileCategory: 'video',
    iconUrl: 'mdi-history',
    conversions: VIDEO_CONVERSIONS.filter((c) => c !== 'rm'),
  }, // RealMedia (90s)
  {
    fileExtensionType: 'rmvb',
    mediaType: 'application/vnd.rn-realmedia-vbr',
    fileCategory: 'video',
    iconUrl: 'mdi-history',
    conversions: VIDEO_CONVERSIONS.filter((c) => c !== 'rmvb'),
  },
  {
    fileExtensionType: 'dv',
    mediaType: 'video/x-dv',
    fileCategory: 'video',
    iconUrl: 'mdi-camcorder-off',
    conversions: VIDEO_CONVERSIONS.filter((c) => c !== 'dv'),
  }, // Digital Video (MiniDV cassettes)
] as const;

export const VIDEO_EXTENSIONS = new Set(VIDEOS.map((i) => i.fileExtensionType));
