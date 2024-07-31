import {SelectionAttribute}  from 'razomy.js/graphics/graphic/selection-attribute';
import {EntityResource} from 'razomy.js/resources/entity-resource';

export class UserEntity extends EntityResource {
  constructor() {
    super();
    this.resources[SelectionAttribute.type] = new SelectionAttribute();
  }
}
