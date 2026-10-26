import * as runNode from "@razomy/run/node";

export async function start() {
  return runNode.cli.startIt(process.argv.slice(2) as [string, string, string]);
}
