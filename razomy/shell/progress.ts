import {logInline} from './log_inline';

export function progress(progress: number, total: number, message: string = 'Loading') {
  const percent = (progress / total) * 100;
  logInline(`${message}: ${progress}/${total} ${percent.toFixed(2)}%`);
  if (progress >= total) {
    logInline(`\n${message} complete!\n`);
  }
}
