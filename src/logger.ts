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