export interface Logger {
  info(message): void;

  debug(message): void;

  error(message): void;
}

export class NoneLogger implements Logger {
  info(message) {
  }

  debug(message) {
  }

  error(message) {
  }
}

export class ConsoleLogger implements Logger {
  info(message) {
    console.info(message);
  }

  error(message) {
    console.error(message);
  }

  debug(message) {
    console.debug(message);
  }
}
