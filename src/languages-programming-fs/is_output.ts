export const JS_OUTPUT = ['dist'];
export const JAVA_OUTPUT = ['out'];
export const PYTHON_OUTPUT = ['build'];
export const NUXT_OUTPUT = ['.output'];
export const RUST_OUTPUT = ['target'];
export const E2EOUTPUT = ['test-results'];
export const RAZOMY_OUTPUT = ['_releases'];
export const C_OUTPUT = ['cmake-build-debug'];

export const KNOWN_OUTPUT = [
  ...JS_OUTPUT,
  ...JAVA_OUTPUT,
  ...PYTHON_OUTPUT,
  ...RUST_OUTPUT,
  ...RAZOMY_OUTPUT,
  ...NUXT_OUTPUT,
  ...C_OUTPUT,
  ...E2EOUTPUT,
];
