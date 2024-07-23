export class ContextError extends Error {
  public ctx: any;

  constructor(message?: string, ctx: any = {}) {
    super();
    this.message = message || '';
    this.ctx = ctx || {};
  }
}
