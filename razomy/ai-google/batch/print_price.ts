const batchSale = 2;
export const prices = {
  expensive: {
    in_: 2 / 200_000 / batchSale,
    out: 12 / 200_000 / batchSale,
  }
}

export function printPrice(result: any[]) {
  let p = 0;
  result.forEach(((c, i) => {
    const inP_ = (prices.expensive.in_ * c.tokens.in_);
    const outP_ = (prices.expensive.out * c.tokens.out);
    p += inP_;
    p += outP_;
    const inP = `in=${c.tokens.in_}=$${inP_.toFixed(5)}`;
    const outP = `ot=${c.tokens.out}=$${outP_.toFixed(5)}`;
    console.log(`Price tokens ${inP} ${outP}`);
  }));
  console.log('Total $' + p.toFixed(5));
}