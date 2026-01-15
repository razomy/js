import {JestConfigWithTsJest} from 'ts-jest';

export const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: false,
  roots: ["src"],
  moduleNameMapper: {
    '^razomy/(.*)': '<rootDir>/src/$1',
  }
}
