import {isString} from '@razomy/string';

export function acceptLanguagePick(supportedLanguages, acceptLanguage, options) {
  options = options || {};
  if (!supportedLanguages || !supportedLanguages.length || !acceptLanguage) {
    return null;
  }

  if (isString(acceptLanguage)) {
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
