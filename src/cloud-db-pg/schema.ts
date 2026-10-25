import * as sql from "@razomy/sql";

// 1. Media Types
export const MEDIA_TYPE_DECLARATION = sql.defineTable({
    title: 'Media Types',
    name_: 'media_type',
    description: 'File extensions and their corresponding MIME types',
    record: {
        extension: sql.STRING_32,
        mimeType: sql.STRING_128,
        category: sql.STRING_128,
        isBinary: sql.BOOL,
    },
    index: { category: true, mimeType: true },
    primary: { extension: true },
});

// 2. Unicode & Emojis
export const UNICODE_CHARACTER_DECLARATION = sql.defineTable({
    title: 'Unicode Characters & Emojis',
    name_: 'unicode_character',
    description: 'Unicode characters, glyphs, and emoji metadata',
    record: {
        codePoint: sql.STRING_16, // e.g., "U+1F680"
        glyph: sql.STRING_16,
        name: sql.STRING_255,
        category: sql.STRING_128,
        i18n: sql.i18N<{ name: string; category: string }>(),
    },
    index: { category: true, name: true },
    primary: { codePoint: true },
});

// 3. Programming Languages
export const PROGRAMMING_LANGUAGE_DECLARATION = sql.defineTable({
    title: 'Programming Languages',
    name_: 'programming_language',
    description: 'List of programming languages, paradigms, and file extensions',
    record: {
        slug: sql.STRING_128,
        name: sql.STRING_128,
        extensions: sql.STRING_ARRAY, // Нативный VARCHAR(64)[] в Postgres
        paradigm: sql.STRING_255,
        i18n: sql.i18N<{ paradigm: string }>(),
    },
    index: { name: true },
    primary: { slug: true },
});

// 4. Countries
export const COUNTRY_DECLARATION = sql.defineTable({
    title: 'Countries',
    name_: 'country',
    description: 'ISO country codes, dial codes, and currencies',
    record: {
        alpha2: sql.CHAR_2,
        alpha3: sql.CHAR_3,
        numericCode: sql.CHAR_3,
        name: sql.STRING_255,
        dialCode: sql.STRING_16,
        currencyCode: sql.CHAR_3,
        i18n: sql.i18N<{ name: string }>(),
    },
    index: { alpha3: true, currencyCode: true, name: true },
    primary: { alpha2: true },
});

// 5. Locales and Languages (BCP 47)
export const LOCALE_DECLARATION = sql.defineTable({
    title: 'Locales (BCP 47)',
    name_: 'locale',
    description: 'IETF BCP 47 language tags and locale configurations',
    record: {
        localeCode: sql.STRING_32,
        language: sql.STRING_128,
        territory: sql.STRING_128,
        script: sql.STRING_16,
        isRtl: sql.BOOL,
        i18n: sql.i18N<{ language: string; territory: string }>(),
    },
    index: { language: true, territory: true },
    primary: { localeCode: true },
});

// 6. Jobs & Occupations
export const OCCUPATION_DECLARATION = sql.defineTable({
    title: 'Occupations',
    name_: 'occupation',
    description: 'Standard Occupational Classification (SOC) jobs and departments',
    record: {
        socCode: sql.STRING_16,
        name: sql.STRING_255,
        department: sql.STRING_128,
        i18n: sql.i18N<{ name: string; department: string }>(),
    },
    index: { department: true, name: true },
    primary: { socCode: true },
});

// 7. Currencies & Financial Data
export const CURRENCY_DECLARATION = sql.defineTable({
    title: 'Currencies',
    name_: 'currency',
    description: 'ISO 4217 currency codes, symbols, and decimal precision',
    record: {
        currencyCode: sql.CHAR_3,
        name: sql.STRING_128,
        symbol: sql.STRING_16,
        decimals: sql.SMALLINT,
        countries: { type: 'Char', length: 2, isArray: true, default_: '{}' }, // CHAR(2)[]
        i18n: sql.i18N<{ name: string }>(),
    },
    index: { name: true },
    primary: { currencyCode: true },
});

// 8. Timezones
export const TIMEZONE_DECLARATION = sql.defineTable({
    title: 'Timezones',
    name_: 'timezone',
    description: 'IANA timezones and UTC offsets',
    record: {
        tzIdentifier: sql.STRING_128,
        utcOffset: sql.STRING_16,
        hasDst: sql.BOOL,
    },
    index: { utcOffset: true },
    primary: { tzIdentifier: true },
});

// 9. Postal & Zip Code Formats
export const POSTAL_FORMAT_DECLARATION = sql.defineTable({
    title: 'Postal Code Formats',
    name_: 'postal_format',
    description: 'Regex validation patterns and examples for postal codes by country',
    record: {
        alpha2: sql.CHAR_2,
        regexPattern: sql.STRING_255,
        formatExample: sql.STRING_128,
    },
    index: {},
    primary: { alpha2: true },
});

// 10. Phone Number Dialing Codes
export const TELECOM_PREFIX_DECLARATION = sql.defineTable({
    title: 'Telecom Prefixes',
    name_: 'telecom_prefix',
    description: 'International téléphone dialing codes and number lengths',
    record: {
        alpha2: sql.CHAR_2,
        countryName: sql.STRING_255,
        dialCode: sql.STRING_16,
        nationalNumberLength: sql.SMALLINT,
        i18n: sql.i18N<{ countryName: string }>(),
    },
    index: { dialCode: true },
    primary: { alpha2: true },
});

