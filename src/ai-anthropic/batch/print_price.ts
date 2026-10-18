export const M = 1_000_000;
export const BATCH_SALE = 2;
export const PRICING = {
  cheap: {
    in_: 3 / M,
    out_: 15 / M,
  },
  expensive: {
    in_: 15 / M,
    out_: 75 / M,
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
      const inP_ = (PRICING.expensive.in_ * inputTokens) / BATCH_SALE;
      const outP_ = (PRICING.expensive.out_ * outputTokens) / BATCH_SALE;

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
