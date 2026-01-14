
export const regex = /((([a-zA-Z]+(-[a-zA-Z0-9]+){0,2})|\*)(;q=[0-1](\.[0-9]+)?)?)*/g;

export default function accept_language_parse(al) {
  const strings = (al || '').match(regex);
  return strings.map(m => {
    if (!m) {
      return;
    }

    const bits = m.split(';');
    const ietf = bits[0].split('-');
    const has_script = ietf.length === 3;

    return {
      code: ietf[0],
      script: has_script ? ietf[1] : null,
      region: has_script ? ietf[2] : ietf[1],
      quality: bits[1] ? parseFloat(bits[1].split('=')[1]) : 1.0,
    };
  })
    .filter(r => r)
    .sort((a, b) => b.quality - a.quality);
}
