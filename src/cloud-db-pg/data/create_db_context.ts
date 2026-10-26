// ⚠️ АВТОГЕНЕРИРУЕМЫЙ ФАЙЛ ИЗ schema.ts. НЕ РЕДАКТИРОВАТЬ ВРУЧНУЮ!
import * as sql from "@razomy/sql";


// ============================================================================
// Entity: Media Types (table: "media_type")
// ============================================================================

export interface MediaTypeProps {
    extension: string;
    mimeType: string;
    category: string;
    isBinary?: boolean;
}

export interface MediaTypeRow {
    extension: string;
    mime_type: string;
    category: string;
    is_binary: boolean;
}

export const MEDIA_TYPE_META = {
    tableName: 'media_type',
    pkField: 'extension' as keyof MediaTypeProps,
    pkCol: 'extension',
    fields: {
        extension: { col: 'extension', type: 'String', isArray: false, maxLength: 32, nullable: false, hasDefault: false },
        mimeType: { col: 'mime_type', type: 'String', isArray: false, maxLength: 128, nullable: false, hasDefault: false },
        category: { col: 'category', type: 'String', isArray: false, maxLength: 128, nullable: false, hasDefault: false },
        isBinary: { col: 'is_binary', type: 'Bool', isArray: false, maxLength: 0, nullable: false, hasDefault: true }
    }
} as const;

export type MediaTypeEntity = sql.entity.EntityProxy<MediaTypeProps, MediaTypeRow>;

export type MediaTypeRepository = sql.entity.EntityRepository<MediaTypeProps, MediaTypeRow, string>;


// ============================================================================
// Entity: Unicode Characters & Emojis (table: "unicode_character")
// ============================================================================

export interface UnicodeCharacterProps {
    codePoint: string;
    glyph: string;
    name: string;
    category: string;
    i18n?: Record<string, unknown> | unknown[];
}

export interface UnicodeCharacterRow {
    code_point: string;
    glyph: string;
    name: string;
    category: string;
    i18n: Record<string, unknown> | unknown[];
}

export const UNICODE_CHARACTER_META = {
    tableName: 'unicode_character',
    pkField: 'codePoint' as keyof UnicodeCharacterProps,
    pkCol: 'code_point',
    fields: {
        codePoint: { col: 'code_point', type: 'String', isArray: false, maxLength: 16, nullable: false, hasDefault: false },
        glyph: { col: 'glyph', type: 'String', isArray: false, maxLength: 16, nullable: false, hasDefault: false },
        name: { col: 'name', type: 'String', isArray: false, maxLength: 255, nullable: false, hasDefault: false },
        category: { col: 'category', type: 'String', isArray: false, maxLength: 128, nullable: false, hasDefault: false },
        i18n: { col: 'i18n', type: 'Jsonb', isArray: false, maxLength: 0, nullable: false, hasDefault: true }
    }
} as const;

export type UnicodeCharacterEntity = sql.entity.EntityProxy<UnicodeCharacterProps, UnicodeCharacterRow>;

export type UnicodeCharacterRepository = sql.entity.EntityRepository<UnicodeCharacterProps, UnicodeCharacterRow, string>;


// ============================================================================
// Entity: Programming Languages (table: "programming_language")
// ============================================================================

export interface ProgrammingLanguageProps {
    slug: string;
    name: string;
    extensions?: string[];
    paradigm: string;
    i18n?: Record<string, unknown> | unknown[];
}

export interface ProgrammingLanguageRow {
    slug: string;
    name: string;
    extensions: string[];
    paradigm: string;
    i18n: Record<string, unknown> | unknown[];
}

export const PROGRAMMING_LANGUAGE_META = {
    tableName: 'programming_language',
    pkField: 'slug' as keyof ProgrammingLanguageProps,
    pkCol: 'slug',
    fields: {
        slug: { col: 'slug', type: 'String', isArray: false, maxLength: 128, nullable: false, hasDefault: false },
        name: { col: 'name', type: 'String', isArray: false, maxLength: 128, nullable: false, hasDefault: false },
        extensions: { col: 'extensions', type: 'String', isArray: true, maxLength: 64, nullable: false, hasDefault: true },
        paradigm: { col: 'paradigm', type: 'String', isArray: false, maxLength: 255, nullable: false, hasDefault: false },
        i18n: { col: 'i18n', type: 'Jsonb', isArray: false, maxLength: 0, nullable: false, hasDefault: true }
    }
} as const;

