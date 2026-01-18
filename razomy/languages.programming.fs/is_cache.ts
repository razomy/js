export const pythonCache = ['__pycache__', '.pytest_cache'];
export const jsAngularCache = ['.angular'];
export const csharpCache = ['obj'];
export const dartCache = ['.dart_tool'];
export const nextCache = ['.next'];
export const nxCache = ['lib'];
export const ideaCache = ['.idea'];
export const nuxtCache = ['.nuxt'];
export const dartFirebaseCache = [
  '.firebase',
  ['flutter', 'ephemeral'],
  ['ios', '.symlinks'],
  // ios
  ['Pods'],
];
export const unityCache = ['Temp', 'Debug'];
export const javaCache = ['.gradle'];

export const knownCache = [
  ...pythonCache,
  ...jsAngularCache,
  ...csharpCache,
  ...dartCache,
  ...nextCache,
  ...nuxtCache,
  ...nxCache,
  ...dartFirebaseCache,
  ...unityCache,
  ...javaCache,
  ...ideaCache,
];

