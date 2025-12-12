import { execSync } from "node:child_process";
import path from "path";

function exec({ command, dir }) {
  console.log(command);
  const result = execSync(command, {
    cwd: path.resolve(dir),
    encoding: "utf-8",
  });
  console.log(result);
  return result;
}

export function shell(command, c: string) {
  exec({ command, dir: c});
}

