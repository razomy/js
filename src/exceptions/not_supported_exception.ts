
import {ContextError} from 'razomy.js/exceptions/context_error';

export class NotSupportedException extends ContextError {
  constructor(message?: string, ctx: any = null) {
    super(message || 'Not supported to execute exception!', ctx);
  }
}
