import {Observable} from 'razomy.observable/observable';

export default function observe() {
  return new Observable((resolve) => {
    process.on('SIGINT', resolve);
    return () => process.off('SIGINT', resolve);
  });
}


