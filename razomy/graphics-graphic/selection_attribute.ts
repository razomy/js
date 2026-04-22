import * as structures from '@razomy/structures';
import * as resources from '@razomy/resources';

export class SelectionAttribute extends resources.AttributeResource {
  selection: structures.LinkedList<resources.AObjectResource> = new structures.LinkedList<resources.AObjectResource>();
}
