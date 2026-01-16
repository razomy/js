export function array_sort(order: string[], data: string[]) {
  const order_map = {};
  order.forEach((id, index) => {
    order_map[id] = index;
  });

// 2. Sort using the map lookup (instant access)
  data.sort((a, b) => {
    return order_map[a] - order_map[b];
  });
  return data
}


