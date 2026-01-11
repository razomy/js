import {SelectionAttribute}  from 'razomy/graphics/graphic/selection_attribute';
import {EntityResource} from 'razomy/resources/entity_resource';

export class UserEntity extends EntityResource {
  constructor() {
    super();
    this.resources[SelectionAttribute.type] = new SelectionAttribute();
  }
}
