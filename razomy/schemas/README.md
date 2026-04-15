# @razomy/schemas

[![TypeScript](https://img.shields.io/npm/types/@razomy/schemas)](https://www.npmjs.com/package/@razomy/schemas)
[![Node.js Version](https://img.shields.io/node/v/@razomy/schemas)](https://www.npmjs.com/package/@razomy/schemas)
![Deno](https://img.shields.io/badge/Deno-Supported-blue)
![Bun](https://img.shields.io/badge/Bun-Supported-black)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-Supported-orange)
[![License](https://img.shields.io/npm/l/@razomy/schemas)](https://github.com/razomy/js/blob/main/LICENSE)

[![CI Status](https://github.com/razomy/js/actions/workflows/release.yml/badge.svg)](https://github.com/razomy/js/actions)
[![npm version](https://img.shields.io/npm/v/@razomy/schemas)](https://www.npmjs.com/package/@razomy/schemas)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/@razomy/schemas)](https://bundlephobia.com/package/@razomy/schemas)
[![GitHub stars](https://img.shields.io/github/stars/razomy/js?style=social)](https://github.com/razomy/js/stargazers)
[![npm downloads](https://img.shields.io/npm/dw/@razomy/schemas)](https://www.npmjs.com/package/@razomy/schemas)

[Npm](https://www.npmjs.com/package/@razomy/schemas) |
[Npmx](https://npmx.dev/package/@razomy/schemas) |
[GitHub](https://github.com/razomy/js/tree/main/razomy/schemas) |
[Razomy Io](https://io.razomy.org/schemas) |
[Razomy Cli](https://github.com/razomy/cli)

> A comprehensive collection of pre-built schema templates for quick validation

## 🚀 Start

### Install

```sh
npm i @razomy/schemas
# or
bun add @razomy/schemas
# or
razomy cli add @razomy/schemas
```

### Import

```ts
import * as schemas from '@razomy/schemas';
// or
import * as schemas from "npm:@razomy/schemas";
// or
import * as schemas from "https://esm.sh/@razomy/schemas";
// or
import * as schemas from "https://unpkg.com/@razomy/schemas";
// or
import { functionName } from '@razomy/schemas';
// or
razomy run @razomy/schemas functionName
```

## 📑 Table of Contents

**Types**

- [additional_name](#additional_name)
- [address_level1](#address_level1)
- [address_level2](#address_level2)
- [address_level3](#address_level3)
- [address_level4](#address_level4)
- [address_line1](#address_line1)
- [address_line2](#address_line2)
- [address_line3](#address_line3)
- [AllAutofill](#allautofill)
- [AllSpecific](#allspecific)
- [bday](#bday)
- [bday_day](#bday_day)
- [bday_month](#bday_month)
- [bday_year](#bday_year)
- [blob\_](#blob_)
- [cc_additional_name](#cc_additional_name)
- [cc_csc](#cc_csc)
- [cc_exp](#cc_exp)
- [cc_exp_month](#cc_exp_month)
- [cc_exp_year](#cc_exp_year)
- [cc_family_name](#cc_family_name)
- [cc_given_name](#cc_given_name)
- [cc_name](#cc_name)
- [cc_number](#cc_number)
- [cc_type](#cc_type)
- [color](#color)
- [country](#country)
- [country_name](#country_name)
- [current_password](#current_password)
- [date\_](#date_)
- [dateIsoString](#dateisostring)
- [dateString](#datestring)
- [datetimeString](#datetimestring)
- [email](#email)
- [family_name](#family_name)
- [file\_](#file_)
- [given_name](#given_name)
- [honoric_prefix](#honoric_prefix)
- [honoric_suffix](#honoric_suffix)
- [idSchema](#idschema)
- [impp](#impp)
- [language](#language)
- [name](#name)
- [new_password](#new_password)
- [nickname](#nickname)
- [one_time_code](#one_time_code)
- [organization](#organization)
- [organization_title](#organization_title)
- [photo](#photo)
- [postal_code](#postal_code)
- [SchemaType](#schematype)
- [sex](#sex)
- [street_address](#street_address)
- [tel](#tel)
- [tel_area_code](#tel_area_code)
- [tel_country_code](#tel_country_code)
- [tel_extension](#tel_extension)
- [tel_local](#tel_local)
- [tel_local_prefix](#tel_local_prefix)
- [tel_local_suffix](#tel_local_suffix)
- [tel_national](#tel_national)
- [timestamp](#timestamp)
- [transaction_amount](#transaction_amount)
- [transaction_currency](#transaction_currency)
- [Transformer](#transformer)
- [Trowable](#trowable)
- [url](#url)
- [username](#username)
- [Validator](#validator)
- [withLocaleSchema](#withlocaleschema)

## 📚 Documentation

### Types

#### additional_name

#### address_level1

#### address_level2

#### address_level3

#### address_level4

#### address_line1

#### address_line2

#### address_line3

#### AllAutofill

#### AllSpecific

#### bday

#### bday_day

#### bday_month

#### bday_year

#### blob\_

#### cc_additional_name

#### cc_csc

#### cc_exp

#### cc_exp_month

#### cc_exp_year

#### cc_family_name

#### cc_given_name

#### cc_name

#### cc_number

#### cc_type

#### color

#### country

#### country_name

#### current_password

#### date\_

#### dateIsoString

#### dateString

#### datetimeString

#### email

#### family_name

#### file\_

#### given_name

#### honoric_prefix

#### honoric_suffix

#### idSchema

#### impp

#### language

#### name

#### new_password

#### nickname

#### one_time_code

#### organization

#### organization_title

#### photo

#### postal_code

#### SchemaType

#### sex

#### street_address

#### tel

#### tel_area_code

#### tel_country_code

#### tel_extension

#### tel_local

#### tel_local_prefix

#### tel_local_suffix

#### tel_national

#### timestamp

#### transaction_amount

#### transaction_currency

#### Transformer

#### Trowable

#### url

#### username

#### Validator

#### withLocaleSchema

## 🕊️ Vision

> "Razomy" means Together—you and me.  
> We act as catalysts, turning natural chaos into clarity through open collaboration.  
> By building honest, reliable systems, we empower humanity and create a foundation for peace.  
> We foster a borderless environment driven by quality code and mutual support.  
> Join us to build this future—one commit at a time.

## 💖 Fuel Our Shared Future

We can't build this without you.
If this library has saved you time or helped turn chaos into clarity in your own projects,
please consider backing the developers behind it.
Building reliable, open-source tools takes immense time and energy.
Your sponsorship isn't just a donation;
it’s the fuel that keeps this project actively maintained, bug-free, and thriving for everyone who relies on it.

Help us keep the momentum going. Choose how you want to light the way:

- [✨ Spark of Creativity](https://donate.stripe.com/28EbJ07jlbQR83sc2d0Jq08)
- [🌟 Flame of Innovation (Recommended)](https://donate.stripe.com/3cI6oGbzB1cddnMc2d0Jq06)
- [🔥 Torch of Progress](https://donate.stripe.com/28EcN48np9IJ6Zo9U50Jq09)
- [🚀 Beacon of Excellence](https://donate.stripe.com/6oU9AS0UX8EFerQc2d0Jq07)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!
Feel free to check [issues page](https://github.com/razomy/js/issues).

## 📝 License

Copyright © 2026 [Razomy](https://github.com/razomy).
This project is [MIT](https://github.com/razomy/js/blob/main/LICENSE) licensed.

## 🐛 Reporting Issues

We use GitHub Issues as the official bug tracker for this project.

Before opening a new issue, please check if your problem has already been reported. If it hasn't, please open a new issue here:
[GitHub Issues: razomy/js](https://github.com/razomy/js/issues)

When reporting a bug, please include:

- A brief description of the issue.
- Steps to reproduce the bug.
- Your current environment (Node version, OS, etc.).
