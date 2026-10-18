import * as exceptions from '@razomy/exceptions';

export class NotImplementedException extends exceptions.AException {
  constructor() {
    super('Code under construction.');
  }
}
