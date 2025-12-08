import {Exception} from 'razomy.js/exceptions/exception';

export class NotImplementedException extends Exception {
  constructor() {
    super('Code under construction.');
  }
}
