import * as logging from "@razomy/logging";

export class ConsoleLogger implements logging.Logger {
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
