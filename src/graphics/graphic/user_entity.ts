import {SelectionAttribute}  from 'razomy.js/graphics/graphic/selection_attribute';
import {EntityResource} from 'razomy.js/resources/entity_resource';

export class UserEntity extends EntityResource {
  constructor() {
    super();
    this.resources[SelectionAttribute.type] = new SelectionAttribute();
  }
}
