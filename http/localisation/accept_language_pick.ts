import {is_string} from 'razomy.string/is_string';

export function accept_language_pick(supported_languages, accept_language, options) {
    options = options || {};
    if (!supported_languages || !supported_languages.length || !accept_language) {
    return null;
    }

    if (is_string(accept_language)) {
    // TODO: Unkbown parce function CODE: acceptLanguage = parse(acceptLanguage);
    }

    const supported = supported_languages.map(support => {
            const bits = support.split('-');
            const has_script = bits.length === 3;

            return {
              code: bits[0],
              script: has_script ? bits[1] : null,
              region: has_script ? bits[2] : bits[1],
            };
          });
    for (let i = 0; i < accept_language.length; i++) {
    const lang = accept_language[i];
    const lang_code = lang.code.toLowerCase();
    const lang_region = lang.region ? lang.region.toLowerCase() : lang.region;
    const lang_script = lang.script ? lang.script.toLowerCase() : lang.script;
    for (let j = 0; j < supported.length; j++) {
      const supported_code = supported[j].code.toLowerCase();
      const supported_script = supported[j].script ? supported[j].script.toLowerCase() : supported[j].script;
      const supported_region = supported[j].region ? supported[j].region.toLowerCase() : supported[j].region;
      if (lang_code === supported_code &&
        (options.loose || !lang_script || lang_script === supported_script) &&
        (options.loose || !lang_region || lang_region === supported_region)) {
        return supported_languages[j];
      }
    }
    }

    return null;
}