export type ProgrammingLanguageEntity = sql.entity.EntityProxy<ProgrammingLanguageProps, ProgrammingLanguageRow>;

export type ProgrammingLanguageRepository = sql.entity.EntityRepository<ProgrammingLanguageProps, ProgrammingLanguageRow, string>;


// ============================================================================
// Entity: Countries (table: "country")
// ============================================================================

export interface CountryProps {
    alpha2: string;
    alpha3: string;
    numericCode: string;
    name: string;
    dialCode: string;
    currencyCode: string;
    i18n?: Record<string, unknown> | unknown[];
}

export interface CountryRow {
    alpha2: string;
    alpha3: string;
    numeric_code: string;
    name: string;
    dial_code: string;
    currency_code: string;
    i18n: Record<string, unknown> | unknown[];
}

export const COUNTRY_META = {
    tableName: 'country',
    pkField: 'alpha2' as keyof CountryProps,
    pkCol: 'alpha2',
    fields: {
        alpha2: { col: 'alpha2', type: 'Char', isArray: false, maxLength: 2, nullable: false, hasDefault: false },
        alpha3: { col: 'alpha3', type: 'Char', isArray: false, maxLength: 3, nullable: false, hasDefault: false },
        numericCode: { col: 'numeric_code', type: 'Char', isArray: false, maxLength: 3, nullable: false, hasDefault: false },
        name: { col: 'name', type: 'String', isArray: false, maxLength: 255, nullable: false, hasDefault: false },
        dialCode: { col: 'dial_code', type: 'String', isArray: false, maxLength: 16, nullable: false, hasDefault: false },
        currencyCode: { col: 'currency_code', type: 'Char', isArray: false, maxLength: 3, nullable: false, hasDefault: false },
        i18n: { col: 'i18n', type: 'Jsonb', isArray: false, maxLength: 0, nullable: false, hasDefault: true }
    }
} as const;

export type CountryEntity = sql.entity.EntityProxy<CountryProps, CountryRow>;

export type CountryRepository = sql.entity.EntityRepository<CountryProps, CountryRow, string>;


// ============================================================================
// Entity: Locales (BCP 47) (table: "locale")
// ============================================================================

export interface LocaleProps {
    localeCode: string;
    language: string;
    territory: string;
    script: string;
    isRtl?: boolean;
    i18n?: Record<string, unknown> | unknown[];
}

export interface LocaleRow {
    locale_code: string;
    language: string;
    territory: string;
    script: string;
    is_rtl: boolean;
    i18n: Record<string, unknown> | unknown[];
}

export const LOCALE_META = {
    tableName: 'locale',
    pkField: 'localeCode' as keyof LocaleProps,
    pkCol: 'locale_code',
    fields: {
        localeCode: { col: 'locale_code', type: 'String', isArray: false, maxLength: 32, nullable: false, hasDefault: false },
        language: { col: 'language', type: 'String', isArray: false, maxLength: 128, nullable: false, hasDefault: false },
        territory: { col: 'territory', type: 'String', isArray: false, maxLength: 128, nullable: false, hasDefault: false },
        script: { col: 'script', type: 'String', isArray: false, maxLength: 16, nullable: false, hasDefault: false },
        isRtl: { col: 'is_rtl', type: 'Bool', isArray: false, maxLength: 0, nullable: false, hasDefault: true },
        i18n: { col: 'i18n', type: 'Jsonb', isArray: false, maxLength: 0, nullable: false, hasDefault: true }
    }
} as const;

export type LocaleEntity = sql.entity.EntityProxy<LocaleProps, LocaleRow>;

export type LocaleRepository = sql.entity.EntityRepository<LocaleProps, LocaleRow, string>;


// ============================================================================
// Entity: Occupations (table: "occupation")
// ============================================================================

export interface OccupationProps {
    socCode: string;
    name: string;
    department: string;
    i18n?: Record<string, unknown> | unknown[];
}

export interface OccupationRow {
    soc_code: string;
    name: string;
    department: string;
    i18n: Record<string, unknown> | unknown[];
}

