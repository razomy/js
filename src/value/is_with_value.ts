import {ArgumentException} from 'razomy.exceptions/argument_exception';
import {WithValue} from 'razomy.value/with_value';

export default function is_with_value<T extends WithValue<T>>(node: T): node is T {
  if ('value' in node) {
    return true;
  }
  throw new ArgumentException("data must have file name", node);
}


