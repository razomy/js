export function interpolateFactory(ctx) {
  return (key) => interpolate(ctx.data || [], key) || ''
}

export function interpolate(data, key: string): string {
  return data[key]
}