export const OCCUPATION_META = {
    tableName: 'occupation',
    pkField: 'socCode' as keyof OccupationProps,
    pkCol: 'soc_code',
    fields: {
        socCode: { col: 'soc_code', type: 'String', isArray: false, maxLength: 16, nullable: false, hasDefault: false },
        name: { col: 'name', type: 'String', isArray: false, maxLength: 255, nullable: false, hasDefault: false },
        department: { col: 'department', type: 'String', isArray: false, maxLength: 128, nullable: false, hasDefault: false },
        i18n: { col: 'i18n', type: 'Jsonb', isArray: false, maxLength: 0, nullable: false, hasDefault: true }
    }
} as const;

export type OccupationEntity = sql.entity.EntityProxy<OccupationProps, OccupationRow>;

export type OccupationRepository = sql.entity.EntityRepository<OccupationProps, OccupationRow, string>;


// ============================================================================
// Entity: Currencies (table: "currency")
// ============================================================================

export interface CurrencyProps {
    currencyCode: string;
    name: string;
    symbol: string;
    decimals: number;
    countries?: string[];
    i18n?: Record<string, unknown> | unknown[];
}

export interface CurrencyRow {
    currency_code: string;
    name: string;
    symbol: string;
    decimals: number;
    countries: string[];
    i18n: Record<string, unknown> | unknown[];
}

export const CURRENCY_META = {
    tableName: 'currency',
    pkField: 'currencyCode' as keyof CurrencyProps,
    pkCol: 'currency_code',
    fields: {
        currencyCode: { col: 'currency_code', type: 'Char', isArray: false, maxLength: 3, nullable: false, hasDefault: false },
        name: { col: 'name', type: 'String', isArray: false, maxLength: 128, nullable: false, hasDefault: false },
        symbol: { col: 'symbol', type: 'String', isArray: false, maxLength: 16, nullable: false, hasDefault: false },
        decimals: { col: 'decimals', type: 'SmallInt', isArray: false, maxLength: 0, nullable: false, hasDefault: false },
        countries: { col: 'countries', type: 'Char', isArray: true, maxLength: 2, nullable: false, hasDefault: true },
        i18n: { col: 'i18n', type: 'Jsonb', isArray: false, maxLength: 0, nullable: false, hasDefault: true }
    }
} as const;

export type CurrencyEntity = sql.entity.EntityProxy<CurrencyProps, CurrencyRow>;

export type CurrencyRepository = sql.entity.EntityRepository<CurrencyProps, CurrencyRow, string>;


// ============================================================================
// Entity: Timezones (table: "timezone")
// ============================================================================

export interface TimezoneProps {
    tzIdentifier: string;
    utcOffset: string;
    hasDst?: boolean;
}

export interface TimezoneRow {
    tz_identifier: string;
    utc_offset: string;
    has_dst: boolean;
}

export const TIMEZONE_META = {
    tableName: 'timezone',
    pkField: 'tzIdentifier' as keyof TimezoneProps,
    pkCol: 'tz_identifier',
    fields: {
        tzIdentifier: { col: 'tz_identifier', type: 'String', isArray: false, maxLength: 128, nullable: false, hasDefault: false },
        utcOffset: { col: 'utc_offset', type: 'String', isArray: false, maxLength: 16, nullable: false, hasDefault: false },
        hasDst: { col: 'has_dst', type: 'Bool', isArray: false, maxLength: 0, nullable: false, hasDefault: true }
    }
} as const;

export type TimezoneEntity = sql.entity.EntityProxy<TimezoneProps, TimezoneRow>;

export type TimezoneRepository = sql.entity.EntityRepository<TimezoneProps, TimezoneRow, string>;


// ============================================================================
// Entity: Postal Code Formats (table: "postal_format")
// ============================================================================

export interface PostalFormatProps {
    alpha2: string;
    regexPattern: string;
    formatExample: string;
}

export interface PostalFormatRow {
    alpha2: string;
    regex_pattern: string;
    format_example: string;
}

export const POSTAL_FORMAT_META = {
    tableName: 'postal_format',
    pkField: 'alpha2' as keyof PostalFormatProps,
    pkCol: 'alpha2',
    fields: {
        alpha2: { col: 'alpha2', type: 'Char', isArray: false, maxLength: 2, nullable: false, hasDefault: false },
        regexPattern: { col: 'regex_pattern', type: 'String', isArray: false, maxLength: 255, nullable: false, hasDefault: false },
        formatExample: { col: 'format_example', type: 'String', isArray: false, maxLength: 128, nullable: false, hasDefault: false }
    }
} as const;

