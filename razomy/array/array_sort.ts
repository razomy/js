export function arraySort(oldOrder: string[], newOrder: string[]) {
  const orderMap = {};
  newOrder.forEach((id, index) => {
    orderMap[id] = index;
  });

// 2. Sort using the map lookup (instant access)
  oldOrder.sort((a, b) => {
    return orderMap[a] - orderMap[b];
  });
  return oldOrder
}


