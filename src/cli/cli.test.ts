import {cli} from "razomy.js/cli/cli";
import {Module} from "razomy.js/cli/module";

const TestModule = {
    ["test:test1"]: () => Promise.resolve(0),
    ["test:test2"]: (a: string) => Promise.resolve(0),
    ["test:test3"]: (a: string, b: string) => Promise.resolve(0),
} as const satisfies Module;

cli(["test:test1"]);
cli(["test:test2", "a"]);
cli(["test:test3", "a", "b"]);