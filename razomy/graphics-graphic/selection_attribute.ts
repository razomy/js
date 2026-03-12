import { LinkedList } from '@razomy/structures';
import { AttributeResource, ObjectResource } from '@razomy/resources';

export class SelectionAttribute extends AttributeResource {
  selection: LinkedList<ObjectResource> = new LinkedList<ObjectResource>();
}
