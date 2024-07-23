import {JestConfigWithTsJest} from 'ts-jest';

const config: JestConfigWithTsJest = {
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
    "rootDir": "./",
    moduleDirectories: ['node_modules', 'src'],
    automock: true,
}
export default config;