export type PostalFormatEntity = sql.entity.EntityProxy<PostalFormatProps, PostalFormatRow>;

export type PostalFormatRepository = sql.entity.EntityRepository<PostalFormatProps, PostalFormatRow, string>;


// ============================================================================
// Entity: Telecom Prefixes (table: "telecom_prefix")
// ============================================================================

export interface TelecomPrefixProps {
    alpha2: string;
    countryName: string;
    dialCode: string;
    nationalNumberLength: number;
    i18n?: Record<string, unknown> | unknown[];
}

export interface TelecomPrefixRow {
    alpha2: string;
    country_name: string;
    dial_code: string;
    national_number_length: number;
    i18n: Record<string, unknown> | unknown[];
}

export const TELECOM_PREFIX_META = {
    tableName: 'telecom_prefix',
    pkField: 'alpha2' as keyof TelecomPrefixProps,
    pkCol: 'alpha2',
    fields: {
        alpha2: { col: 'alpha2', type: 'Char', isArray: false, maxLength: 2, nullable: false, hasDefault: false },
        countryName: { col: 'country_name', type: 'String', isArray: false, maxLength: 255, nullable: false, hasDefault: false },
        dialCode: { col: 'dial_code', type: 'String', isArray: false, maxLength: 16, nullable: false, hasDefault: false },
        nationalNumberLength: { col: 'national_number_length', type: 'SmallInt', isArray: false, maxLength: 0, nullable: false, hasDefault: false },
        i18n: { col: 'i18n', type: 'Jsonb', isArray: false, maxLength: 0, nullable: false, hasDefault: true }
    }
} as const;

export type TelecomPrefixEntity = sql.entity.EntityProxy<TelecomPrefixProps, TelecomPrefixRow>;

export type TelecomPrefixRepository = sql.entity.EntityRepository<TelecomPrefixProps, TelecomPrefixRow, string>;


// ============================================================================
// Entity: Colors (table: "color")
// ============================================================================

export interface ColorProps {
    hexCode: string;
    name: string;
    rgbValue: string;
    hslValue: string;
    i18n?: Record<string, unknown> | unknown[];
}

export interface ColorRow {
    hex_code: string;
    name: string;
    rgb_value: string;
    hsl_value: string;
    i18n: Record<string, unknown> | unknown[];
}

export const COLOR_META = {
    tableName: 'color',
    pkField: 'hexCode' as keyof ColorProps,
    pkCol: 'hex_code',
    fields: {
        hexCode: { col: 'hex_code', type: 'String', isArray: false, maxLength: 9, nullable: false, hasDefault: false },
        name: { col: 'name', type: 'String', isArray: false, maxLength: 128, nullable: false, hasDefault: false },
        rgbValue: { col: 'rgb_value', type: 'String', isArray: false, maxLength: 32, nullable: false, hasDefault: false },
        hslValue: { col: 'hsl_value', type: 'String', isArray: false, maxLength: 32, nullable: false, hasDefault: false },
        i18n: { col: 'i18n', type: 'Jsonb', isArray: false, maxLength: 0, nullable: false, hasDefault: true }
    }
} as const;

export type ColorEntity = sql.entity.EntityProxy<ColorProps, ColorRow>;

export type ColorRepository = sql.entity.EntityRepository<ColorProps, ColorRow, string>;


// ============================================================================
// Entity: Top-Level Domains (table: "top_level_domain")
// ============================================================================

export interface TopLevelDomainProps {
    tld: string;
    category: string;
    registry: string;
}

export interface TopLevelDomainRow {
    tld: string;
    category: string;
    registry: string;
}

export const TOP_LEVEL_DOMAIN_META = {
    tableName: 'top_level_domain',
    pkField: 'tld' as keyof TopLevelDomainProps,
    pkCol: 'tld',
    fields: {
        tld: { col: 'tld', type: 'String', isArray: false, maxLength: 64, nullable: false, hasDefault: false },
        category: { col: 'category', type: 'String', isArray: false, maxLength: 32, nullable: false, hasDefault: false },
        registry: { col: 'registry', type: 'String', isArray: false, maxLength: 255, nullable: false, hasDefault: false }
    }
} as const;

export type TopLevelDomainEntity = sql.entity.EntityProxy<TopLevelDomainProps, TopLevelDomainRow>;

