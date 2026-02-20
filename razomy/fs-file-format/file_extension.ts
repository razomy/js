import {Readable} from 'node:stream';

export type FileCategory = 'image' | 'video' | 'audio' | 'document';
export type FileExtensionType = string;
export type MediaType = string;

export interface FileFormat {
  fileExtensionType: FileExtensionType;
  mediaType: MediaType;
  fileCategory: FileCategory;
  iconUrl: string;
  // TODO: generate in runtime based on codecs
  conversions: FileExtensionType[];
}

export interface ExtensionResult {
  stream: Readable;
  mediaType: MediaType;
  fileExtensionType: FileExtensionType;
}
