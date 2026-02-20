import {AttributeResource, ObjectResource} from '@razomy/resources';
import {LinkedList} from '@razomy/list';


export class SelectionAttribute extends AttributeResource {
  selection: LinkedList<ObjectResource> = new LinkedList<ObjectResource>();
}