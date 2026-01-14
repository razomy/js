export default function is_object<T>(obj: T): obj is T & object {
  return (typeof obj === 'object');
}
