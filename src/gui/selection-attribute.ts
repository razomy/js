import AttributeResource from '../resources/attribute-resource.js';
import Resource from '../resources/resource.js';
import { LinkedList } from 'typescript-collections';

export class SelectionAttribute extends AttributeResource {
  selection: LinkedList<Resource> = new LinkedList<Resource>();
}