export type TopLevelDomainRepository = sql.entity.EntityRepository<TopLevelDomainProps, TopLevelDomainRow, string>;


// ============================================================================
// Entity: User Agents (table: "user_agent")
// ============================================================================

export interface UserAgentProps {
    userAgentString: string;
    browser: string;
    operatingSystem: string;
    deviceType: string;
}

export interface UserAgentRow {
    user_agent_string: string;
    browser: string;
    operating_system: string;
    device_type: string;
}

export const USER_AGENT_META = {
    tableName: 'user_agent',
    pkField: 'userAgentString' as keyof UserAgentProps,
    pkCol: 'user_agent_string',
    fields: {
        userAgentString: { col: 'user_agent_string', type: 'Text', isArray: false, maxLength: 0, nullable: false, hasDefault: false },
        browser: { col: 'browser', type: 'String', isArray: false, maxLength: 128, nullable: false, hasDefault: false },
        operatingSystem: { col: 'operating_system', type: 'String', isArray: false, maxLength: 128, nullable: false, hasDefault: false },
        deviceType: { col: 'device_type', type: 'String', isArray: false, maxLength: 32, nullable: false, hasDefault: false }
    }
} as const;

export type UserAgentEntity = sql.entity.EntityProxy<UserAgentProps, UserAgentRow>;

export type UserAgentRepository = sql.entity.EntityRepository<UserAgentProps, UserAgentRow, string>;


// ============================================================================
// Entity: Measurement Units (table: "measurement_unit")
// ============================================================================

export interface MeasurementUnitProps {
    symbol: string;
    name: string;
    dimension: string;
    siBaseUnit: string;
    i18n?: Record<string, unknown> | unknown[];
}

export interface MeasurementUnitRow {
    symbol: string;
    name: string;
    dimension: string;
    si_base_unit: string;
    i18n: Record<string, unknown> | unknown[];
}

export const MEASUREMENT_UNIT_META = {
    tableName: 'measurement_unit',
    pkField: 'symbol' as keyof MeasurementUnitProps,
    pkCol: 'symbol',
    fields: {
        symbol: { col: 'symbol', type: 'String', isArray: false, maxLength: 32, nullable: false, hasDefault: false },
        name: { col: 'name', type: 'String', isArray: false, maxLength: 128, nullable: false, hasDefault: false },
        dimension: { col: 'dimension', type: 'String', isArray: false, maxLength: 128, nullable: false, hasDefault: false },
        siBaseUnit: { col: 'si_base_unit', type: 'String', isArray: false, maxLength: 32, nullable: false, hasDefault: false },
        i18n: { col: 'i18n', type: 'Jsonb', isArray: false, maxLength: 0, nullable: false, hasDefault: true }
    }
} as const;

export type MeasurementUnitEntity = sql.entity.EntityProxy<MeasurementUnitProps, MeasurementUnitRow>;

export type MeasurementUnitRepository = sql.entity.EntityRepository<MeasurementUnitProps, MeasurementUnitRow, string>;


// ============================================================================
// Entity: Universities (table: "university")
// ============================================================================

export interface UniversityProps {
    domain: string;
    name: string;
    countryName: string;
    websiteUrl: string;
    i18n?: Record<string, unknown> | unknown[];
}

export interface UniversityRow {
    domain: string;
    name: string;
    country_name: string;
    website_url: string;
    i18n: Record<string, unknown> | unknown[];
}

export const UNIVERSITY_META = {
    tableName: 'university',
    pkField: 'domain' as keyof UniversityProps,
    pkCol: 'domain',
    fields: {
        domain: { col: 'domain', type: 'String', isArray: false, maxLength: 255, nullable: false, hasDefault: false },
        name: { col: 'name', type: 'String', isArray: false, maxLength: 255, nullable: false, hasDefault: false },
        countryName: { col: 'country_name', type: 'String', isArray: false, maxLength: 255, nullable: false, hasDefault: false },
        websiteUrl: { col: 'website_url', type: 'Text', isArray: false, maxLength: 0, nullable: false, hasDefault: false },
        i18n: { col: 'i18n', type: 'Jsonb', isArray: false, maxLength: 0, nullable: false, hasDefault: true }
    }
} as const;

export type UniversityEntity = sql.entity.EntityProxy<UniversityProps, UniversityRow>;

