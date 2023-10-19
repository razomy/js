import AttributeResource from '../Resources/AttributeResource.js';
import Resource from '../Resources/Resource.js';
import { LinkedList } from 'typescript-collections';

export class SelectionAttribute extends AttributeResource {
  selection: LinkedList<Resource> = new LinkedList<Resource>();
}
