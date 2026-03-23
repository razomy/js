import * as fss from "@razomy/fss";

export function getFile(filePath: string) {
    return fss.file.getSync(filePath);
}
