import {JestConfigWithTsJest} from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: false,
  roots: ["src"],
  moduleNameMapper: {
    '^razomy.js/(.*)': '<rootDir>/src/$1',
  }
}
export default config;