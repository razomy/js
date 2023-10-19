import { EntityResource } from '../Resources/EntityResource.js';
import { SelectionAttribute } from './SelectionAttribute.js';

export class UserEntity extends EntityResource {
  constructor() {
    super();
    this.resources[SelectionAttribute.type] = new SelectionAttribute();
  }
}
