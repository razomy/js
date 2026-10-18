import * as abstractions from "@razomy/abstractions";

export function observe(): abstractions.patterns.IObservableFactory {
  return (resolve) => {
    process.on('SIGINT', resolve);
    return () => process.off('SIGINT', resolve);
  };
}
