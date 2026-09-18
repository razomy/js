import * as abstracts from "@razomy/abstracts";

export function observe(): abstracts.patterns.IObservableFactory {
  return (resolve) => {
    process.on('SIGINT', resolve);
    return () => process.off('SIGINT', resolve);
  };
}
