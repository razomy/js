import type {Logger} from './none_logger';

export class ConsoleLogger implements Logger {
  info(message: string) {
    console.info(message);
  }

  error(message: string) {
    console.error(message);
  }

  debug(message: string) {
    console.debug(message);
  }
}