import { EntityResource } from '../Resources/EntityResource';
import { SelectionAttribute } from './SelectionAttribute';

export class UserEntity extends EntityResource {
  constructor() {
    super();
    this.resources[SelectionAttribute.type] = new SelectionAttribute();
  }
}
