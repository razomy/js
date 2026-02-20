import {type i64} from './primitives';

export type address_line1 = string; //	Expects the first line of the street address
export type address_line2 = string; //	Expects the second line of the street address
export type address_line3 = string; //	Expects the third line of the street address
export type address_level1 = string; //	Expects the first level of the address, e.g. the county
export type address_level2 = string; //	Expects the second level of the address, e.g. the city
export type address_level3 = string; //	Expects the third level of the address
export type address_level4 = string; //	Expects the fourth level of the address
export type street_address = string; //	Expects the full street address
export type country = string; //	Expects the country code
export type country_name = string; //	Expects the country name
export type postal_code = string; //	Expects the post code
export type name = string; //	Expects the full name
export type additional_name = string; //	Expects the middle name
export type family_name = string; //	Expects the last name
export type given_name = string; //	Expects the first name
export type honoric_prefix = string; //	Expects the title, like "Mr", "Ms" etc.
export type honoric_suffix = string; //	Expects the suffix, like "5", "Jr." etc.
export type nickname = string; //	Expects the nickname
export type organization_title = string; //	Expects the job title
export type username = string; //	Expects the username
export type new_password = string; //	Expects a new password
export type current_password = string; //	Expects the current password
export type bday = string; //	Expects the full birthday date
export type bday_day = string; //	Expects the day of the birthday date
export type bday_month = string; //	Expects the month of the birthday date
export type bday_year = string; //	Expects the year of the birthday date
export type sex = string; //	Expects the gender
export type one_time_code = string; //	Expects a one time code for verification etc.
export type organization = string; //	Expects the company name
export type cc_name = string; //	Expects the credit card owner's full name
export type cc_given_name = string; //	Expects the credit card owner's first name
export type cc_additional_name = string; //	Expects the credit card owner's middle name
export type cc_family_name = string; //	Expects the credit card owner's family name
export type cc_number = string; //	Expects the credit card's number
export type cc_exp = string; //	Expects the credit card's expiration date
export type cc_exp_month = string; //	Expects the credit card's expiration month
export type cc_exp_year = string; //	Expects the credit card's expiration year
export type cc_csc = string; //	Expects the CVC code
export type cc_type = string; //	Expects the credit card's type of payment
export type transaction_currency = string; //	Expects the currency
export type transaction_amount = string; //	Expects a number, the amount
export type language = string; //	Expects the preferred language
export type url = string; //	Expects a URL for home page or company website address
export type email = string; //	Expects the email address
export type photo = string; //	Expects an image
export type tel = string; //	Expects the full phone number
export type tel_country_code = string; //	Expects the country code of the phone number
export type tel_national = string; //	Expects the phone number with no country code
export type tel_area_code = string; //	Expects the area code of the phone number
export type tel_local = string; //	Expects the phone number with no country code and no area code
export type tel_local_prefix = string; //	Expects the local prefix of the phone number
export type tel_local_suffix = string; //	Expects the local suffix of the phone number
export type tel_extension = string; //	Expects the extension code of the phone number
export type impp = string; //	Expects the url of an instant messaging protocol endpoint

export type AllAutofill = address_line1 |
  address_line2 |
  address_line3 |
  address_level1 |
  address_level2 |
  address_level3 |
  address_level4 |
  street_address |
  country |
  country_name |
  postal_code |
  name |
  additional_name |
  family_name |
  given_name |
  honoric_prefix |
  honoric_suffix |
  nickname |
  organization_title |
  username |
  new_password |
  current_password |
  bday |
  bday_day |
  bday_month |
  bday_year |
  sex |
  one_time_code |
  organization |
  cc_name |
  cc_given_name |
  cc_additional_name |
  cc_family_name |
  cc_number |
  cc_exp |
  cc_exp_month |
  cc_exp_year |
  cc_csc |
  cc_type |
  transaction_currency |
  transaction_amount |
  language |
  url |
  email |
  photo |
  tel |
  tel_country_code |
  tel_national |
  tel_area_code |
  tel_local |
  tel_local_prefix |
  tel_local_suffix |
  tel_extension |
  impp;


export type timestamp = i64;
export type dateString = string;
export type datetimeString = string;
export type dateIsoString = string;
export type color = string;
export type date_ = Date;
export type blob_ = Blob;
export type file_ = File;
export type AllSpecific =
  date_
  | timestamp
  | blob_
  | file_
  | dateIsoString
  | dateString
  | datetimeString
  | email
  | url
  | color;