import * as fsFileFormat from '@razomy/fs-file-format';

export const ALL_AUDIO_TARGETS = [
  'mp3',
  'wav',
  'ogg',
  'm4a',
  'aac',
  'flac',
  'wma',
  'opus',
  'aiff',
  'ac3',
  'dts',
  'amr',
  'voc',
];

export const AUDIO_CONVERSIONS = [...ALL_AUDIO_TARGETS];

export const AUDIOS: fsFileFormat.FileFormat[] = [
  // --- COMMON ---
  {
    fileExtensionType: 'mp3',
    mediaType: 'audio/mpeg',
    fileCategory: 'audio',
    iconUrl: 'mdi-music',
    conversions: AUDIO_CONVERSIONS.filter((c) => c !== 'mp3'),
  },
  {
    fileExtensionType: 'wav',
    mediaType: 'audio/wav',
    fileCategory: 'audio',
    iconUrl: 'mdi-waveform',
    conversions: AUDIO_CONVERSIONS.filter((c) => c !== 'wav'),
  },
  {
    fileExtensionType: 'aac',
    mediaType: 'audio/aac',
    fileCategory: 'audio',
    iconUrl: 'mdi-music-note',
    conversions: AUDIO_CONVERSIONS.filter((c) => c !== 'aac'),
  },
  {
    fileExtensionType: 'm4a',
    mediaType: 'audio/mp4',
    fileCategory: 'audio',
    iconUrl: 'mdi-apple',
    conversions: AUDIO_CONVERSIONS.filter((c) => c !== 'm4a'),
  },
  {
    fileExtensionType: 'ogg',
    mediaType: 'audio/ogg',
    fileCategory: 'audio',
    iconUrl: 'mdi-music-circle',
    conversions: AUDIO_CONVERSIONS.filter((c) => c !== 'ogg'),
  },

  // --- HIGH QUALITY / PRO ---
  {
    fileExtensionType: 'flac',
    mediaType: 'audio/flac',
    fileCategory: 'audio',
    iconUrl: 'mdi-diamond-stone',
    conversions: AUDIO_CONVERSIONS.filter((c) => c !== 'flac'),
  },
  {
    fileExtensionType: 'aiff',
    mediaType: 'audio/x-aiff',
    fileCategory: 'audio',
    iconUrl: 'mdi-music-clef-treble',
    conversions: AUDIO_CONVERSIONS.filter((c) => c !== 'aiff'),
  }, // Apple Lossless (старый)
  {
    fileExtensionType: 'alac',
    mediaType: 'audio/mp4',
    fileCategory: 'audio',
    iconUrl: 'mdi-apple',
    conversions: AUDIO_CONVERSIONS.filter((c) => c !== 'alac'),
  }, // Apple Lossless

  // --- CINEMA / SURROUND ---
  {
    fileExtensionType: 'ac3',
    mediaType: 'audio/ac3',
    fileCategory: 'audio',
    iconUrl: 'mdi-speaker',
    conversions: AUDIO_CONVERSIONS.filter((c) => c !== 'ac3'),
  }, // Dolby Digital
  {
    fileExtensionType: 'dts',
    mediaType: 'audio/vnd.dts',
    fileCategory: 'audio',
    iconUrl: 'mdi-speaker-wireless',
    conversions: AUDIO_CONVERSIONS.filter((c) => c !== 'dts'),
  }, // Digital Theater Systems

  // --- SPECIFIC ---
  {
    fileExtensionType: 'wma',
    mediaType: 'audio/x-ms-wma',
    fileCategory: 'audio',
    iconUrl: 'mdi-windows',
    conversions: AUDIO_CONVERSIONS.filter((c) => c !== 'wma'),
  },
  {
    fileExtensionType: 'opus',
    mediaType: 'audio/opus',
    fileCategory: 'audio',
    iconUrl: 'mdi-access-point',
    conversions: AUDIO_CONVERSIONS.filter((c) => c !== 'opus'),
  },
  {
    fileExtensionType: 'amr',
    mediaType: 'audio/amr',
    fileCategory: 'audio',
    iconUrl: 'mdi-cellphone',
    conversions: AUDIO_CONVERSIONS.filter((c) => c !== 'amr'),
  }, // Nokia / Voice Recorders
  {
    fileExtensionType: 'voc',
    mediaType: 'audio/x-voc',
    fileCategory: 'audio',
    iconUrl: 'mdi-gamepad-variant',
    conversions: AUDIO_CONVERSIONS.filter((c) => c !== 'voc'),
  }, // Creative SoundBlaster (DOS Games)
  {
    fileExtensionType: 'au',
    mediaType: 'audio/basic',
    fileCategory: 'audio',
    iconUrl: 'mdi-server',
    conversions: AUDIO_CONVERSIONS.filter((c) => c !== 'au'),
  }, // Sun Microsystems / Java
] as const;

export const AUDIO_EXTENSIONS = new Set(AUDIOS.map((i) => i.fileExtensionType));
