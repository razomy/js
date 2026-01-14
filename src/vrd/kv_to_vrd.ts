import vrd, {Vrd, VrdOrValue} from 'razomy.vrd/vrd';
export default function kv_to_vrd<T>(arr: [key:string, value:VrdOrValue<T>, order?:number][]): Vrd<T> {
  const m = vrd<T>({});
  for (const [key, value] of arr) {
    m[key] = value;
  }
  return m;
}


