import fs from "fs";
import {IGate} from "razomy.js/gate/i_gate";


export class FileGate<T extends string> implements IGate<T> {
    constructor(private readonly filePath: string) {
    }

    get(): T {
        if (fs.existsSync(this.filePath)) {
            return fs.readFileSync(this.filePath, "utf-8") as T;
        }
        throw new Error("Unable to parse file data.");
    }

    set(state: T): void {
        fs.writeFileSync(this.filePath, state);
    }
}