// 11. Colors
export const COLOR_DECLARATION = sql.defineTable({
    title: 'Colors',
    name_: 'color',
    description: 'Color palettes with HEX, RGB, and HSL representations',
    record: {
        hexCode: { type: 'String', length: 9 }, // Включая альфа-канал #RRGGBBAA
        name: sql.STRING_128,
        rgbValue: sql.STRING_32,
        hslValue: sql.STRING_32,
        i18n: sql.i18N<{ name: string }>(),
    },
    index: { name: true },
    primary: { hexCode: true },
});

// 12. Domain TLDs
export const TOP_LEVEL_DOMAIN_DECLARATION = sql.defineTable({
    title: 'Top-Level Domains',
    name_: 'top_level_domain',
    description: 'IANA root zone database of TLDs and registries',
    record: {
        tld: sql.STRING_64, // С учетом длинных punycode TLD
        category: sql.STRING_32,
        registry: sql.STRING_255,
    },
    index: { category: true },
    primary: { tld: true },
});

// 13. User-Agent Strings & Browsers
export const USER_AGENT_DECLARATION = sql.defineTable({
    title: 'User Agents',
    name_: 'user_agent',
    description: 'Browser, OS, and device User-Agent strings',
    record: {
        userAgentString: sql.TEXT,
        browser: sql.STRING_128,
        operatingSystem: sql.STRING_128,
        deviceType: sql.STRING_32,
    },
    index: { browser: true, operatingSystem: true, deviceType: true },
    primary: { userAgentString: true },
});

// 14. Units of Measurement
export const MEASUREMENT_UNIT_DECLARATION = sql.defineTable({
    title: 'Measurement Units',
    name_: 'measurement_unit',
    description: 'Physical units of measurement and SI base equivalents',
    record: {
        symbol: sql.STRING_32,
        name: sql.STRING_128,
        dimension: sql.STRING_128,
        siBaseUnit: sql.STRING_32,
        i18n: sql.i18N<{ name: string; dimension: string }>(),
    },
    index: { dimension: true, name: true },
    primary: { symbol: true },
});

// 15. Universities & Higher Education
export const UNIVERSITY_DECLARATION = sql.defineTable({
    title: 'Universities',
    name_: 'university',
    description: 'World universities, domains, and official websites',
    record: {
        domain: sql.STRING_255,
        name: sql.STRING_255,
        countryName: sql.STRING_255,
        websiteUrl: sql.TEXT,
        i18n: sql.i18N<{ name: string; countryName: string }>(),
    },
    index: { countryName: true, name: true },
    primary: { domain: true },
});

// 16. Airports
export const AIRPORT_DECLARATION = sql.defineTable({
    title: 'Airports',
    name_: 'airport',
    description: 'Global airports with IATA and ICAO codes',
    record: {
        iataCode: sql.CHAR_3,
        icaoCode: { type: 'Char', length: 4 },
        name: sql.STRING_255,
        cityName: sql.STRING_255,
        countryName: sql.STRING_255,
        i18n: sql.i18N<{ name: string; cityName: string; countryName: string }>(),
    },
    index: { icaoCode: true, countryName: true, cityName: true },
    primary: { iataCode: true },
});

// 17. HTTP Status Codes
export const HTTP_STATUS_DECLARATION = sql.defineTable({
    title: 'HTTP Status Codes',
    name_: 'http_status',
    description: 'Standard HTTP response status codes and descriptions',
    record: {
        statusCode: sql.SMALLINT,
        reasonPhrase: sql.STRING_128,
        category: sql.STRING_128,
        description: sql.TEXT,
        i18n: sql.i18N<{ reasonPhrase: string; description: string }>(),
    },
    index: { category: true },
    primary: { statusCode: true },
});

// 18. Zodiac & Astrology
export const ZODIAC_SIGN_DECLARATION = sql.defineTable({
    title: 'Zodiac Signs',
    name_: 'zodiac_sign',
    description: 'Astrological zodiac signs, elements, and date ranges',
    record: {
        name: sql.STRING_32,
        element: sql.STRING_16,
        symbol: sql.STRING_32,
        dateRange: sql.STRING_32,
        i18n: sql.i18N<{ name: string; element: string }>(),
    },
    index: { element: true },
    primary: { name: true },
});

// ==========================================
// Список всех таблиц
// ==========================================
export const TABLES: Record<string, sql.TableDeclaration<any>> = {
    MEDIA_TYPE_DECLARATION,
    UNICODE_CHARACTER_DECLARATION,
    PROGRAMMING_LANGUAGE_DECLARATION,
    COUNTRY_DECLARATION,
    LOCALE_DECLARATION,
    OCCUPATION_DECLARATION,
    CURRENCY_DECLARATION,
    TIMEZONE_DECLARATION,
    POSTAL_FORMAT_DECLARATION,
    TELECOM_PREFIX_DECLARATION,
    COLOR_DECLARATION,
    TOP_LEVEL_DOMAIN_DECLARATION,
    USER_AGENT_DECLARATION,
    MEASUREMENT_UNIT_DECLARATION,
    UNIVERSITY_DECLARATION,
    AIRPORT_DECLARATION,
    HTTP_STATUS_DECLARATION,
    ZODIAC_SIGN_DECLARATION,
};

/** Если таблица удалена из Tables, добавь её имя сюда, чтобы сгенерировался DROP TABLE */
export const DROPPED_TABLES: string[] = [];