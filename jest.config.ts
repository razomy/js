import {JestConfigWithTsJest} from 'ts-jest';

const config: JestConfigWithTsJest = {
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
    automock: true,
}
export default config;