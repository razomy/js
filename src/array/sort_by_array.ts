export function sort_by_array(order: string[], data: string[]) {
  const orderMap = {};
  order.forEach((id, index) => {
    orderMap[id] = index;
  });

// 2. Sort using the map lookup (instant access)
  data.sort((a, b) => {
    return orderMap[a] - orderMap[b];
  });
  return data
}