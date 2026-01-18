import {SelectionAttribute} from 'razomy.graphics.graphic';
import {EntityResource} from 'razomy.resources';

export class UserEntity extends EntityResource {
  constructor() {
    super();
    this.resources[SelectionAttribute.type] = new SelectionAttribute();
  }
}
