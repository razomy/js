import {Exception} from '@razomy/exceptions';

export class NotImplementedException extends Exception {
  constructor() {
    super('Code under construction.');
  }
}
