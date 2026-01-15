import {log_inline} from './log_inline';

export function progress(progress: number, total: number, message: string = 'Loading') {
    const percent = (progress / total) * 100;
    log_inline(`${message}: ${progress}/${total} ${percent.toFixed(2)}%`);
    if (progress >= total) {
    log_inline(`\n${message} complete!\n`);
    }
}