export type UniversityRepository = sql.entity.EntityRepository<UniversityProps, UniversityRow, string>;


// ============================================================================
// Entity: Airports (table: "airport")
// ============================================================================

export interface AirportProps {
    iataCode: string;
    icaoCode: string;
    name: string;
    cityName: string;
    countryName: string;
    i18n?: Record<string, unknown> | unknown[];
}

export interface AirportRow {
    iata_code: string;
    icao_code: string;
    name: string;
    city_name: string;
    country_name: string;
    i18n: Record<string, unknown> | unknown[];
}

export const AIRPORT_META = {
    tableName: 'airport',
    pkField: 'iataCode' as keyof AirportProps,
    pkCol: 'iata_code',
    fields: {
        iataCode: { col: 'iata_code', type: 'Char', isArray: false, maxLength: 3, nullable: false, hasDefault: false },
        icaoCode: { col: 'icao_code', type: 'Char', isArray: false, maxLength: 4, nullable: false, hasDefault: false },
        name: { col: 'name', type: 'String', isArray: false, maxLength: 255, nullable: false, hasDefault: false },
        cityName: { col: 'city_name', type: 'String', isArray: false, maxLength: 255, nullable: false, hasDefault: false },
        countryName: { col: 'country_name', type: 'String', isArray: false, maxLength: 255, nullable: false, hasDefault: false },
        i18n: { col: 'i18n', type: 'Jsonb', isArray: false, maxLength: 0, nullable: false, hasDefault: true }
    }
} as const;

export type AirportEntity = sql.entity.EntityProxy<AirportProps, AirportRow>;

export type AirportRepository = sql.entity.EntityRepository<AirportProps, AirportRow, string>;


// ============================================================================
// Entity: HTTP Status Codes (table: "http_status")
// ============================================================================

export interface HttpStatusProps {
    statusCode: number;
    reasonPhrase: string;
    category: string;
    description: string;
    i18n?: Record<string, unknown> | unknown[];
}

export interface HttpStatusRow {
    status_code: number;
    reason_phrase: string;
    category: string;
    description: string;
    i18n: Record<string, unknown> | unknown[];
}

export const HTTP_STATUS_META = {
    tableName: 'http_status',
    pkField: 'statusCode' as keyof HttpStatusProps,
    pkCol: 'status_code',
    fields: {
        statusCode: { col: 'status_code', type: 'SmallInt', isArray: false, maxLength: 0, nullable: false, hasDefault: false },
        reasonPhrase: { col: 'reason_phrase', type: 'String', isArray: false, maxLength: 128, nullable: false, hasDefault: false },
        category: { col: 'category', type: 'String', isArray: false, maxLength: 128, nullable: false, hasDefault: false },
        description: { col: 'description', type: 'Text', isArray: false, maxLength: 0, nullable: false, hasDefault: false },
        i18n: { col: 'i18n', type: 'Jsonb', isArray: false, maxLength: 0, nullable: false, hasDefault: true }
    }
} as const;

export type HttpStatusEntity = sql.entity.EntityProxy<HttpStatusProps, HttpStatusRow>;

export type HttpStatusRepository = sql.entity.EntityRepository<HttpStatusProps, HttpStatusRow, number>;


// ============================================================================
// Entity: Zodiac Signs (table: "zodiac_sign")
// ============================================================================

export interface ZodiacSignProps {
    name: string;
    element: string;
    symbol: string;
    dateRange: string;
    i18n?: Record<string, unknown> | unknown[];
}

export interface ZodiacSignRow {
    name: string;
    element: string;
    symbol: string;
    date_range: string;
    i18n: Record<string, unknown> | unknown[];
}

export const ZODIAC_SIGN_META = {
    tableName: 'zodiac_sign',
    pkField: 'name' as keyof ZodiacSignProps,
    pkCol: 'name',
    fields: {
        name: { col: 'name', type: 'String', isArray: false, maxLength: 32, nullable: false, hasDefault: false },
        element: { col: 'element', type: 'String', isArray: false, maxLength: 16, nullable: false, hasDefault: false },
        symbol: { col: 'symbol', type: 'String', isArray: false, maxLength: 32, nullable: false, hasDefault: false },
        dateRange: { col: 'date_range', type: 'String', isArray: false, maxLength: 32, nullable: false, hasDefault: false },
        i18n: { col: 'i18n', type: 'Jsonb', isArray: false, maxLength: 0, nullable: false, hasDefault: true }
    }
} as const;

