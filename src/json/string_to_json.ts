import { Json } from "razomy.json/json";

export function string_to_json<T extends Json>(data: string): T {
    return JSON.parse(data);
}
