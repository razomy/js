import {Observable} from "razomy/observable/observable";

function observe() {
  return new Observable((resolve) => {
    process.on('SIGINT', resolve);
    return () => process.off('SIGINT', resolve);
  });
}

export default observe;
