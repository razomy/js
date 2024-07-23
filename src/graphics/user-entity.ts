
import { EntityResource } from '../resources/entity-resource.js';
import { SelectionAttribute } from './selection-attribute.js';

export class UserEntity extends EntityResource {
  constructor() {
    super();
    this.resources[SelectionAttribute.type] = new SelectionAttribute();
  }
}
