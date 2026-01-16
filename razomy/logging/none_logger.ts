export interface Logger {
  info(message: string): void;
  debug(message: string): void;
  error(message: string): void;
}

export class NoneLogger implements Logger {
  info(message: string) { }

  debug(message: string) { }

  error(message: string) { }
}

