import {ObjectResource} from 'razomy.resources/object_resource';
import {AttributeResource} from 'razomy.resources/attribute_resource';
import {LinkedList} from 'razomy.list/linked_list';


export class SelectionAttribute extends AttributeResource {
  selection: LinkedList<ObjectResource> = new LinkedList<ObjectResource>();
}