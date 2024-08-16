import {is_string} from "razomy.js/string/is_string";

const regex = /((([a-zA-Z]+(-[a-zA-Z0-9]+){0,2})|\*)(;q=[0-1](\.[0-9]+)?)?)*/g;

export function accept_language_parse(al) {
  const strings = (al || '').match(regex);
  return strings.map(m => {
    if (!m) {
      return;
    }

    const bits = m.split(';');
    const ietf = bits[0].split('-');
    const hasScript = ietf.length === 3;

    return {
      code: ietf[0],
      script: hasScript ? ietf[1] : null,
      region: hasScript ? ietf[2] : ietf[1],
      quality: bits[1] ? parseFloat(bits[1].split('=')[1]) : 1.0,
    };
  })
    .filter(r => r)
    .sort((a, b) => b.quality - a.quality);
}

export function accept_language_pick(supportedLanguages, acceptLanguage, options) {
  options = options || {};

  if (!supportedLanguages || !supportedLanguages.length || !acceptLanguage) {
    return null;
  }

  if (is_string(acceptLanguage)) {
    // TODO: Unkbown parce function CODE: acceptLanguage = parse(acceptLanguage);
  }

  const supported = supportedLanguages.map(support => {
    const bits = support.split('-');
    const hasScript = bits.length === 3;

    return {
      code: bits[0],
      script: hasScript ? bits[1] : null,
      region: hasScript ? bits[2] : bits[1],
    };
  });

  for (let i = 0; i < acceptLanguage.length; i++) {
    const lang = acceptLanguage[i];
    const langCode = lang.code.toLowerCase();
    const langRegion = lang.region ? lang.region.toLowerCase() : lang.region;
    const langScript = lang.script ? lang.script.toLowerCase() : lang.script;
    for (let j = 0; j < supported.length; j++) {
      const supportedCode = supported[j].code.toLowerCase();
      const supportedScript = supported[j].script ? supported[j].script.toLowerCase() : supported[j].script;
      const supportedRegion = supported[j].region ? supported[j].region.toLowerCase() : supported[j].region;
      if (langCode === supportedCode &&
        (options.loose || !langScript || langScript === supportedScript) &&
        (options.loose || !langRegion || langRegion === supportedRegion)) {
        return supportedLanguages[j];
      }
    }
  }

  return null;
}
