import AttributeResource from '../Resources/AttributeResource';
import Resource from '../Resources/Resource';
import { LinkedList } from 'typescript-collections';

export class SelectionAttribute extends AttributeResource {
  selection: LinkedList<Resource> = new LinkedList<Resource>();
}
