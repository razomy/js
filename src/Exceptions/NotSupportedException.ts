import ContextError from './ContextError';

export default class NotSupportedException extends ContextError {
  constructor(message?: string, ctx: any = null) {
    super(message || 'Not supported to execute exception!', ctx);
  }
}
