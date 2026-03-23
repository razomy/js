export const m = 1_000_000;
export const batchSale = 2;
export const pricing = {
  cheap: {
    in_: 3 / m,
    out_: 15 / m,
  },
  expensive: {
    in_: 15 / m,
    out_: 75 / m,
  },
};

export function printPrice(results: any[]) {
  let p = 0;

  results.forEach((c) => {
    // Only calculate prices for requests that successfully returned usage data
    if (c.result.type === 'succeeded') {
      const usage = c.result.message.usage;
      const inputTokens = usage.input_tokens || 0;
      const outputTokens = usage.output_tokens || 0;

      // Applying the batch sale (divide by 2)
      const inP_ = (pricing.expensive.in_ * inputTokens) / batchSale;
      const outP_ = (pricing.expensive.out_ * outputTokens) / batchSale;

      p += inP_;
      p += outP_;

      const inP = `in=${inputTokens}=$${inP_.toFixed(5)}`;
      const outP = `ot=${outputTokens}=$${outP_.toFixed(5)}`;
      console.log(`Price tokens [${c.custom_id}] | ${inP} | ${outP}`);
    } else {
      console.log(`Skipped pricing for [${c.custom_id}] - Status: ${c.result.type}`);
    }
  });

  console.log('Total $' + p.toFixed(5));
}
