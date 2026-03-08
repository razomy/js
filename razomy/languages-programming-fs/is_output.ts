export const jsOutput = ['dist'];
export const javaOutput = ['out'];
export const pythonOutput = ['build'];
export const nuxtOutput = ['.output'];
export const rustOutput = ['target'];
export const e2EOutput = ['test-results'];
export const razomyOutput = ['_releases'];
export const cOutput = ['cmake-build-debug'];

export const knownOutput = [
  ...jsOutput,
  ...javaOutput,
  ...pythonOutput,
  ...rustOutput,
  ...razomyOutput,
  ...nuxtOutput,
  ...cOutput,
  ...e2EOutput,
];
