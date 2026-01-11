import {Exception} from 'razomy/exceptions/exception';

export class NotImplementedException extends Exception {
  constructor() {
    super('Code under construction.');
  }
}
