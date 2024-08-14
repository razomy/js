function log(error, stdout, stderr) {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
}

export function log_inline(message: string) {
  process.stdout.write(message);
}


export function progress(progress: number, total: number, message: string = 'Loading') {
  const percent = (progress / total) * 100;
  log_inline(`\r${message}: ${progress}/${total} ${percent.toFixed(2)}%`);
  if (progress >= total) {
    log_inline(`\n${message} complete!\n`);
  }
}
