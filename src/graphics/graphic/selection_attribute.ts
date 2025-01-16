import {Resource} from 'razomy.js/resources/resource';
import {AttributeResource} from 'razomy.js/resources/attribute_resource';
import {LinkedList} from 'razomy.js/list/linked_list';


export class SelectionAttribute extends AttributeResource {
  selection: LinkedList<Resource> = new LinkedList<Resource>();
}