export type ZodiacSignEntity = sql.entity.EntityProxy<ZodiacSignProps, ZodiacSignRow>;

export type ZodiacSignRepository = sql.entity.EntityRepository<ZodiacSignProps, ZodiacSignRow, string>;


// ============================================================================
// DI Context Factory (Внедрение pg.Pool / pg.Client / Transaction)
// ============================================================================

/**
 * Создает контекст БД с репозиториями для всех таблиц.
 * Сюда можно передать pg.Pool, pg.Client или транзакционный клиент!
 */
export function createDbContext(db: sql.entity.DbExecutor) {
    return {
        $executor: db,
        media_type: new sql.entity.EntityRepository<MediaTypeProps, MediaTypeRow>(MEDIA_TYPE_META as any, db),
        unicode_character: new sql.entity.EntityRepository<UnicodeCharacterProps, UnicodeCharacterRow>(UNICODE_CHARACTER_META as any, db),
        programming_language: new sql.entity.EntityRepository<ProgrammingLanguageProps, ProgrammingLanguageRow>(PROGRAMMING_LANGUAGE_META as any, db),
        country: new sql.entity.EntityRepository<CountryProps, CountryRow>(COUNTRY_META as any, db),
        locale: new sql.entity.EntityRepository<LocaleProps, LocaleRow>(LOCALE_META as any, db),
        occupation: new sql.entity.EntityRepository<OccupationProps, OccupationRow>(OCCUPATION_META as any, db),
        currency: new sql.entity.EntityRepository<CurrencyProps, CurrencyRow>(CURRENCY_META as any, db),
        timezone: new sql.entity.EntityRepository<TimezoneProps, TimezoneRow>(TIMEZONE_META as any, db),
        postal_format: new sql.entity.EntityRepository<PostalFormatProps, PostalFormatRow>(POSTAL_FORMAT_META as any, db),
        telecom_prefix: new sql.entity.EntityRepository<TelecomPrefixProps, TelecomPrefixRow>(TELECOM_PREFIX_META as any, db),
        color: new sql.entity.EntityRepository<ColorProps, ColorRow>(COLOR_META as any, db),
        top_level_domain: new sql.entity.EntityRepository<TopLevelDomainProps, TopLevelDomainRow>(TOP_LEVEL_DOMAIN_META as any, db),
        user_agent: new sql.entity.EntityRepository<UserAgentProps, UserAgentRow>(USER_AGENT_META as any, db),
        measurement_unit: new sql.entity.EntityRepository<MeasurementUnitProps, MeasurementUnitRow>(MEASUREMENT_UNIT_META as any, db),
        university: new sql.entity.EntityRepository<UniversityProps, UniversityRow>(UNIVERSITY_META as any, db),
        airport: new sql.entity.EntityRepository<AirportProps, AirportRow>(AIRPORT_META as any, db),
        http_status: new sql.entity.EntityRepository<HttpStatusProps, HttpStatusRow>(HTTP_STATUS_META as any, db),
        zodiac_sign: new sql.entity.EntityRepository<ZodiacSignProps, ZodiacSignRow>(ZODIAC_SIGN_META as any, db),
        /** Выполнить операции внутри транзакции (использует пул из контекста или явно переданный пул) */
        async $transaction<T>(
            fnOrPool: ((txCtx: ReturnType<typeof createDbContext>) => Promise<T>) | { connect(): Promise<sql.entity.DbExecutor & { release(): void }> },
            maybeFn?: (txCtx: ReturnType<typeof createDbContext>) => Promise<T>
        ): Promise<T> {
            const isFnFirst = typeof fnOrPool === 'function';
            const pool = isFnFirst ? db : fnOrPool;
            const fn = isFnFirst ? fnOrPool : maybeFn!;

            if (!pool || typeof pool.connect !== 'function') {
                throw new Error('Для вызова $transaction необходим pg.Pool с методом .connect()');
            }

            const client = await pool.connect();
            try {
                await client.query('BEGIN');
                const txCtx = createDbContext(client);
                const result = await fn(txCtx);
                await client.query('COMMIT');
                return result;
            } catch (err) {
                await client.query('ROLLBACK');
                throw err;
            } finally {
                client.release();
            }
        }
    };
}

export type DbContext = ReturnType<typeof createDbContext>;
