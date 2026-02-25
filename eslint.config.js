import sharedConfig from '@razomy/eslint-config';

export default [
  ...sharedConfig,
  {
    // Здесь можно переопределить правила конкретно для этого проекта, если нужно
    rules: {
      // 'no-console': 'off'
    },
  },
];
