import {Exception} from './exception';

export class NotImplementedException extends Exception {
  constructor() {
    super('Code under construction.');
  }
}
