import {LinkedList} from 'typescript-collections';
import {Resource} from 'razomy.js/resources/resource.js';
import {AttributeResource} from 'razomy.js/resources/attribute-resource.js';

export class SelectionAttribute extends AttributeResource {
  selection: LinkedList<Resource> = new LinkedList<Resource>();
}