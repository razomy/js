import {LinkedList} from 'typescript-collections';
import {Resource} from 'razomy.js/resources/resource';
import {AttributeResource} from 'razomy.js/resources/attribute_resource';

export class SelectionAttribute extends AttributeResource {
  selection: LinkedList<Resource> = new LinkedList<Resource>();
}