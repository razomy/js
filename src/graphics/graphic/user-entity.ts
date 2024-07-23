import {SelectionAttribute} from './selection-attribute';
import {EntityResource} from 'razomy.js/resources/entity-resource.js';

export class UserEntity extends EntityResource {
  constructor() {
    super();
    this.resources[SelectionAttribute.type] = new SelectionAttribute();
  }
}
