import {Readable} from 'node:stream';

export type FileTypeCategory = 'image' | 'video' | 'audio' | 'document';

export interface FileExtension {
  ext: string;
  mime: string;
  category: FileTypeCategory;
  icon: string;
  // TODO: generate in runtime based on codecs
  conversions: string[];
}

export interface FileExtensionResult {
  stream: Readable;
  mime: string;
  ext: string;
}
