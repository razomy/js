import {type FileFormat} from '@razomy/fs.file.format';

// Список форматов, в которые Sharp умеет СОХРАНЯТЬ
const imageWriteTargets = [
  'jpg', 'png', 'webp', 'avif', 'tiff', 'gif',
  // TODO: not working 'heic',
  'ico'
];

// Генератор списка конвертаций (исключает самого себя)
function getConversions (currentExt: string) { return imageWriteTargets.filter(t => t !== currentExt); }


export const images: FileFormat[] = [
  // --- РАСПРОСТРАНЕННЫЕ (Чтение и Запись) ---
  {fileExtensionType: 'jpg', mediaType: 'image/jpeg', fileCategory: 'image', iconUrl: 'mdi-file-image', conversions: getConversions('jpg')},
  {fileExtensionType: 'jpeg', mediaType: 'image/jpeg', fileCategory: 'image', iconUrl: 'mdi-file-image', conversions: getConversions('jpeg')},
  {fileExtensionType: 'png', mediaType: 'image/png', fileCategory: 'image', iconUrl: 'mdi-file-image', conversions: getConversions('png')},
  {fileExtensionType: 'webp', mediaType: 'image/webp', fileCategory: 'image', iconUrl: 'mdi-file-image', conversions: getConversions('webp')},
  {fileExtensionType: 'gif', mediaType: 'image/gif', fileCategory: 'image', iconUrl: 'mdi-file-gif-box', conversions: getConversions('gif')},

  // --- СОВРЕМЕННЫЕ (Чтение и Запись) ---
  {fileExtensionType: 'avif', mediaType: 'image/avif', fileCategory: 'image', iconUrl: 'mdi-star-face', conversions: getConversions('avif')},
  // TODO: not working {fileExtensionType: 'heic', mediaType: 'image/heic', fileCategory: 'image', icon: 'mdi-cellphone', conversions: getConversions('heic')},
  // TODO: not working {fileExtensionType: 'heif', mediaType: 'image/heif', fileCategory: 'image', icon: 'mdi-cellphone', conversions: getConversions('heif')},
  {fileExtensionType: 'tiff', mediaType: 'image/tiff', fileCategory: 'image', iconUrl: 'mdi-printer', conversions: getConversions('tiff')},
  {fileExtensionType: 'tif', mediaType: 'image/tiff', fileCategory: 'image', iconUrl: 'mdi-printer', conversions: getConversions('tif')},

  // --- СПЕЦИФИЧНЫЕ (В них можно сохранять с оговорками) ---
  {fileExtensionType: 'ico', mediaType: 'image/x-icon', fileCategory: 'image', iconUrl: 'mdi-emoticon', conversions: getConversions('ico')},

  // --- ТОЛЬКО ЧТЕНИЕ (Sharp открывает их, но сохраняет только в растр) ---
  // Мы не можем конвертировать PNG -> SVG, но можем SVG -> PNG
  {fileExtensionType: 'svg', mediaType: 'image/svg+xml', fileCategory: 'image', iconUrl: 'mdi-vector-curve', conversions: imageWriteTargets},
  {fileExtensionType: 'bmp', mediaType: 'image/bmp', fileCategory: 'image', iconUrl: 'mdi-image-filter-black-white', conversions: imageWriteTargets},
] as const;