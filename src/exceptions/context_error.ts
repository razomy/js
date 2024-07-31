export class ContextError extends Error {
  constructor(message?: string, args: any = {}) {
    console.error(message, args);
    super(message + ` args: ${args}`);
  }
}
