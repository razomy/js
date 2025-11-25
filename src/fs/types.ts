import path from "path";

export const text_buffer_types = {
  'rn': "utf-8",
  'txt': "utf-8",
} as const satisfies Record<string, BufferEncoding>;

export const mixed_buffer_types = {
  'pdf': "base64",
  'pages': "base64",
  'doc': "base64",
  'xlsx': "base64",
  'docx': "base64",
} as const satisfies Record<string, BufferEncoding>;

export const programming_languages_buffer_types = {
  'css': "utf-8",
  'json': "utf-8",
  'sql': "utf-8",
  'svg': "utf-8",
  'cs': "utf-8",
  'py': "utf-8",
  'gradle': "utf-8",
  'md': "utf-8",
  'c': "utf-8",
  'h': "utf-8",
  'm': "utf-8",
  // web
  'js': "utf-8",
  'ts': "utf-8",
  'scss': "utf-8",
  'svelte': "utf-8",
  'vue': "utf-8",
  'rs': "utf-8",
  'java': "utf-8",
  'yml': "utf-8",
  'yaml': "utf-8",
  'env': "utf-8",
  'sh': "utf-8",
  'mjs': "utf-8",
  'toml': "utf-8",
  'tsx': "utf-8",
  'go': "utf-8",

  'drawio': "utf-8",
  'swift': "utf-8",
  'csv': "utf-8",
  'html': "utf-8",
  'xml': "utf-8",
  'crt': "utf-8",
  'asmdef': "utf-8",
  'csproj': "utf-8",
  'anim': "utf-8",
} as const satisfies Record<string, BufferEncoding>;

export const unity_buffer_types = {
  'asset': "utf-8",
  'prefab': "utf-8",
  'shader': "utf-8",
  'meta': "utf-8",
  'unity': "utf-8",
  'mat': "utf-8",
  'fbx': "base64",
} as const satisfies Record<string, BufferEncoding>;

export const images_buffer_types = {
  'jpeg': "base64",
  'webp': "base64",
  'jpg': "base64",
  'png': "base64",
} as const satisfies Record<string, BufferEncoding>;

export const video_buffer_types = {
  'mp3': "base64",
  'mp4': "base64",
} as const satisfies Record<string, BufferEncoding>;

export const buffer_types = {
  ...text_buffer_types,
  ...mixed_buffer_types,
  ...programming_languages_buffer_types,
  ...unity_buffer_types,
  ...images_buffer_types,
  ...video_buffer_types,
} as const satisfies Record<string, BufferEncoding>;

export type TypeFs = keyof typeof buffer_types;

export const uniq_programming_buffer_name = {
  'Dockerfile': "utf-8",
  '.gitignore': "utf-8",
  '.npmrc': "utf-8",
  '.env': "utf-8",
  'LICENSE': "utf-8",
} as const satisfies Record<string, BufferEncoding>;


export function is_supported_file_types(path_: string) {
  const type_ = path.extname(path_) as TypeFs;
  return buffer_types.hasOwnProperty(type_.substring(1)) ||
    uniq_programming_buffer_name.hasOwnProperty(path.basename(path_));
}