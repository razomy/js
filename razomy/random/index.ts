// Imports
import { createCssGradient } from './create_css_gradient';
import { createDate } from './create_date';
import { createFloat } from './create_float';
import { createFloatRange } from './create_float_range';
import { GuidFactory, createGuid } from './create_guid';
import { BitSize, createId } from './create_id';
import { createInt } from './create_int';
import { createIpv4 } from './create_ipv_4';
import { createLightHexColor } from './create_light_hex_color';
import { createLorem } from './create_lorem';
import { createMac } from './create_mac';
import { createPassword } from './create_password';
import { createPinCode } from './create_pin_code';
import { createRecoveryKeys } from './create_recovery_keys';
import { createString } from './create_string';
import { createUuid } from './create_uuid';
import { isYesOrNo } from './is_yes_or_no';
import { pickItem } from './pick_item';
import { rollDice } from './roll_dice';
import { shuffleArray } from './shuffle_array';
import { splitIntoGroups } from './split_into_groups';

// Named exports
export {
  BitSize,
  GuidFactory,
  createCssGradient,
  createDate,
  createFloat,
  createFloatRange,
  createGuid,
  createId,
  createInt,
  createIpv4,
  createLightHexColor,
  createLorem,
  createMac,
  createPassword,
  createPinCode,
  createRecoveryKeys,
  createString,
  createUuid,
  isYesOrNo,
  pickItem,
  rollDice,
  shuffleArray,
  splitIntoGroups
};

// Default export
const random = {
  createCssGradient,
  createDate,
  createFloat,
  createFloatRange,
  GuidFactory,
  createGuid,
  BitSize,
  createId,
  createInt,
  createIpv4,
  createLightHexColor,
  createLorem,
  createMac,
  createPassword,
  createPinCode,
  createRecoveryKeys,
  createString,
  createUuid,
  isYesOrNo,
  pickItem,
  rollDice,
  shuffleArray,
  splitIntoGroups,
};

export default random;
