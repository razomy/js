
export function set_weight(ctx) {
    const updated = {
            temperature: 1,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          };
    Object.assign(ctx, updated);
}
