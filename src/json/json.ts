import {Serializable} from 'razomy.js/serializable/serializable';

export type JsonPrimitive = string | number | boolean | null;
export type JsonObject = { [key: string]: JsonValue };
export type JsonArray = JsonValue[];
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

export type Json = Serializable<JsonValue> & JsonValue