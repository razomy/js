import {Resource} from 'razomy/resources/resource';
import {AttributeResource} from 'razomy/resources/attribute_resource';
import {LinkedList} from 'razomy/list/linked_list';


export class SelectionAttribute extends AttributeResource {
  selection: LinkedList<Resource> = new LinkedList<Resource>();
}