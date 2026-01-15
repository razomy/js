export const js_output = ['dist'];
export const java_output = ['out'];
export const python_output = ['build'];
export const nuxt_output = ['.output'];
export const rust_output = ['target'];
export const e_2_e_output = ['test-results'];
export const razomy_output = ['_releases'];
export const c_output = ['cmake-build-debug'];

export const known_output = [
  ...js_output,
  ...java_output,
  ...python_output,
  ...rust_output,
  ...razomy_output,
  ...nuxt_output,
  ...c_output,
  ...e_2_e_output,
];
