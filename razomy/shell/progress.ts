import * as shell from "@razomy/shell";

export function progress(progress: number, total: number, message: string = 'Loading') {
  const percent = (progress / total) * 100;
  shell.logInline(`${message}: ${progress}/${total} ${percent.toFixed(2)}%`);
  if (progress >= total) {
    shell.logInline(`\n${message} complete!\n`);
  }
}
